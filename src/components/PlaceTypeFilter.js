import { listings } from '../data/listings';
import styled from 'styled-components';

function Type({ title, description, onCheck, roomType }) {
  return (
    <TypeDiv>
      <RadioBox type="checkBox" id={roomType} onInput={onCheck} />
      <div>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </div>
    </TypeDiv>
  );
}

function PlaceTypeFilter({ setTypes, types }) {
  const toggleType = (e) => {
    const newTypes = e.target.checked
      ? types.concat(e.target.id)
      : types.filter((item) => item !== e.target.id);
    setTypes(newTypes);
    console.log(newTypes);
  };

  return (
    <StyleWrapped className="TypeFilter">
      <Grid>
        <Type
          title="Entire place"
          description="A place all to yourself"
          roomType="entire home/apt"
          onCheck={toggleType}
        />
        <Type
          title="Private room"
          description="Your own room in a home or a hotel, plus some shared common spaces"
          roomType="private room"
          onCheck={toggleType}
        />
        <Type
          title="Shared room"
          description="A sleeping space and common areas that may be shared with others"
          roomType="shared room"
          onCheck={toggleType}
        />
      </Grid>
    </StyleWrapped>
  );
}

const StyleWrapped = styled.div`
  margin: auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const TypeDiv = styled.div`
  display: flex;
  gap: 1em;
  align-items: flex-start;
  div {
    height: 100%;
    width: 80%;
  }
`;

const RadioBox = styled.input`
  accent-color: #222222;
  max-width: 1.5em;
  flex: 1;
  aspect-ratio: 1;
  &[type='checkBox']:not(:checked) {
    opacity: 0.5;
  }
`;

const Title = styled.p``;
const Description = styled.p`
  color: #737373;
  font-size: 0.8em;
  flex: 1;
`;
export default PlaceTypeFilter;
