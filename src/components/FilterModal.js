import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import { createRef, useEffect } from 'react';
import PriceRangeFilter from './PriceRangeFilter';
import { useState } from 'react';
import { listings } from '../data/listings';
import PlaceTypeFilter from './PlaceTypeFilter';
import RoomCountFilter from './RoomCountFilter';
import PropertyTypeFilter from './PropertyTypeFilter';
import AmenitiesFilter from './AmenitiesFilter';

const filterByPrice = (data, values) => {
  const filtered = data.filter(
    (e) =>
      parseFloat(e.price.replace(/[$,]/g, '')) >= values.min &&
      parseFloat(e.price.replace(/[$,]/g, '')) <= values.max
  );

  return filtered;
};

const filterByType = (data, values) => {
  if (values.length === 0) return data;
  const filtered = data.filter((e) => values.includes(e.room_type.toLowerCase()));
  return filtered;
};

const filterByRoomAndBedCount = (data, bathRooms, bedRooms, beds) => {
  let filtered = data;
  if (bedRooms !== 'Any') filtered = filtered.filter((item) => item.bedrooms >= bedRooms);
  if (bathRooms !== 'Any')
    filtered = filtered.filter((item) => parseInt(item.bathrooms_text.split(' ')[0]) >= bathRooms);
  if (beds !== 'Any') filtered = filtered.filter((item) => item.beds >= beds);

  return filtered;
};

const filterByAmenities = (data, values) => {
  if (values.length === 0) return data;
  let filtered = data.filter((item) => values.every((amenity) => item.amenities.includes(amenity)));
  return filtered;
};

const filterByPropertyType = (data, values) => {
  let filtered = data;
  if (values.length === 0) return data;

  filtered = data.filter(
    (e) =>
      values.some((type) => e.room_type.toLowerCase().includes(type.toLowerCase())) ||
      values.some((type) => e.property_type.toLowerCase().includes(type.toLowerCase())) ||
      values.some((type) => e.name.toLowerCase().includes(type.toLowerCase())) ||
      values.some((type) => e.description.toLowerCase().includes(type.toLowerCase()))
  );

  return filtered;
};

const getAvg = () => {
  let totalPrice = 0;
  let count = 0;
  for (let item of listings) {
    count++;
    totalPrice += Number(item.price.replace(/[$,]/g, ''));
  }

  return totalPrice / count;
};

function FilterModal({ opened, setModalOpen, setData, data, setFilterCount }) {
  const [priceRange, setPriceRange] = useState({ min: -Infinity, max: Infinity });
  const [types, setTypes] = useState([]);
  const [bedroomCount, setBedroomCount] = useState('Any');
  const [bedsCount, setBedsCount] = useState('Any');
  const [bathroomCount, setBathroomCount] = useState('Any');
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [amenitiesFilter, setAmenitiesFilter] = useState([]);

  const [filteredData, setFilteredData] = useState([]);

  let count = filteredData.length;
  const avgPrice = parseInt(getAvg());
  if (opened) document.body.classList.add('noScroll');
  else document.body.classList.remove('noScroll');

  const object = createRef();

  //Apply filters
  useEffect(() => {
    let tempData = filterByPrice(listings, priceRange);
    tempData = filterByType(tempData, types);
    tempData = filterByRoomAndBedCount(tempData, bathroomCount, bedroomCount, bedsCount);
    tempData = filterByPropertyType(tempData, propertyTypes);
    tempData = filterByAmenities(tempData, amenitiesFilter);

    setFilterCount(
      (priceRange.min != -Infinity && 1) +
        types.length +
        (bathroomCount !== 'Any' && 1) +
        (bedroomCount !== 'Any' && 1) +
        (bedsCount !== 'Any' && 1) +
        propertyTypes.length +
        amenitiesFilter.length
    );

    setFilteredData(tempData);
  }, [priceRange, types, bathroomCount, bedroomCount, bedsCount, propertyTypes, amenitiesFilter]);

  useEffect(() => {
    object.current.style.pointerEvents = opened ? 'all' : 'none';
  }, [opened]);

  const close = () => {
    setModalOpen(false);
  };
  const showFiltered = () => {
    setData(filteredData);
    setModalOpen(false);
  };
  const clearFilters = () => {
    setPriceRange({ min: -Infinity, max: Infinity });
    setTypes([]);
    setBedroomCount('Any');
    setBedsCount('Any');
    setBathroomCount('Any');
    setPropertyTypes([]);
    setAmenitiesFilter([]);
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
        <FiltersSection id="ScrollSection">
          <PriceRange>
            <h2>Price range</h2>
            <p>The average nightly price is ${avgPrice}</p>
            <PriceRangeFilter setPriceRange={setPriceRange} />
          </PriceRange>
          <PlaceType>
            <h2>Type of place</h2>
            <PlaceTypeFilter setTypes={setTypes} types={types} />
          </PlaceType>
          <SleepingArrangements>
            <h2>Rooms and beds</h2>
            <RoomCountFilter setCount={setBedroomCount} count={bedroomCount} title={'Bedrooms'} />
            <RoomCountFilter setCount={setBedsCount} count={bedsCount} title={'Beds'} />
            <RoomCountFilter
              setCount={setBathroomCount}
              count={bathroomCount}
              title={'Bathrooms'}
            />
          </SleepingArrangements>
          <PropertyType>
            <h2>Property type</h2>
            <PropertyTypeFilter propertyTypes={propertyTypes} setPropertyTypes={setPropertyTypes} />
          </PropertyType>
          <Amenities>
            <h2>Amenities</h2>
            <AmenitiesFilter
              amenitiesFilter={amenitiesFilter}
              setAmenitiesFilter={setAmenitiesFilter}
            />
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
          <ClearButton onClick={clearFilters}>Clear all</ClearButton>
          <ShowButton onClick={showFiltered}>{`Show ${count} homes`}</ShowButton>
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
  background-color: #424242b6;
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

  .button,
  button {
    cursor: pointer;
    transition: transform 0.1s ease;
    :active {
      transform: scale(0.95);
    }
  }
`;

const Content = styled.div`
  transition: transform 0.3s ease;
  background-color: white;
  border-radius: 1em;
  box-shadow: 0 0 1em #00000042;
  border: solid 1px #dddddd;
  margin: 2em auto;
  max-width: 80ch;
  height: calc(100% - 5em);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 800px) {
    //adding a margin of 2em to each side
    width: calc(100% - 4em);
  }
`;

const TitleBar = styled.div`
  display: flex;
  padding: 1em;
  border-bottom: solid 1px #dddddd;
`;
const CloseButton = styled.button`
  background: none;
  border: none;
  border-radius: 999999px;
  padding: 0.5em;
  flex: 0 1;
  align-content: center;
  justify-content: center;
  line-height: 0;
  &:hover {
    background-color: #f7f7f7;
    border: none;
  }
  svg {
    width: 0.8em;
    height: 0.8em;
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
  padding: 0 1.5em;
  > div {
    border-bottom: #dddddd solid 1px;
    padding: 2em 0;
  }
  h2 {
    font-weight: 500;
  }
`;
const PriceRange = styled.div`
  p {
    color: #7b7b7b;
  }
  .PriceRangeFilter {
    padding: 3em 2em;
    padding-bottom: 0;
  }
`;
const PlaceType = styled.div`
  h2 {
    margin-bottom: 1em;
  }
`;
const SleepingArrangements = styled.div``;
const PropertyType = styled.div`
  h2 {
    margin-bottom: 1em;
  }
`;
const Amenities = styled.div``;
const BookingOptions = styled.div``;
const Accessibility = styled.div``;
const Extras = styled.div``;
const HostLang = styled.div``;
const BottomBar = styled.div`
  border-top: solid 1px #dddddd;
  padding: 1em 0.5em;
  padding-right: 1.5em;
  display: flex;
  justify-content: space-between;
`;
const ClearButton = styled.button`
  font-size: 1em;
  font-weight: 500;
  color: black;
  border: none;
  background-color: white;
  border-radius: 0.5em;
  padding: 0em 1em;
  text-decoration: underline;

  :hover {
    background-color: #f7f7f7;
  }
`;
const ShowButton = styled.button`
  font-weight: 600;
  font-size: 1em;
  color: white;
  background-color: #222222;
  border: none;
  border-radius: 0.5em;
  padding: 1em 1.5em;

  :hover {
    background-color: black;
  }
`;

export default FilterModal;
