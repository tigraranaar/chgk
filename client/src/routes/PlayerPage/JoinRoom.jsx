import React, { useEffect, useState } from "react";
import { socket } from "../../index";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setClientType } from '../../features/lobby/lobbySlice';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { LobbyLayout } from "../../components/Layouts/LobbyLayout";
import { CircularProgress, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { startQuiz, setPlayerName } from "../../features/quiz/quizSlice";
import { createGame } from "../../features/lobby/lobbySlice";

export const JoinRoom = () => {
  const [gamesCount, setGamesCount] = useState([]);
  const [currentGameNumber, setCurrentGameNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [teamName, setTeamName] = useState('');
  const [waitToStart, setWaitToStart] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("getGamesData");

    socket.on("sendGamesData", (data) => {
      setGamesCount([...data]);
    });
}, []);

  useEffect(() => {
    socket.on("start_quiz_ack", ({ roomID, duration }) => {
      dispatch(startQuiz({roomID, duration}));
      navigate('/quiz');
    });

    return () => {
      socket.off("start_quiz_ack");
    };
  }, [])

  const handleSelect = (event) => {
    setErrorMessage(null);
    setCurrentGameNumber(event.target.value);
  };

  const isStringEmpty = (str) => str === null || str.match(/^ *$/) !== null;
  
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!currentGameNumber || isStringEmpty(teamName)) {
      setErrorMessage("Заполните форму");
    } else {
      setErrorMessage(null);
      dispatch(setClientType('player'));
      dispatch(createGame(currentGameNumber));
      

      socket.emit("join_room", currentGameNumber, teamName, (response) => {
        if (response.status === "Success") {
          setErrorMessage(null);
          setWaitToStart(true);

          dispatch(setPlayerName(teamName));
        } else {
          setErrorMessage(response.message);
        }
      });
    }
  }

  return (
    <LobbyLayout>
      {!waitToStart && (
        <>      
          <Typography 
            variant="h1" 
            component="h1" 
            sx={{
              fontSize: 48,
              marginBottom: 2
            }}
          >
            Войти в игру
          </Typography>

          <FormControl sx={{ m: 1, minWidth: 303 }}>        
            <InputLabel id="demo-simple-select-label">Номер игры</InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currentGameNumber}
              label="Номер игры"
              onChange={handleSelect}
            >
              {gamesCount.map((el, i) => (
                <MenuItem value={el} key={i}>{el}</MenuItem>
              ))}
            </Select>

            <TextField 
              sx={{marginTop: '20px'}} 
              id="standard-basic" 
              label="Название команды" 
              variant="standard" 
              onChange={(e) => setTeamName(e.target.value)} 
            />

            <Button 
              sx={{
                marginTop: '30px',
              }} 
              variant="contained"
              disabled={!gamesCount.length}
              onClick={handleSubmit}
            >
              Войти в игру
            </Button>
            
            <FormHelperText 
              sx={{
                height: '20px',
                marginTop: '20px',
                color: 'red'
              }}
            >
              {errorMessage}
            </FormHelperText>
          </FormControl>
        </>
      )}

      {waitToStart && (
        <>
          <Typography 
            variant="h1" 
            component="h1" 
            sx={{
              fontSize: 48,
              marginBottom: 2
            }}
          >
            Ожидайте начала игры
          </Typography>

          <CircularProgress />
        </>
      )}
    </LobbyLayout>
  );
};
