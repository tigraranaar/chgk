import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { setAdmin, setPlayer } from "../features/user/userSlice";

export default function Play() {
  return <div className="wrapper">playing</div>;
}
