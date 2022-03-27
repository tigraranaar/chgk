import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { setRoom } from "../features/game/gameSlice";

import { socket } from "../App";

export default function Create() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [gameNumber, setGameNumber] = useState("");

  const handleInput = (e: any) => {
    setGameNumber(e.target.value);
  };

  const handleSubmitForm = (e: any) => {
    e.preventDefault();

    const config = {
      room: gameNumber,
      options: "",
      category: "",
      difficulty: "",
      questionCount: "",
    };

    socket.emit("createRoom", config, (res: any) => {
      if (res.code === "success") {
        // this.setState({ error: "" });
        // this.props.setRoom(this.state.room);
        // this.props.history.push("/lobby");
        dispatch(setRoom(gameNumber));
        navigate("/lobby");
      } else {
        // this.setState({ error: res.msg });
        console.log("error");
      }
    });
  };

  return (
    <form className="form" onSubmit={handleSubmitForm}>
      <h1 className="title">Create New Game</h1>
      <h3 className="title">Choose the game number</h3>

      <input
        type="text"
        placeholder="Game Number"
        autoFocus
        onChange={handleInput}
        className="text-input"
      />
      <button type="submit" className="button">
        Create
      </button>
    </form>
  );
}
