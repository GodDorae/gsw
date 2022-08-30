import styled from "styled-components";

const FooterElement = styled.footer`
  width: 100%;
  height: 5rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  background-color: rgb(29, 66, 138);
  color: white;
`;

function Footer() {
  return (
    <FooterElement>
      <div>Copyright © 2022 Dohyun Lee, All rights reserved.</div>
    </FooterElement>
  );
}

export default Footer;
