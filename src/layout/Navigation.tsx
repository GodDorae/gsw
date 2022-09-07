import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
  width: 100%;
  height: 5rem;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: gold;
`;

const Logo = styled.div`
  width: 3rem;
  height: 3rem;

  & img {
    width: 100%;
    height: 100%;
  }
`;

const MenuBar = styled.div`
  width: 30%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
`;

const MenuElement = styled.div`
  transition: all 0.1s ease-in-out;

  &:hover {
    border-bottom: 2px solid black;
  }
`;

function Navigation() {
  return (
    <Header>
      <Logo>
        <img src="assets/logo.png" />
      </Logo>
      <MenuBar>
        <Link to="/">
          <MenuElement>Home</MenuElement>
        </Link>
        <Link to="/team">
          <MenuElement>Team</MenuElement>
        </Link>
        <Link to="/news">
          <MenuElement>News</MenuElement>
        </Link>
      </MenuBar>
    </Header>
  );
}

export default Navigation;
