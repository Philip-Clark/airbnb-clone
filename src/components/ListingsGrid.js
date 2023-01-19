import papaparse from 'papaparse';
import { useEffect, useState } from 'react';
import ListingTile from './ListingTile';
import { listings } from '../data/listings';
import styled from 'styled-components';

export default function ListingsGrid({ filterMethod = () => 1 === 1 }) {
  const [slice, setSlice] = useState(100); //Controls the number of listings shown
  const [scrollTop, setScrollTop] = useState(0); //For scroll updates
  let columnCount = 10; //Controls how many more listings to load
  const data = listings.filter(filterMethod).slice(0, slice);

  useEffect(() => {
    const grid = document.getElementById('listingsGrid');
    setSlice(slice + columnCount);

    if (!grid) return;
    const columnsString = getComputedStyle(grid).getPropertyValue('grid-template-columns');
    columnCount = columnsString.split(' ').length;
  }, []);

  function currentScrollPercentage() {
    return (
      ((document.documentElement.scrollTop + document.body.scrollTop) /
        (document.documentElement.scrollHeight - document.documentElement.clientHeight)) *
      100
    );
  }

  useEffect(() => {
    const onScroll = (e) => {
      setScrollTop(e.target.documentElement.scrollTop);
      if (currentScrollPercentage() > 90) {
        setSlice(slice + columnCount);
      }
    };
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollTop, data, columnCount, slice]);

  return (
    <StyleWrapped className="ListingsGrid">
      <ul id="listingsGrid">
        {data.map((item) => (
          <ListingTile key={item.id} data={item} class="listingThumbnail" />
        ))}
      </ul>
    </StyleWrapped>
  );
}

const StyleWrapped = styled.div`
  ul {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5em 1.5em;
  }

  @media (min-width: 600px) {
    ul {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }
`;
