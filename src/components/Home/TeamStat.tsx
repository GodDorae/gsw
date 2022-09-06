import { useEffect, useState } from "react";
import styled from "styled-components";
import options from "../../API_INFO";

const TeamStatContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TeamStatTitle = styled.h1`
  font-size: 3rem;
`;

const TeamStatRow = styled.div`
  width: 100%;
  height: 10rem;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TeamStatItem = styled.div`
  width: 8rem;
  height: 8rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
`;

const TeamStatCircle = styled.div`
  width: 6rem;
  height: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: radial-gradient(white, #ffffcc, #ffff66);
  border-radius: 10%;
  font-size: 2rem;
  font-weight: 700;
`;

const TeamStatInfo = styled.div`
  width: 200%;
  font-size: 1rem;
  text-align: center;
`;

function TeamStat() {
  const [win, setWin] = useState(0);
  const [lose, setLose] = useState(0);
  const [winP, setWinP] = useState("");
  const [rank, setRank] = useState(0);
  const [points, setPoints] = useState(0);
  const [assists, setAssists] = useState(0);
  const [rebounds, setRebounds] = useState(0);
  const [steals, setSteals] = useState(0);
  const [blocks, setBlocks] = useState(0);

  useEffect(() => {
    fetch(
      "https://api-nba-v1.p.rapidapi.com/standings?league=standard&season=2021&team=11",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        const data = response.response[0];
        setWin(data.win.total);
        setLose(data.loss.total);
        setWinP(data.win.percentage);
        setRank(data.conference.rank);
      });
  }, []);

  useEffect(() => {
    fetch(
      "https://api-nba-v1.p.rapidapi.com/teams/statistics?season=2021&id=11",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        const data = response.response[0];
        setPoints(data.points);
        setAssists(data.assists);
        setRebounds(data.totReb);
        setSteals(data.steals);
        setBlocks(data.blocks);
      });
  }, []);

  return (
    <TeamStatContainer>
      <TeamStatTitle>Our 21-22 was bright</TeamStatTitle>
      <h3 style={{ fontSize: "2rem" }}>🏀 Regular Season</h3>
      <TeamStatRow>
        <TeamStatItem>
          <TeamStatCircle>{win}</TeamStatCircle>
          <TeamStatInfo>✅ Total Win</TeamStatInfo>
        </TeamStatItem>
        <TeamStatItem>
          <TeamStatCircle>{lose}</TeamStatCircle>
          <TeamStatInfo>❌ Total Loss</TeamStatInfo>
        </TeamStatItem>
        <TeamStatItem>
          <TeamStatCircle>{winP}</TeamStatCircle>
          <TeamStatInfo>📇 Win Probability</TeamStatInfo>
        </TeamStatItem>
        <TeamStatItem>
          <TeamStatCircle>{rank}</TeamStatCircle>
          <TeamStatInfo>🏆 West Conference Rank</TeamStatInfo>
        </TeamStatItem>
      </TeamStatRow>
      <h3 style={{ fontSize: "2rem" }}>🏀 Regular Season Stats</h3>
      <TeamStatRow>
        <TeamStatItem>
          <TeamStatCircle>{points}</TeamStatCircle>
          <TeamStatInfo>🧡 Total Points</TeamStatInfo>
        </TeamStatItem>
        <TeamStatItem>
          <TeamStatCircle>{assists}</TeamStatCircle>
          <TeamStatInfo>💛 Total Assists</TeamStatInfo>
        </TeamStatItem>
        <TeamStatItem>
          <TeamStatCircle>{rebounds}</TeamStatCircle>
          <TeamStatInfo>💙 Total Rebounds</TeamStatInfo>
        </TeamStatItem>
        <TeamStatItem>
          <TeamStatCircle>{steals}</TeamStatCircle>
          <TeamStatInfo>💚 Total Steals</TeamStatInfo>
        </TeamStatItem>
        <TeamStatItem>
          <TeamStatCircle>{blocks}</TeamStatCircle>
          <TeamStatInfo>💜 Total Blocks</TeamStatInfo>
        </TeamStatItem>
      </TeamStatRow>
    </TeamStatContainer>
  );
}

export default TeamStat;
