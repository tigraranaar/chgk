import React, { useEffect, useState } from "react";
import { socket } from "../../index";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createGame, setClientType } from '../../features/lobby/lobbySlice';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { LobbyLayout } from "../../components/Layouts/LobbyLayout";
import { startQuiz } from "../../features/quiz/quizSlice";
import { Button, CircularProgress, FormHelperText } from "@mui/material";

export const ModerRoom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [gamesCount, setGamesCount] = useState([]);
  const [currentGameNumber, setCurrentGameNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [waitToStart, setWaitToStart] = useState(false);

  useEffect(() => {
    socket.emit("getGamesData");

    socket.on("sendGamesData", (data) => {
      setGamesCount([...data]);  
    });
  }, []);

  useEffect(() => {
    gamesCount.length ? setErrorMessage(null) : setErrorMessage("Проверка свободных комнат");
  }, [gamesCount])

  useEffect(() => {
    socket.on("start_quiz_ack", ({ roomID, duration }) => {
      dispatch(startQuiz({ roomID, duration }));
      navigate('/moderator_tables');
    });

    return () => {
      socket.off("start_quiz_ack");
    };
  }, [navigate, dispatch])

  const handleSelect = (event) => {
    setErrorMessage(null);
    setCurrentGameNumber(event.target.value.toString());
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!currentGameNumber) {
      setErrorMessage("Выберите номер игры");
    } else {
      setErrorMessage(null);

      dispatch(setClientType('moderator'));
      dispatch(createGame(currentGameNumber));

      socket.emit("join_room", currentGameNumber, 'moderator', (response) => {
        if (response.status === "Success") {
          setErrorMessage(null);
          setWaitToStart(true);
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
              fontSize: { xs: 22, md: 32 },
              marginBottom: 2
            }}
          >
            Наблюдение за игрой
          </Typography>

          {!gamesCount.length ?
            (
              <CircularProgress />
            ) : (
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

                <Button
                  sx={{
                    marginTop: '30px'
                  }}
                  variant="contained"
                  disabled={!gamesCount.length}
                  onClick={handleSubmit}
                >
                  Войти
                </Button>
              </FormControl>
            )
          }

          <FormHelperText
            sx={{
              height: '20px',
              marginTop: '20px',
              color: 'red'
            }}
          >
            {errorMessage}
          </FormHelperText>
        </>
      )}

      {waitToStart && (
        <>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: 22, md: 32 },
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
