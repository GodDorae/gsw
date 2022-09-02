import { Route, Routes } from "react-router-dom";
import Leaderboard from "./Leaderboard";
import Roster from "./Roster";
import Stat from "./Stat";


function Team() {
  return (<Routes>
    <Route element={<Roster/>} path="/" />
    <Route element={<Stat />} path="/stat" />
    <Route element={<Leaderboard />} path="/leaderboard" />
  </Routes>)
}

export default Team;