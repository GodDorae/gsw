import styled from "styled-components";

import { useContext, useEffect, useState } from "react";
import options from "../../API_INFO";
import { MainPlayersContext } from "../../pages/TeamPage";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const WholeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  margin-bottom: 3rem;
`;

const RosterContainer = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: repeat(3, minmax(10rem, 1fr));
  grid-template-rows: auto;
  gap: 2rem;
`;

const RosterTitle = styled.div`
  width: 80%;
  padding: 3rem 0;
  font-size: 3rem;
  font-weight: 700;
  text-align: left;
`;

const ButtonContainer = styled.div`
  width: 80%;
`;

const LeaderBoardButton = styled.button`
  width: 10rem;
  height: 5rem;
  border: none;
  border-radius: 10px;
  background-color: gold;
  color: black;
  font-size: 1rem;
  padding: 1rem;
`;

const EachPlayerButton = styled.button`
  border: none;
  background-color: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    box-shadow: 0 5px 5px 5px rgba(0, 0, 0, 0.25);
  }
`;

const EachPlayerImage = styled.img`
  width: 10rem;
  margin-bottom: 2.5rem;
`;

const EachPlayerNameAndPos = styled.div`
  width: 100%;
  text-align: center;
  font-size: 2rem;
`;

interface IPlayer {
  id: number;
  firstname: string;
  lastname: string;
  leagues: { standard: { jersey: number; pos: string } };
}

interface IPlayerStat {
  assists: number;
  blocks: number;
  player: { id: number; firstname: string; lastname: string };
  points: number;
  steals: number;
  totReb: number;
}

interface IMainPlayerData {
  id: number;
  firstname: string;
  lastname: string;
  img: string;
  position: string;
  number: number;
}

function Roster() {
  const [allIDs, setAllIDs] = useState<number[]>([]);
  const [mainPlayersIDs, setMainPlayersIDs] = useState<number[]>([]);
  const [mainPlayersData, setMainPlayersData] = useState<IMainPlayerData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { mainPlayers, setMainPlayersHandler } = useContext(MainPlayersContext);

  function mainPlayerChecker(id: number, givenList: IPlayerStat[]) {
    let count = 0;
    for (const obj of givenList) {
      if (obj.player.id === id) {
        count += 1;
      }
    }
    if (count >= 20) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    fetch(
      "https://api-nba-v1.p.rapidapi.com/players?team=11&season=2021",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        const data = response.response;
        const ID: number[] = [];
        data.forEach((datum: IPlayer) => {
          ID.push(datum.id);
        });
        setAllIDs(ID);
      });
  }, []);

  useEffect(() => {
    if (allIDs.length !== 0) {
      fetch(
        "https://api-nba-v1.p.rapidapi.com/players/statistics?team=11&season=2021",
        options
      )
        .then((response) => response.json())
        .then((response) => {
          const data = response.response;
          const validIDs: number[] = [];
          for (const id of allIDs) {
            const result = mainPlayerChecker(id, data);
            if (result) {
              validIDs.push(id);
            }
          }
          setMainPlayersIDs(validIDs);
        });
    }
  }, [allIDs]);

  useEffect(() => {
    if (mainPlayersIDs.length !== 0) {
      fetch(
        "https://api-nba-v1.p.rapidapi.com/players?team=11&season=2021",
        options
      )
        .then((response) => response.json())
        .then((response) => {
          const data = response.response;
          const mainPlayersData: IMainPlayerData[] = [];
          data.forEach((datum: IPlayer) => {
            if (mainPlayersIDs.some((id) => id === datum.id)) {
              mainPlayersData.push({
                id: datum.id,
                firstname: datum.firstname,
                lastname: datum.lastname,
                img: `assets/players/${datum.firstname.toLowerCase()}_${datum.lastname.toLowerCase()}.png`,
                position: datum.leagues.standard.pos,
                number: datum.leagues.standard.jersey,
              });
            }
          });
          setMainPlayersData(mainPlayersData);
          setMainPlayersHandler(mainPlayersData);
          setIsLoading(false);
        });
    }
  }, [mainPlayersIDs]);

  return (
    <WholeContainer>
      <Helmet>
        <title>Roster</title>
      </Helmet>
      <RosterTitle>GSW roster of 21-22 season</RosterTitle>
      <ButtonContainer>
        <LeaderBoardButton>
          <Link to={"/gsw/team/leaderboard"}>
            {isLoading ? "Loading..." : "Go to the leaderboard"}
          </Link>
        </LeaderBoardButton>
      </ButtonContainer>
      <RosterContainer>
        {isLoading ? (
          <div style={{ fontSize: "2rem" }}>Loading roster...</div>
        ) : (
          mainPlayersData.map((datum: IMainPlayerData) => (
            <EachPlayerButton key={datum.id}>
              <Link to={`/gsw/team/${datum.id}`}>
                <EachPlayerImage src={datum.img} />
                <EachPlayerNameAndPos>
                  {datum.firstname} {datum.lastname} {`(${datum.position})`}
                </EachPlayerNameAndPos>
              </Link>
            </EachPlayerButton>
          ))
        )}
      </RosterContainer>
    </WholeContainer>
  );
}

export default Roster;
