import styled from "styled-components";
import TeamStat from "./TeamStat";
import VideoAndTitle from "./VideoAndTitle";

const HomePageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

function Home() {
  return (
    <HomePageContainer>
      <VideoAndTitle />
      <TeamStat />
    </HomePageContainer>
  );
}

export default Home;