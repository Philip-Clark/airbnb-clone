import { useRef } from 'react';
import { useState } from 'react';
import styled from 'styled-components';

function Item({ title, onClick, items }) {
  return (
    <TypeDiv>
      <RadioBox type="checkBox" onClick={onClick} checked={items.includes(title)} />
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

function CategoryItemFilter({
  filterSetter: setFilters,
  filterGetter: filters,
  data,
  defaultSlice,
}) {
  const [expanded, setExpanded] = useState(false);
  const catSlice = expanded ? Infinity : 1;
  const itemSlice = expanded ? Infinity : defaultSlice;
  const section = useRef();

  console.log(data);
  return (
    <StyleWrapped className="CategoryItemFilter" ref={section}>
      {data.slice(0, catSlice).map((category, catId) => (
        <div key={catId}>
          <h4>{category.title}</h4>
          <ItemList>
            {category.items.slice(0, itemSlice).map((item, itemId) => (
              <Item
                title={item}
                key={`${catId}${itemId}`}
                items={filters}
                onClick={() => {
                  setFilters(toggleItem(item, filters));
                }}
              />
            ))}
          </ItemList>
        </div>
      ))}
      <ShowMore
        onClick={() => {
          setExpanded(!expanded);
          if (expanded)
            section.current.parentNode.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
              inline: 'nearest',
            });
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

const ItemList = styled.div`
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
  width: 1.5em;
  aspect-ratio: 1;
  &[type='checkBox']:not(:checked) {
    opacity: 0.5;
  }
`;

export default CategoryItemFilter;
