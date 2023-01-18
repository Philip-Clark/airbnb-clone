import styled from 'styled-components';
import Header from './Header';
import ListingsGrid from './ListingsGrid';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import { useState } from 'react';

const filters = new Array(80).fill('Filter');

function Home() {
  const [filterScroll, setFilterScroll] = useState(0);
  window.addEventListener('scroll', (e) => {
    if (window.scrollY > 10)
      document.getElementById('header').style.boxShadow = '0 0 10px #00000037';
    else document.getElementById('header').style.boxShadow = 'none';
  });
  return (
    <StyleWrapped id="Home">
      <HomeHeader id="header">
        <Header />
        <FilterBar>
          <ScrollButton
            onClick={() => {
              const filterList = document.getElementById('filtersList');

              filterList.scrollLeft -= 300;
              setFilterScroll(filterList.scrollLeft);
            }}
          >
            <ChevronLeftRoundedIcon />
          </ScrollButton>
          <Filters id="filtersList">
            {filters.map((text) => (
              <div>
                <FilterAltRoundedIcon /> <p>{text}</p>
              </div>
            ))}
          </Filters>
          <ScrollButton
            onClick={() => {
              const filterList = document.getElementById('filtersList');

              filterList.scrollLeft += 300;
              setFilterScroll(filterList.scrollLeft);
            }}
          >
            <ChevronRightRoundedIcon />
          </ScrollButton>

          <TuneButton>
            <TuneRoundedIcon id="tune" />
            <p>Filters</p>
          </TuneButton>
        </FilterBar>
      </HomeHeader>
      <div id="listings">
        <ListingsGrid />
      </div>
    </StyleWrapped>
  );
}

const StyleWrapped = styled.div`
  max-width: 190ch;
  margin: auto;

  #listings {
    margin: 2em 4em;
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
  padding: 1em 4em;
  padding-bottom: 2em;
  gap: 1.5em;
  align-items: center;
`;

const ScrollButton = styled.button`
  border: solid 1px #dddddd;
  border-radius: 999999999px;
  display: block;
  width: 10em;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 0 2em #0000004b;
  }
`;

const TuneButton = styled.button`
  display: flex;
  height: fit-content;
  padding: 1em 1em;
  gap: 1em;
  border: solid 1px #dddddd;
  align-items: center;
  border-radius: 1em;
  #tune {
    color: #222222;
  }
`;
const Filters = styled.div`
  scroll-behavior: smooth;
  display: flex;
  gap: 3em;
  overflow-x: scroll;
  div {
    text-align: center;
  }

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
