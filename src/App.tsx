import { BrowserRouter, Routes, Route } from "react-router-dom";

import Create from "./routes/Create";
import Join from "./routes/Join";
import Login from "./routes/Login";
import Lobby from "./routes/Lobby";
import Play from "./routes/Play";

import "./styles/App.css";

import { io } from "socket.io-client";

import { store } from "./app/store";

import {
  setRoom,
  setCategories,
  resetRoom,
  setQuestion,
  setMessage,
  setStatus,
  setScoreboard,
  resetGame,
} from "./features/game/gameSlice";

export const socket = io();

socket.on("PLAYER-CONNECTED", (player) => {
  // store.dispatch(addPlayer(player));
});

socket.on("PLAYER-DISCONNECT", (player) => {
  // store.dispatch(removePlayer(player.name));
});

socket.on("ALL-DISCONNECT", () => {
  // const state = store.getState();
  // if (state.game.status !== "finished") {
  //   store.dispatch(resetGame());
  //   store.dispatch(setPlayers([]));
  //   store.dispatch(resetType());
  //   socket.disconnect();
  //   socket.connect();
  //   alert("All players disconnected. Taking you back to the home page.");
  //   history.push("/");
  // }
});

socket.on("HOST-DISCONNECT", () => {
  // const state = store.getState();
  // if (state.game.status !== "finished") {
  //   store.dispatch(resetGame());
  //   store.dispatch(setPlayers([]));
  //   store.dispatch(resetType());
  //   socket.disconnect();
  //   socket.connect();
  //   alert("Host Disconnected. Taking you back to the home page.");
  //   history.push("/");
  // }
});

socket.on("correctAnswer", (data) => {
  // store.dispatch(setScore(data.name, data.score));
  // store.dispatch(setStroke(data.name, "green"));
});

socket.on("incorrectAnswer", (player) => {
  //   store.dispatch(setStroke(player, "red"));
});

socket.on("gameFinished", (scoreboard) => {
  // store.dispatch(setScoreboard(scoreboard));
  // store.dispatch(setStatus("finished"));
});

socket.on("newQuestion", (res) => {
  // if (res.wait === true) {
  //   setTimeout(() => {
  //     store.dispatch(setMessage(""));
  //     store.dispatch(resetStroke());
  //     store.dispatch(setQuestion(res.question));
  //     history.push("/play");
  //   }, 2000);
  // } else {
  //   store.dispatch(setMessage(""));
  //   store.dispatch(setStatus("active"));
  //   store.dispatch(setQuestion(res.question));
  //   history.push("/play");
  // }
});

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create" element={<Create />} />
        <Route path="/join" element={<Join />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/play" element={<Play />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
