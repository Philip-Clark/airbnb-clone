import { listings } from '../data/listings';
import styled from 'styled-components';
import { useEffect } from 'react';

function RoomCountFilter({ setCount, count, title }) {
  const items = ['Any', 1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <StyleWrapped className="RoomCountFilter">
      <Title>{title}</Title>
      <CountList>
        {items.map((item, i) => (
          <button
            onClick={() => {
              setCount(item);
            }}
            key={i}
            active={(count === item).toString()}
          >
            {item}
            {item === 8 && '+'}
          </button>
        ))}
      </CountList>
    </StyleWrapped>
  );
}

const StyleWrapped = styled.div`
  margin: auto;
`;

const Title = styled.p`
  margin: 1em 0;
`;

const CountList = styled.div`
  display: flex;
  gap: 0.5em;
  width: 100%;
  overflow-x: scroll;

  button {
    border-radius: 900rem;
    border: 1px solid #dddddd;
    padding: 0.8em 2em;
    &[active='true'] {
      background-color: #222222;
      color: white;
    }

    &:hover {
      border: 1px solid black;
    }
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

export default RoomCountFilter;
