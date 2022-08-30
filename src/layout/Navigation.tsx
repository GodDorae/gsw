import styled from "styled-components";
import LogoImage from "../assets/logo.png";

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

function Navigation() {
  return (
    <Header>
      <Logo>
        <img src={LogoImage} />
      </Logo>
      <MenuBar>
        <div>Home</div>
        <div>Team</div>
        <div>News</div>
      </MenuBar>
    </Header>
  );
}

export default Navigation;
