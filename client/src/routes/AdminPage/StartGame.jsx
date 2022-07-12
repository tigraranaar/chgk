import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { startQuiz, deletePlayersList } from '../../features/quiz/quizSlice';
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";
import { socket } from "../../index";

export const StartGame = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentGameNumber = useSelector(state => state.lobby.gameNumber);
  const playersList = useSelector(state => state.quiz.players);

  useEffect(() => {
    socket.on("start_quiz_ack", ({ roomID, duration }) => {
      dispatch(startQuiz({roomID, duration}));
      navigate('/quiz');
    });

    return () => {
      socket.off("start_quiz_ack");
    };
  }, [dispatch, navigate]);

  useEffect(() => {
    socket.on("opponent_left", (player) => {
      if ('playerName' in player) {
        dispatch(deletePlayersList(player.playerName));
      }
    });
  }, [dispatch]);

  const startGameHandle = () => {  
    socket.emit("start_quiz", currentGameNumber);
  }

  return (
    <>
      <Typography 
        variant="h1" 
        component="h1" 
        sx={{
          fontSize: 48,
          marginBottom: 2
        }}
      >
        Нажмите для старта
      </Typography>

      <Button 
        sx={{
          marginTop: '30px',
        }} 
        variant="contained"
        onClick={startGameHandle}
      >
        Начать игру
      </Button>

      <Typography 
        variant="h1" 
        component="h1" 
        sx={{
          fontSize: 20,
          marginTop: 10,
          marginBottom: 2
        }}
      >
        Подключенных команд: {playersList.length}
      </Typography>
    </>
  );
};
