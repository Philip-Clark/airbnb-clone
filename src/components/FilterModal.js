import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import { createRef, useEffect } from 'react';

function FilterModal({ opened, setModalOpen }) {
  if (opened) document.body.classList.add('noScroll');
  else document.body.classList.remove('noScroll');

  const object = createRef();

  useEffect(() => {
    object.current.style.pointerEvents = opened ? 'all' : 'none';
  }, [opened]);

  const close = () => {
    setModalOpen(false);
  };

  return (
    <StyleWrapped ref={object} id="FilterModal" open={opened}>
      <Content>
        <TitleBar>
          <CloseButton onClick={close}>
            <CloseIcon />
          </CloseButton>
          <Title>Filters</Title>
        </TitleBar>
        <FiltersSection>
          <PriceRange>
            <h2>Price range</h2>
          </PriceRange>
          <PlaceType>
            <h2>Type of place</h2>
          </PlaceType>
          <SleepingArrangements>
            <h2>Rooms and beds</h2>
          </SleepingArrangements>
          <PropertyType>
            <h2>Property type</h2>
          </PropertyType>
          <Amenities>
            <h2>Amenities</h2>
          </Amenities>
          <BookingOptions>
            <h2>Booking options</h2>
          </BookingOptions>
          <Accessibility>
            <h2>Accessibility features</h2>
          </Accessibility>
          <Extras>
            <h2>Top tier stays</h2>
          </Extras>
          <HostLang>
            <h2>Host language</h2>
          </HostLang>
        </FiltersSection>
        <BottomBar>
          <ClearButton></ClearButton>
          <ShowButton></ShowButton>
        </BottomBar>
      </Content>
    </StyleWrapped>
  );
}

const StyleWrapped = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  margin: 0;
  padding: 0;
  pointer-events: none;
  background-color: #4242428f;
  transition: opacity 0.3s ease;

  &[open] {
    opacity: 1;
    & > div {
      transform: translateY(0);
    }
  }

  opacity: 0;
  & > div {
    transform: translateY(50%);
  }
`;

const Content = styled.div`
  transition: transform 0.3s ease;
  background-color: white;
  border-radius: 1em;
  box-shadow: 0 0 1em #00000042;
  border: solid 1px #dddddd;
  margin: 2em auto;
  max-width: 110ch;
  height: calc(100% - 5em);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #222222;

  @media (min-width: 800px) {
    //adding a margin of 2em to each side
    width: calc(100% - 4em);
  }
`;

const TitleBar = styled.div`
  display: flex;
  padding: 2em;
  border-bottom: solid 1px #dddddd;
`;
const CloseButton = styled.button`
  background: none;
  border: none;
  border-radius: 999999px;
  flex: 0 1;
  &:hover {
    background-color: #f7f7f7;
  }
  > * {
    pointer-events: none;
  }
`;
const Title = styled.h3`
  flex: 1;
  text-align: center;
`;
const FiltersSection = styled.div`
  overflow-y: scroll;
  padding: 0 1em;
  > div {
    border-bottom: #dddddd solid 1px;
    padding: 2em 0;
  }
  h2 {
    font-weight: 500;
  }
`;
const PriceRange = styled.div``;
const PlaceType = styled.div``;
const SleepingArrangements = styled.div``;
const PropertyType = styled.div``;
const Amenities = styled.div``;
const BookingOptions = styled.div``;
const Accessibility = styled.div``;
const Extras = styled.div``;
const HostLang = styled.div``;
const BottomBar = styled.div`
  border-top: solid 1px #dddddd;
  padding: 2em;
`;
const ClearButton = styled.button``;
const ShowButton = styled.button``;

export default FilterModal;
