import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../logo';

function Header() {
  return (
    <StyleWrapped id="Header">
      <div>
        <Link to={'/'}>
          <Logo />
        </Link>
      </div>
    </StyleWrapped>
  );
}

const StyleWrapped = styled.div`
  color: #fff;
  padding: 1em 0;
  border-bottom: #dddddd solid 1px;
`;

export default Header;
