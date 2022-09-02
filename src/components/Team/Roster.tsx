import { useEffect, useState } from "react";
import options from "../../API_INFO";

interface IPlayer {
  id: number;
}

interface IPlayerStat {
  assists: number;
  blocks: number;
  player: { id: number; firstname: string; lastname: string };
  points: number;
  steals: number;
  totReb: number;
}

function Roster() {
  const [allIDs, setAllIDs] = useState<number[]>([]);
  const [mainPlayersIDs, setMainPlayersIDs] = useState<number[]>([]);

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

//   useEffect(() => {
//     fetch(
//       "https://api-nba-v1.p.rapidapi.com/players?team=11&season=2021",
//       options
//     )
//       .then((response) => response.json())
//       .then((response) => {
//         const data = response.response;
//         const ID: number[] = [];
//         data.forEach((datum: IPlayer) => {
//           ID.push(datum.id);
//         });
//         setAllIDs(ID);
//       });
//   }, []);

//   useEffect(() => {
//     fetch(
//       "https://api-nba-v1.p.rapidapi.com/players/statistics?team=11&season=2021",
//       options
//     )
//       .then((response) => response.json())
//       .then((response) => {
//         const data = response.response;
//         const validIDs:number[] = [];
//         for (const id of allIDs) {
//           const result = mainPlayerChecker(id, data);
//           if (result) {
//             validIDs.push(id);
//           }
//         };
//         setMainPlayersIDs(validIDs);
//       });
//   }, [allIDs]);

  return <h1>Roster</h1>;
}

export default Roster;
