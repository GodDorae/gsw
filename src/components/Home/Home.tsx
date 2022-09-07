import { Helmet } from "react-helmet";
import styled from "styled-components";
import Gallery from "./Gallery";
import TeamStat from "./TeamStat";
import VideoAndTitle from "./VideoAndTitle";

const HomePageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;
`

function Home() {
  return (
    <HomePageContainer>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <VideoAndTitle />
      <TeamStat />
      <Gallery />
    </HomePageContainer>
  );
}

export default Home;