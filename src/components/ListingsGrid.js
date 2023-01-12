import papaparse from 'papaparse';
import { useEffect, useState } from 'react';
import ListingTile from './ListingTile';
import listings from '../data/listingsLong.csv';

export default function ListingsGrid() {
  const [results, setResults] = useState([]);
  const [data, setData] = useState(new Array(30));
  const [slice, setSlice] = useState(30);
  const [scrollTop, setScrollTop] = useState(0);
  const [columnCount, setColumnCount] = useState(10);

  window.addEventListener('resize', () => {
    const grid = document.getElementById('listingsGrid');
    const columnsString = getComputedStyle(grid).getPropertyValue('grid-template-columns');
    const newColumnCount = columnsString.split(' ').length;
    setColumnCount(newColumnCount);
  });

  const papaConfig = {
    header: true,
    download: true,
    preview: 100,
    complete: (chunkResults) => {
      setResults(chunkResults.data);
      setData(chunkResults.data.slice(0, slice));
    },
    error: (error, file) => {
      console.log('Error while parsing:', error, file);
    },
  };
  useEffect(() => {
    papaparse.parse(listings, papaConfig);
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
      if (currentScrollPercentage() > 95) {
        setSlice(slice + columnCount);
        setData(results.slice(0, slice));
      }
    };
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollTop, data]);

  return (
    <div className="ListingsGrid">
      <ul id="listingsGrid">
        {data.map((item) => (
          <ListingTile key={item.id} data={item} />
        ))}
      </ul>
    </div>
  );
}
