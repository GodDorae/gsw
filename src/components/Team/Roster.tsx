import styled from "styled-components";

import { useEffect, useState } from "react";
import options from "../../API_INFO";

const WholeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
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

const EachPlayerButton = styled.button`
  border: none;
  background-color: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EachPlayerImage = styled.img`
  width: 100%;
  margin-bottom: 2.5rem;
`;

const EachPlayerNameAndPos = styled.div`
  font-size: 2.5rem;
`;

const EachPlayerNum = styled.div`
  font-size: 4rem;
  font-weight: 700;
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

  // useEffect(() => {
  //   fetch(
  //     "https://api-nba-v1.p.rapidapi.com/players?team=11&season=2021",
  //     options
  //   )
  //     .then((response) => response.json())
  //     .then((response) => {
  //       const data = response.response;
  //       console.log(data);
  //       const ID: number[] = [];
  //       data.forEach((datum: IPlayer) => {
  //         ID.push(datum.id);
  //       });
  //       setAllIDs(ID);
  //     });
  // }, []);

  // useEffect(() => {
  //   if (allIDs.length !== 0) {
  //     fetch(
  //       "https://api-nba-v1.p.rapidapi.com/players/statistics?team=11&season=2021",
  //       options
  //     )
  //       .then((response) => response.json())
  //       .then((response) => {
  //         const data = response.response;
  //         const validIDs: number[] = [];
  //         for (const id of allIDs) {
  //           const result = mainPlayerChecker(id, data);
  //           if (result) {
  //             validIDs.push(id);
  //           }
  //         }
  //         setMainPlayersIDs(validIDs);
  //       });
  //   }
  // }, [allIDs]);

  // useEffect(() => {
  //   if (mainPlayersIDs.length !== 0) {
  //     fetch(
  //       "https://api-nba-v1.p.rapidapi.com/players?team=11&season=2021",
  //       options
  //     )
  //       .then((response) => response.json())
  //       .then((response) => {
  //         const data = response.response;
  //         const mainPlayersData: IMainPlayerData[] = [];
  //         data.forEach((datum: IPlayer) => {
  //           if (mainPlayersIDs.some((id) => id === datum.id)) {
  //             mainPlayersData.push({
  //               firstname: datum.firstname,
  //               lastname: datum.lastname,
  //               img: `/src/assets/players/${datum.firstname.toLowerCase()}_${datum.lastname.toLowerCase()}.png`,
  //               position: datum.leagues.standard.pos,
  //               number: datum.leagues.standard.jersey,
  //             });
  //           }
  //         });
  //         setMainPlayersData(mainPlayersData);
  //         setIsLoading(false);
  //       });
  //   }
  // }, [mainPlayersIDs]);

  return (
    <WholeContainer>
      <RosterTitle>GSW roster of 21-22 season</RosterTitle>
      <RosterContainer>
        {isLoading
          ? <div style={{fontSize: "2rem"}}>Loading roster...</div>
          : mainPlayersData.map((datum: IMainPlayerData) => (
              <EachPlayerButton>
                <EachPlayerImage src={datum.img} />
                <EachPlayerNameAndPos>
                  {datum.firstname} {datum.lastname} {`(${datum.position})`}
                </EachPlayerNameAndPos>
                <EachPlayerNum>{datum.number}</EachPlayerNum>
              </EachPlayerButton>
            ))}
      </RosterContainer>
    </WholeContainer>
  );
}

export default Roster;
