import { Route, Routes } from "react-router-dom";
import Detail from "./Detail";
import Leaderboard from "./Leaderboard";
import Roster from "./Roster";

function Team() {
  return (
    <Routes>
      <Route element={<Roster />} path="/gsw/team/" />
      <Route element={<Leaderboard />} path="/gsw/team/leaderboard" />
      <Route element={<Detail />} path="/gsw/team/:id" />
    </Routes>
  );
}

export default Team;
