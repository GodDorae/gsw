import { Route, Routes } from "react-router-dom";
import Detail from "./Detail";
import Leaderboard from "./Leaderboard";
import Roster from "./Roster";

function Team() {
  return (
    <Routes>
      <Route element={<Roster />} path="/" />
      <Route element={<Leaderboard />} path="/leaderboard" />
      <Route element={<Detail />} path="/:id" />
    </Routes>
  );
}

export default Team;
