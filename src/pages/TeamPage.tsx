import { createContext, useState } from "react";
import Team from "../components/Team/Team";

interface IMainPlayerData {
  id: number;
  firstname: string;
  lastname: string;
  img: string;
  position: string;
  number: number;
}

const initialMainPlayers: IMainPlayerData[] = [];

export const MainPlayersContext = createContext({
  mainPlayers: initialMainPlayers,
  setMainPlayersHandler: (playersList:IMainPlayerData[]) => {},
});

function TeamPage() {
  const [mainPlayers, setMainPlayers] = useState(initialMainPlayers);

  const setMainPlayersHandler = (playersList: IMainPlayerData[]) => {
    setMainPlayers((prev) => {
      return playersList;
    });
  };

  return (
    <MainPlayersContext.Provider value={{ mainPlayers, setMainPlayersHandler }}>
      <Team />
    </MainPlayersContext.Provider>
  );
}

export default TeamPage;
