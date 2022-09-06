import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import options from "../../API_INFO";
import { MainPlayersContext } from "../../pages/TeamPage";

const WholeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  margin-bottom: 3rem;
`;

const LeaderboardTitle = styled.div`
  width: 80%;
  padding: 3rem 0;
  font-size: 3rem;
  font-weight: 700;
  text-align: left;
`;

const LeaderboardContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const EachLeaderButton = styled.button`
  border: none;
  background-color: none;
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EachLeaderTitle = styled.div`
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const EachLeaderImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 1.5rem;
`;

const EachLeaderName = styled.div`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const EachLeaderStat = styled.div`
  font-size: 1.5rem;
`;

interface IPlayerStat {
  assists: number;
  blocks: number;
  player: { id: number; firstname: string; lastname: string };
  points: number;
  steals: number;
  totReb: number;
}

function Leaderboard() {
  const { mainPlayers, setMainPlayersHandler } = useContext(MainPlayersContext);
  const [data, setData] = useState<IPlayerStat[]>([]);
  const [assistLeader, setAssistLeader] = useState<IPlayerStat[] | undefined>();
  const [blockLeader, setBlockLeader] = useState<IPlayerStat[] | undefined>();
  const [pointLeader, setPointLeader] = useState<IPlayerStat[] | undefined>();
  const [stealLeader, setStealLeader] = useState<IPlayerStat[] | undefined>();
  const [reboundLeader, setReboundLeader] = useState<
    IPlayerStat[] | undefined
  >();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  function leaderFinder(standard: string, givenList: IPlayerStat[]) {
    let max_value = 0;
    let result;
    switch (standard) {
      case "assists":
        for (const player of givenList) {
          if (player.assists > max_value) {
            max_value = player.assists;
          }
        }
        result = givenList.filter((player) => player.assists === max_value);
        break;
      case "blocks":
        for (const player of givenList) {
          if (player.blocks > max_value) {
            max_value = player.blocks;
          }
        }
        result = givenList.filter((player) => player.blocks === max_value);
        break;
      case "points":
        for (const player of givenList) {
          if (player.points > max_value) {
            max_value = player.points;
          }
        }
        result = givenList.filter((player) => player.points === max_value);
        break;
      case "steals":
        for (const player of givenList) {
          if (player.steals > max_value) {
            max_value = player.steals;
          }
        }
        result = givenList.filter((player) => player.steals === max_value);
        break;
      case "totReb":
        for (const player of givenList) {
          if (player.totReb > max_value) {
            max_value = player.totReb;
          }
        }
        result = givenList.filter((player) => player.totReb === max_value);
        break;
      default:
        break;
    }
    return result;
  }

  useEffect(() => {
    for (const player of mainPlayers) {
      fetch(
        `https://api-nba-v1.p.rapidapi.com/players/statistics?season=2021&id=${player.id}`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          const data: IPlayerStat[] = response.response;
          const length = data.length;
          const assists =
            data.reduce(function (accumulator, currentValue) {
              return accumulator + currentValue.assists;
            }, 0) / length;
          const blocks =
            data.reduce(function (accumulator, currentValue) {
              return accumulator + currentValue.blocks;
            }, 0) / length;
          const points =
            data.reduce(function (accumulator, currentValue) {
              return accumulator + currentValue.points;
            }, 0) / length;
          const steals =
            data.reduce(function (accumulator, currentValue) {
              return accumulator + currentValue.steals;
            }, 0) / length;
          const totReb =
            data.reduce(function (accumulator, currentValue) {
              return accumulator + currentValue.totReb;
            }, 0) / length;
          const playerData: IPlayerStat = {
            assists,
            blocks,
            player: {
              id: data[0].player.id,
              firstname: data[0].player.firstname,
              lastname: data[0].player.lastname,
            },
            points,
            steals,
            totReb,
          };
          setData((prev) => {
            const newList = [...prev, playerData];
            return newList;
          });
        });
    }
  }, []);

  useEffect(() => {
    if (data.length) {
      const assistLeader = leaderFinder("assists", data);
      const blockLeader = leaderFinder("blocks", data);
      const pointLeader = leaderFinder("points", data);
      const stealLeader = leaderFinder("steals", data);
      const reboundLeader = leaderFinder("totReb", data);

      setAssistLeader(assistLeader);
      setBlockLeader(blockLeader);
      setPointLeader(pointLeader);
      setStealLeader(stealLeader);
      setReboundLeader(reboundLeader);
      setIsLoading(false);
    }
  }, [data]);

  return (
    <WholeContainer>
      <LeaderboardTitle>
        Stat leaders of 21-22 season in GSW team
      </LeaderboardTitle>
      <LeaderboardContainer>
        {isLoading && (
          <div style={{ fontSize: "2rem" }}>Loading leaderboard...</div>
        )}
        <EachLeaderButton>
          <EachLeaderTitle>🏆 Point Leader</EachLeaderTitle>
          {pointLeader && (
            <>
              <EachLeaderImage
                src={`/src/assets/players/${pointLeader[0].player.firstname.toLowerCase()}_${pointLeader[0].player.lastname.toLowerCase()}.png`}
              />
              <EachLeaderName>
                {pointLeader[0].player.firstname}{" "}
                {pointLeader[0].player.lastname}
              </EachLeaderName>
              <EachLeaderStat>{pointLeader[0].points.toFixed(1)} points</EachLeaderStat>
            </>
          )}
        </EachLeaderButton>
        <EachLeaderButton>
          <EachLeaderTitle>🏆 Assist Leader</EachLeaderTitle>
          {assistLeader && (
            <>
              <EachLeaderImage
                src={`/src/assets/players/${assistLeader[0].player.firstname.toLowerCase()}_${assistLeader[0].player.lastname.toLowerCase()}.png`}
              />
              <EachLeaderName>
                {assistLeader[0].player.firstname}{" "}
                {assistLeader[0].player.lastname}
              </EachLeaderName>
              <EachLeaderStat>{assistLeader[0].assists.toFixed(1)} assists</EachLeaderStat>
            </>
          )}
        </EachLeaderButton>
        <EachLeaderButton>
          <EachLeaderTitle>🏆 Rebound Leader</EachLeaderTitle>
          {reboundLeader && (
            <>
              <EachLeaderImage
                src={`/src/assets/players/${reboundLeader[0].player.firstname.toLowerCase()}_${reboundLeader[0].player.lastname.toLowerCase()}.png`}
              />
              <EachLeaderName>
                {reboundLeader[0].player.firstname}{" "}
                {reboundLeader[0].player.lastname}
              </EachLeaderName>
              <EachLeaderStat>
                {reboundLeader[0].totReb.toFixed(1)} rebounds
              </EachLeaderStat>
            </>
          )}
        </EachLeaderButton>
        <EachLeaderButton>
          <EachLeaderTitle>🏆 Block Leader</EachLeaderTitle>
          {blockLeader && (
            <>
              <EachLeaderImage
                src={`/src/assets/players/${blockLeader[0].player.firstname.toLowerCase()}_${blockLeader[0].player.lastname.toLowerCase()}.png`}
              />
              <EachLeaderName>
                {blockLeader[0].player.firstname}{" "}
                {blockLeader[0].player.lastname}
              </EachLeaderName>
              <EachLeaderStat>{blockLeader[0].blocks.toFixed(1)} blocks</EachLeaderStat>
            </>
          )}
        </EachLeaderButton>
        <EachLeaderButton>
          <EachLeaderTitle>🏆 Steal Leader</EachLeaderTitle>
          {stealLeader && (
            <>
              <EachLeaderImage
                src={`/src/assets/players/${stealLeader[0].player.firstname.toLowerCase()}_${stealLeader[0].player.lastname.toLowerCase()}.png`}
              />
              <EachLeaderName>
                {stealLeader[0].player.firstname}{" "}
                {stealLeader[0].player.lastname}
              </EachLeaderName>
              <EachLeaderStat>{stealLeader[0].steals.toFixed(1)} steals</EachLeaderStat>
            </>
          )}
        </EachLeaderButton>
      </LeaderboardContainer>
    </WholeContainer>
  );
}

export default Leaderboard;
