import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from "./GlobalStyle";
import Footer from "./layout/Footer";
import Navigation from "./layout/Navigation";
import HomePage from "./pages/HomePage";
import NewsPage from "./pages/NewsPage";
import TeamPage from "./pages/TeamPage";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

function App() {
  return (
    <Fragment>
      <GlobalStyle />
      <Navigation />
      <Container>
        <Routes>
          <Route element={<HomePage />} path="/gsw/" />
          <Route element={<TeamPage />} path="/gsw/team/*" />
          <Route element={<NewsPage />} path="/gsw/news" />
        </Routes>
      </Container>
      <Footer />
    </Fragment>
  );
}
export default App;
