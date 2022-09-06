import { Route, Routes } from "react-router-dom";
import Leaderboard from "./Leaderboard";
import Roster from "./Roster";

function Team() {
  return (
    <Routes>
      <Route element={<Roster />} path="/" />
      <Route element={<Leaderboard />} path="/leaderboard" />
    </Routes>
  );
}

export default Team;
