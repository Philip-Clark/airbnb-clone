import { useState } from 'react';
import styled from 'styled-components';
import { amenitiesList } from '../data/amenities';

function Amenity({ title, onClick, amenities }) {
  return (
    <TypeDiv>
      <RadioBox type="checkBox" onClick={onClick} checked={amenities.includes(title)} />
      <p>{title}</p>
    </TypeDiv>
  );
}

const toggleItem = (item, array) => {
  let newArray = array;
  if (array.includes(item)) newArray = array.filter((e) => e !== item);
  else newArray = [...array, item];
  return newArray;
};

function AmenitiesFilter({ setAmenitiesFilter, amenitiesFilter }) {
  const [expanded, setExpanded] = useState(false);
  const catSlice = expanded ? Infinity : 1;
  const itemSlice = expanded ? Infinity : 6;
  const [scroll, setScroll] = useState(0);
  return (
    <StyleWrapped className="AmenitiesFilter" id="amenitiesFilter">
      {amenitiesList.slice(0, catSlice).map((category, catId) => (
        <div key={catId}>
          <h4>{category.sectionTitle}</h4>
          <AmenityList>
            {category.amenities.slice(0, itemSlice).map((amenity, itemId) => (
              <Amenity
                title={amenity}
                key={`${catId}${itemId}`}
                amenities={amenitiesFilter}
                onClick={() => {
                  setAmenitiesFilter(toggleItem(amenity, amenitiesFilter));
                }}
              />
            ))}
          </AmenityList>
        </div>
      ))}
      <ShowMore
        onClick={() => {
          setExpanded(!expanded);
          if (expanded)
            document
              .getElementById('amenitiesFilter')
              .parentNode.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        }}
      >
        {expanded ? 'Show Less' : 'Show More'}
      </ShowMore>
    </StyleWrapped>
  );
}

const StyleWrapped = styled.div`
  background-color: transparent;
  color: #222222;

  display: grid;

  h4 {
    font-weight: 400;
    margin: 1.5em 0;
  }
`;

const ShowMore = styled.button`
  border: none;
  background-color: transparent;
  text-decoration: underline;
  width: fit-content;
  font-size: 1em;
  margin-top: 1em;
  font-weight: 500;
`;

const AmenityList = styled.div`
  display: grid;
  gap: 1.5em;
  grid-template-columns: repeat(auto-fill, max(200px, calc(50% - 2em)));
`;

const TypeDiv = styled.div`
  animation: fadeIn 0.5s ease both;
  display: flex;
  gap: 1em;
  align-items: flex-start;
  div {
    height: 100%;
    width: 80%;
  }

  @keyframes fadeIn {
    from {
      transform: translateY(-10%);
      opacity: 0.1;
    }
    to {
      transform: translateY(0%);
      opacity: 1;
    }
  }
`;

const RadioBox = styled.input`
  accent-color: #222222;
  max-width: 2em;
  flex: 1;
  aspect-ratio: 1;
  &[type='checkBox']:not(:checked) {
    opacity: 0.5;
  }
`;

export default AmenitiesFilter;
