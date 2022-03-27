import React, { useState } from "react";
// import { connect } from 'react-redux';
import { socket } from "../App";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { setRoom } from "../features/game/gameSlice";
// import { Redirect } from 'react-router-dom';
// import { setRoom } from '../actions/game';
// import { HuePicker } from 'react-color';
// import Fade from 'react-reveal/Fade';

export default function Join() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const onRoomChange = (e: any) => {
    setRoom(e.target.value);
  };

  const onNameChange = (e: any) => {
    setName(e.target.value);
  };

  const onSubmitForm = (e: any) => {
    e.preventDefault();

    const config = {
      name: name,
      room: room,
    };

    socket.emit("joinRoom", config, (res: any) => {
      if (res.code === "success") {
        setError("");
        // this.props.setRoom(this.state.room);
        // this.props.history.push("/lobby");

        // dispatch(setRoom(''));
        navigate("/lobby");
      } else {
        // this.setState({ error: res.msg });
        setError(res.msg);
      }
    });
  };

  return (
    <div className="join">
      <div className="box-layout__box">
        <form className="form" onSubmit={onSubmitForm}>
          <h1 className={"box-layout__title"}>Join Game</h1>

          <input
            type="text"
            placeholder="Room Name"
            autoFocus
            onChange={onRoomChange}
            className="text-input"
          />

          <input
            type="text"
            placeholder="User Name"
            onChange={onNameChange}
            className="text-input"
          />

          <button className="button">Join</button>
        </form>
      </div>
    </div>
  );
}
