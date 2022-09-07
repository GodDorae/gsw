import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import options from "../../API_INFO";

const WholeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  margin-bottom: 3rem;
`;

const PlayerTitle = styled.div`
  width: 80%;
  padding: 3rem 0;
  font-size: 3rem;
  font-weight: 700;
  text-align: left;
`;

const PlayerContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const PlayerImageAndBasicProfile = styled.div`
  width: 60%;
  display: flex;
  gap: 1.5rem;
`;

const PlayerImage = styled.img`
  width: 30%;
  height: auto;
`;

const PlayerBasicProfile = styled.div`
  font-size: 1.5rem;
  font-weight: 700;

  &h1 {
    font-size: 3rem;
    font-weight: 700;
  }
`;

const InfoTitle = styled.div`
  font-size: 2rem;
  font-weight: 700;
`;

const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
`;

const Info = styled.div`
  width: 12rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &h3 {
    font-weight: 700;
  }
`;

interface IProfile {
  birthDate: string;
  country: string;
  college: string;
  height: string;
  weight: string;
  firstname: string;
  lastname: string;
  number: number;
  position: string;
  debutYear: number;
  experience: number;
}

interface IPlayerStat {
  assists: number;
  blocks: number;
  points: number;
  steals: number;
  totReb: number;
}

function Detail() {
  const { id } = useParams();
  const [profile, setProfile] = useState<IProfile>();
  const [stat, setStat] = useState<IPlayerStat>();
  const [loading, setLoading] = useState(true);
  const now = new Date();

  useEffect(() => {
    fetch(`https://api-nba-v1.p.rapidapi.com/players?id=${id}`, options)
      .then((response) => response.json())
      .then((response) => {
        const data = response.response[0];
        const birthDate = data.birth.date;
        const country = data.birth.country;
        const college = data.college;
        const height = data.height.meters;
        const weight = data.weight.kilograms;
        const firstname = data.firstname;
        const lastname = data.lastname;
        const number = data.leagues.standard.jersey;
        const position = data.leagues.standard.pos;
        const debutYear = data.nba.start;
        const experience = data.nba.pro;

        const profileData: IProfile = {
          birthDate,
          country,
          college,
          height,
          weight,
          firstname,
          lastname,
          number,
          position,
          debutYear,
          experience,
        };
        setProfile(profileData);
      });
  }, []);

  useEffect(() => {
    if (profile) {
      fetch(
        `https://api-nba-v1.p.rapidapi.com/players/statistics?season=2021&id=${id}`,
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
          const playerStat: IPlayerStat = {
            assists,
            blocks,
            points,
            steals,
            totReb,
          };
          setStat(playerStat);
          setLoading(false);
        });
    }
  }, [profile]);

  return (
    <WholeContainer>
      <Helmet>
        <title>Player Detail</title>
      </Helmet>
      <PlayerTitle>Player Detail</PlayerTitle>
      <PlayerContainer>
        {loading ? (
          <div style={{ fontSize: "2rem" }}>Loading player data...</div>
        ) : (
          <>
            <PlayerImageAndBasicProfile>
              <PlayerImage
                src={`/src/assets/players/${profile?.firstname.toLowerCase()}_${profile?.lastname.toLowerCase()}.png`}
              />
              <PlayerBasicProfile>
                Golden State Warriors | #{profile?.number} | {profile?.position}
                <h1>{profile?.firstname}</h1>
                <h1>{profile?.lastname}</h1>
              </PlayerBasicProfile>
            </PlayerImageAndBasicProfile>
            <InfoTitle>Player Info</InfoTitle>
            <InfoContainer>
                <Info>
                    <h3>Height</h3>
                    <div>{profile?.height}m</div>
                </Info>
                <Info>
                    <h3>Weight</h3>
                    <div>{profile?.weight}kg</div>
                </Info>
                <Info>
                    <h3>Country</h3>
                    <div>{profile?.country}</div>
                </Info>
                <Info>
                    <h3>College</h3>
                    <div>{profile?.college}</div>
                </Info>
            </InfoContainer>
            <InfoContainer>
                <Info>
                    <h3>Birthdate</h3>
                    <div>{profile?.birthDate}</div>
                </Info>
                <Info>
                    <h3>Age</h3>
                    <div>{profile ? now.getFullYear() - parseInt(profile.birthDate.slice(0,4)) : ""}</div>
                </Info>
                <Info>
                    <h3>Debut year</h3>
                    <div>{profile?.debutYear}</div>
                </Info>
                <Info>
                    <h3>Experience</h3>
                    <div>{profile?.experience}</div>
                </Info>
            </InfoContainer>
            <InfoTitle>Player Stat</InfoTitle>
            <InfoContainer>
                <Info>
                    <h3>🧡 Points</h3>
                    <div>{stat?.points.toFixed(1)}</div>
                </Info>
                <Info>
                    <h3>💛 Assists</h3>
                    <div>{stat?.assists.toFixed(1)}</div>
                </Info>
                <Info>
                    <h3>💙 Rebounds</h3>
                    <div>{stat?.totReb.toFixed(1)}</div>
                </Info>
                <Info>
                    <h3>💚 Steals</h3>
                    <div>{stat?.steals.toFixed(1)}</div>
                </Info>
                <Info>
                    <h3>💜 Blocks</h3>
                    <div>{stat?.blocks.toFixed(1)}</div>
                </Info>
            </InfoContainer>
          </>
        )}
      </PlayerContainer>
    </WholeContainer>
  );
}

export default Detail;
