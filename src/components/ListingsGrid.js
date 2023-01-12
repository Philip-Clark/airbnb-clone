import papaparse from 'papaparse';
import { useEffect, useState } from 'react';
import ListingTile from './ListingTile';
import { listings } from '../data/listings';

export default function ListingsGrid(props) {
  const [slice, setSlice] = useState(30);
  const [scrollTop, setScrollTop] = useState(0);
  const [columnCount, setColumnCount] = useState(10);
  const data = listings.slice(0, slice);

  window.addEventListener('resize', () => {
    const grid = document.getElementById('listingsGrid');
    const columnsString = getComputedStyle(grid).getPropertyValue('grid-template-columns');
    const newColumnCount = columnsString.split(' ').length;
    setColumnCount(newColumnCount);
  });

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
      if (currentScrollPercentage() > 95) {
        setSlice(slice + columnCount);
      }
    };
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollTop, data]);

  return (
    <div className="ListingsGrid"
      <ul id="listingsGrid">
        {data.map((item) => (
          <ListingTile key={item.id} data={item} class="listingThumbnail" />
        ))}
      </ul>
    </div>
  );
}
