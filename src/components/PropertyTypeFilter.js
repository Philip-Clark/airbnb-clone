import styled from 'styled-components';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import BusinessIcon from '@mui/icons-material/Business';
import VillaOutlinedIcon from '@mui/icons-material/VillaOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
function Type({ title, Icon, setPropertyTypes, propertyTypes }) {
  let activated = propertyTypes.includes(title);
  return (
    <button
      onClick={() => {
        if (activated) setPropertyTypes(propertyTypes.filter((item) => item !== title));
        else setPropertyTypes(propertyTypes.concat(title));
      }}
      activated={activated.toString()}
    >
      {Icon}
      <h3>{title}</h3>
    </button>
  );
}
function PropertyTypeFilter({ setPropertyTypes, propertyTypes }) {
  console.log(propertyTypes);
  return (
    <StyleWrapped className="PropertyTypeFilter">
      <Type
        title="House"
        Icon={<HomeOutlinedIcon />}
        setPropertyTypes={setPropertyTypes}
        propertyTypes={propertyTypes}
      />
      <Type
        title="Apartment"
        Icon={<BusinessIcon />}
        setPropertyTypes={setPropertyTypes}
        propertyTypes={propertyTypes}
      />
      <Type
        title="Guesthouse"
        Icon={<VillaOutlinedIcon />}
        setPropertyTypes={setPropertyTypes}
        propertyTypes={propertyTypes}
      />
      <Type
        title="Hotel"
        Icon={<ApartmentOutlinedIcon />}
        setPropertyTypes={setPropertyTypes}
        propertyTypes={propertyTypes}
      />
    </StyleWrapped>
  );
}

const StyleWrapped = styled.div`
  display: flex;
  gap: 1em;

  button {
    position: relative;
    padding: 1em;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    text-align: left;
    aspect-ratio: 1/0.7;
    border-radius: 1em;
    border: solid 1px #909090;

    &[activated='true']::after {
      position: absolute;
      border: solid black 2px;
      border-radius: inherit;
      content: '';
      left: -2px;
      top: -2px;
      width: 100%;
      height: 100%;
    }

    &:hover {
      border-color: black;
    }

    svg {
      width: 1.5em;
      height: 1.5em;
      aspect-ratio: 1;
      color: #222222;
    }
  }
`;

export default PropertyTypeFilter;
