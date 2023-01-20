import styled from 'styled-components';

function {{pascalCase name}} () {
  return (
    <StyleWrapped className="{{pascalCase name}}">
      <h2>Template component</h2>
    </StyleWrapped>
  );
}

const StyleWrapped = styled.div`
  background-color: #4c5056;
  color: #fff;
  border: 1px solid #303338;
  border-radius: 5px;

  .h2 {
    font-weight: 800;
    letter-spacing: 0.2em;
  }
`;


export default {{pascalCase name}}