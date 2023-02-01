import { scaleLinear, scaleBand } from '@visx/scale';
import { listings } from '../data/listings';
import styled from 'styled-components';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import Rheostat from 'rheostat';
import 'rheostat/initialize';
import React, { useEffect, useState } from 'react';
import _ from 'underscore';

let min = Infinity;
let max = -Infinity;

listings.forEach((c) => {
  const price = Math.round(parseFloat(c.price.replace(/[$,]/g, '')) / 10) * 10;
  if (price > max) max = price;
  if (price < min) min = price;
});
const steps = _.range(min, max, 10);

let prices = listings.reduce((p, c) => {
  const price = Math.round(parseFloat(c.price.replace(/[$,]/g, '')) / 10) * 10;

  if (!p.hasOwnProperty(price)) {
    p[price] = 1;
  }
  p[price]++;
  return p;
}, {});

steps.forEach((step) => {
  if (prices[step] === undefined) prices[step] = 1;
});

const diff = max - min;

const priceCounts = Object.keys(prices).map((k) => {
  return { price: k, count: prices[k] };
});

const data = priceCounts;

let width = 700;
const height = 80;

const xMax = width;
const yMax = height;

const x = (d) => d.price;
const y = (d) => +d.count;

const xScale = scaleBand({
  range: [0, xMax],
  round: true,
  domain: data.map(x),
  padding: 0.1,
});

const yScale = scaleLinear({
  range: [yMax, 0],
  round: true,
  domain: [0, Math.max(...data.map(y))],
});

const compose = (scale, accessor) => (data) => scale(accessor(data));
const xpoint = compose(xScale, x);
const ypoint = compose(yScale, y);

function PriceRangeFilter({ setPriceRange }) {
  const [values, setValues] = useState([0, max]);
  const setUpper = (e) => updateValues([values[0], parseInt(e.target.value)]);
  const setLower = (e) => updateValues([parseInt(e.target.value), values[1]]);

  const updateValues = (newVals) => {
    setValues(newVals);
    setPriceRange({ min: newVals[0], max: newVals[1] });
  };

  return (
    <StyleWrapped className="PriceRangeFilter" id="priceRange">
      <svg width="100%" viewBox="0 0 700 80" id="chart">
        {data.map((d, i) => {
          const barHeight = yMax - ypoint(d);
          return (
            <Group key={`bar-${i}`}>
              <Bar
                x={xpoint(d)}
                y={yMax - barHeight}
                height={barHeight}
                width={xScale.bandwidth()}
                fill={d.price > values[0] && d.price < values[1] ? '#b0b0b0' : '#dddddd'}
              />
            </Group>
          );
        })}
      </svg>
      <Rheostat
        min={min}
        max={max}
        values={values}
        onValuesUpdated={(e) => {
          setValues(e.values);
          updateValues(e.values);
        }}
      />
      <PriceInputRange>
        <PriceSelector>
          <label htmlFor="lower">min price</label>
          <div>
            <span>$</span>
            <input onChange={setLower} name="lower" type="number" value={values[0]} />
          </div>
        </PriceSelector>
        <PriceSelector>
          <label htmlFor="upper">max price</label>
          <div>
            <span>$</span>
            <input onChange={setUpper} name="upper" type="number" value={values[1]} />
          </div>
        </PriceSelector>
      </PriceInputRange>
    </StyleWrapped>
  );
}
const PriceSelector = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5em;
  border: 1px solid #b0b0b0;
  border-radius: 0.5em;
  flex: 1;

  label {
    color: #797979;
    font-size: 0.75em;
  }
  div {
    display: flex;
    gap: 0.5rem;
    font-size: 1em;

    span {
      font-size: 1em;
    }
    input {
      border: none;
      font-size: 1em;
      width: 50%;
      &:focus-visible {
        border: none;
        outline: none;
      }
    }
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }
`;

const PriceInputRange = styled.div`
  margin-top: 2em;
  padding: 0 1em;
  display: flex;
  justify-content: space-between;
  gap: 3em;
`;

const StyleWrapped = styled.div`
  margin: auto;

  .DefaultProgressBar__vertical {
    width: 24px;
    height: 100%;
  }
  .DefaultProgressBar_progressBar {
    background-color: #abc4e8;
    display: none;
    position: absolute;
  }
  .DefaultProgressBar_progressBar__vertical {
    height: 100%;
    width: 24px;
  }
  .DefaultProgressBar_background__vertical {
    height: 100%;
    top: 0px;
    width: 15px;
  }
  .DefaultProgressBar_background__horizontal {
    height: 13px;
    top: 0px;
  }
  .DefaultHandle_handle {
    width: 2em;
    height: 2em;
    border-width: 1px;
    border-style: solid;
    border-color: #b0b0b0;
    background-color: #fcfcfc;
    border-radius: 99rem;
    outline: none;
    z-index: 2;
    box-shadow: 0 2px 2px #dbdbdb;
    cursor: pointer;
  }
  .DefaultHandle_handle:focus {
    box-shadow: #abc4e8 0 0 1px 1px;
  }

  .DefaultHandle_handle:active {
    transform: scale(1.05);
  }
  .DefaultHandle_handle:after {
    content: '';
    display: block;
    position: absolute;
    background-color: #b0b0b0;
  }
  .DefaultHandle_handle:before {
    content: '';
    display: block;
    position: absolute;
    background-color: #b0b0b0;
  }
  .DefaultHandle_handle__horizontal {
    margin-left: -12px;
    top: -5px;
  }
  .DefaultHandle_handle__horizontal:before {
    top: 7px;
    height: 10px;
    width: 1px;
    left: 10px;
  }
  .DefaultHandle_handle__horizontal:after {
    top: 7px;
    height: 10px;
    width: 1px;
    left: 13px;
  }
  .DefaultHandle_handle__vertical {
    margin-top: -12px;
    left: -10px;
  }
  .DefaultHandle_handle__vertical:before {
    top: 10px;
  }
  .DefaultHandle_handle__vertical:after {
    top: 13px;
    left: 8px;
    height: 1px;
    width: 10px;
  }
  .DefaultHandle_handle__disabled {
    border-color: #dbdbdb;
  }
  .DefaultBackground {
    display: none;
  }
  .DefaultBackground_background__horizontal {
    height: 15px;
    top: -2px;
    left: -2px;
    bottom: 4px;
    width: 100%;
  }
  .DefaultBackground_background__vertical {
    width: 15px;
    top: 0px;
    height: 100%;
  }
  .rheostat {
    position: relative;
    overflow: visible;
  }
  @media (min-width: 1128px) {
    .autoAdjustVerticalPosition {
      top: 12px;
    }
  }
  .rheostat__vertical {
    height: 100%;
  }
  .handleContainer {
    height: 15px;
    top: -1em;
    left: 1em;
    bottom: 4px;
    width: calc(100% - 2em);
    position: absolute;
  }
  .rheostat_background {
    background-color: #fcfcfc;
    border: 1px solid #d8d8d8;
    position: relative;
  }
  .rheostat_background__horizontal {
    height: 15px;
    top: -2px;
    left: -2px;
    bottom: 4px;
    width: 100%;
  }
  .rheostat_background__vertical {
    width: 15px;
    top: 0px;
    height: 100%;
  }
`;

export default PriceRangeFilter;
