import styled from 'styled-components';
import Header from './Header';
import ListingsGrid from './ListingsGrid';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import TuneRounded from '@mui/icons-material/TuneRounded';

import { useState } from 'react';
import { useUID } from 'react-uid';
import filters from './filters';
import { listings } from '../data/listings';
import FilterModal from './FilterModal';
import { useEffect } from 'react';

function Home() {
  // const [filterScroll, setFilterScroll] = useState(0);
  const uid = useUID();
  const [quickFilter, setQuickFilter] = useState();
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [data, setData] = useState(listings);
  const [filterCount, setFilterCount] = useState(0);
  useEffect(() => {
    if (quickFilter) setData(listings.filter(quickFilter));
  }, [quickFilter]);

  const open = () => {
    setFilterModalOpen(true);
  };

  window.addEventListener('scroll', (e) => {
    if (!document.getElementById('header')) return;
    if (window.scrollY > 10) {
      document.getElementById('header').style.boxShadow = '0 0 1em #00000056';
    } else document.getElementById('header').style.boxShadow = 'none';
  });

  return (
    <StyleWrapped id="Home">
      <HomeHeader id="header">
        <Header />
        <FilterBar>
          <ScrollButton
            onClick={() => {
              const filterList = document.getElementById('filtersList');
              filterList.scrollLeft -= filterList.clientWidth / 2;
              // setFilterScroll(filterList.scrollLeft);
            }}
          >
            <ChevronLeftRoundedIcon />
          </ScrollButton>
          <Filters id="filtersList">
            {filters.map(({ icon, label, filterMethod }) => (
              <FilterButton
                key={label}
                className={'filters'}
                onClick={(e) => {
                  setQuickFilter(() => filterMethod);
                  const lastFilter = document.getElementById('active');
                  if (lastFilter) lastFilter.id = '';
                  e.target.id = 'active';
                  setFilterCount(0);
                }}
              >
                {icon} <p>{label}</p>
              </FilterButton>
            ))}
          </Filters>
          <ScrollButton
            onClick={() => {
              const filterList = document.getElementById('filtersList');
              filterList.scrollLeft += filterList.clientWidth / 2;
              // setFilterScroll(filterList.scrollLeft);
            }}
          >
            <ChevronRightRoundedIcon />
          </ScrollButton>
          <TuneButton onClick={open} activeFilters={(filterCount !== 0).toString()}>
            <TuneRounded id="tune" />
            <p>Filters</p>
            {filterCount > 0 && <div id="boldBorder" />}
            {filterCount > 0 && <p id="filterCount">{filterCount}</p>}
          </TuneButton>
        </FilterBar>
      </HomeHeader>
      <div id="listings">
        <ListingsGrid inData={data} />
      </div>
      <FilterModal
        opened={filterModalOpen}
        setModalOpen={setFilterModalOpen}
        setData={setData}
        data={data}
        setFilterCount={setFilterCount}
      />
    </StyleWrapped>
  );
}

const StyleWrapped = styled.div`
  max-width: 190ch;
  margin: auto;
  #listings {
    margin: 1em 2.5em;
  }
`;

const HomeHeader = styled.div`
  background-color: white;
  position: sticky;
  top: 0;
  #Header div {
    max-width: 190ch;
    margin: auto;
    padding: 1em 4em;
  }

  #Header {
    margin-bottom: 2em;
  }
`;
const FilterBar = styled.div`
  display: flex;
  padding: 1em 1em;
  padding-bottom: 2em;
  gap: 1.5em;
  align-items: center;
  justify-content: center;

  @media (min-width: 600px) {
    padding: 0em 4em 1.5em;
  }
`;

const FilterButton = styled.button`
  text-align: center;
  background-color: white;
  border: none;
  color: #717171;

  > * {
    pointer-events: none;
  }
  p {
    width: max-content;
    border-bottom: solid 2px white;
    padding-bottom: 1em;
  }
  &#active p {
    border-bottom: solid 2px black;
    color: black;
  }
  &:hover p {
    border-bottom: solid 2px #dddddd;
    color: black;
  }
`;

const ScrollButton = styled.button`
  border: solid 1px #dddddd;
  border-radius: 999999999px;
  height: 2em;
  width: 2em;
  margin-bottom: 1em;

  color: #717171;
  aspect-ratio: 1;
  transition: box-shadow 0.2s ease;
  background-color: white;
  &:hover {
    box-shadow: 0 0 1em #0000001e;
  }

  svg {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
`;

const TuneButton = styled.button`
  display: flex;
  height: fit-content;
  padding: 1em 1em;
  position: relative;
  gap: 1em;
  border: solid 1px #dddddd;
  background-color: white;
  align-items: center;
  border-radius: 1em;
  #tune {
    color: #222222;
  }

  #filterCount {
    position: absolute;
    top: -0.5em;
    right: -0.5em;
    width: 1em;
    height: 1em;
    font-size: 0.8em;
    padding: 0.3em;
    border-radius: 9000em;
    background-color: #222222;
    color: white;
  }

  #boldBorder {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    border-radius: inherit;
    border: #222222 solid 2px;
  }
`;
const Filters = styled.div`
  scroll-behavior: smooth;
  display: flex;
  gap: 3em;
  overflow-x: scroll;

  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  &::-webkit-scrollbar {
    /* WebKit */
    width: 0;
    height: 0;
  }
`;

export default Home;
