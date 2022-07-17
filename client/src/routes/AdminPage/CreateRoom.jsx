import React, { useEffect, useState } from "react";
import { socket } from "../../index";
import { useDispatch } from 'react-redux';
import { createGame, setClientType } from '../../features/lobby/lobbySlice';
import { setPlayersList } from '../../features/quiz/quizSlice';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { LobbyLayout } from "../../components/Layouts/LobbyLayout";
import { Button, CircularProgress, FormHelperText } from "@mui/material";
import { ShareRoom } from "./ShareRoom";
import { StartGame } from "./StartGame";

export const CreateRoom = () => {
  const dispatch = useDispatch();
  const [gamesCount, setGamesCount] = useState([]);
  const [currentGameNumber, setCurrentGameNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [createRoom, setCreateRoom] = useState(true);
  const [shareRoom, setShareRoom] = useState(false);
  const [startGame, setStartGame] = useState(false);

  useEffect(() => {
    console.log('12');
    socket.emit("getGamesData");

    socket.on("sendGamesData", (data) => {
      setGamesCount([...data]);
    });
  }, []);

  useEffect(() => {
    console.log('2');
    gamesCount.length ? setErrorMessage(null) : setErrorMessage("Проверка свободных комнат");
  }, [gamesCount])

  useEffect(() => {
    socket.on("player_joined", (teamName) => {
      dispatch(setPlayersList(teamName))
      showForm(setStartGame);
    });

    return () => {
      socket.off("player_joined");
    };
  }, [dispatch]);

  const handleSelect = (event) => {
    setErrorMessage(null);
    setCurrentGameNumber(event.target.value.toString());
  };

  const showForm = (toggleForm) => {
    setCreateRoom(false);
    setShareRoom(false);
    setStartGame(false);

    toggleForm(true);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!currentGameNumber) {
      setErrorMessage("Выберите номер игры");
    } else {
      dispatch(setClientType('admin'));
      dispatch(createGame(currentGameNumber));

      socket.emit("create_room", currentGameNumber, (response) => {
        if (response.status === "Success") {
          setErrorMessage(null);

          showForm(setShareRoom);
        } else {
          setErrorMessage(response.message);
        }
      });
    }
  }

  return (
    <LobbyLayout>
      {createRoom && (
        <>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: 22, md: 32 },
              marginBottom: 2
            }}

          >
            Выберите игру
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
                  Создать игру
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

      {shareRoom && (
        <ShareRoom gameNumber={currentGameNumber} />
      )}

      {startGame && (
        <StartGame gameNumber={currentGameNumber} />
      )}
    </LobbyLayout>
  );
};
