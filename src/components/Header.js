import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../logo';

function Header() {
  window.addEventListener('scroll', (e) => {
    if (window.scrollY > 10)
      document.getElementById('header').style.boxShadow = '0 0 1em #00000056';
    else document.getElementById('header').style.boxShadow = 'none';
  });

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
