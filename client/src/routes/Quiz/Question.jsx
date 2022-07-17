import React, { useState } from "react";
import { socket } from "../../index";
import { useSelector } from "react-redux";
import { Button, Grid, TextareaAutosize, Typography } from "@mui/material";

export const Question = (props) => {
  const { question, questionNumber } = props;
  const [disabledButton, setDisabledButton] = useState(false);
  const [answer, setAnswer] = useState("");
  const isPlayer = useSelector(state => state.lobby.clientType) === 'player';
  const playerName = useSelector(state => state.quiz.playerName);
  const gameNumber = useSelector(state => state.lobby.gameNumber);

  const handleAnswer = (e) => {
    setAnswer(e.target.value);
  };

  const handleSend = (e) => {
    setDisabledButton(true);

    const answerConfig = { gameNumber, questionNumber, playerName, answer };

    socket.emit("submit_answer1", answerConfig);
  };

  return (
    <Grid container spacing={2} sx={{ height: '100%' }}>
      <Grid item xs={12} md={6}>
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontSize: { xs: 22, md: 32 },
            marginBottom: 2
          }}
        >
          Вопрос № {questionNumber}
        </Typography>

        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontSize: { xs: 22, md: 32 },
            marginBottom: 2
          }}
        >
          {question}
        </Typography>
      </Grid>
      {isPlayer && (
        <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
          <TextareaAutosize
            maxRows={4}
            aria-label="maximum height"
            placeholder="Введите Ваш ответ"
            onChange={handleAnswer}
            style={{
              width: '100%',
              height: '75%',
              resize: 'none',
              outline: 'none',
              borderRadius: '8px',
              border: '1px solid #919191',
              padding: '20px',
              fontSize: '20px',
              boxShadow: 'rgb(50 50 93 / 25%) 0px 6px 12px -2px, rgb(0 0 0 / 30%) 0px 3px 7px -3px',
            }}
          />
          <Button
            sx={{
              marginTop: '20px',
            }}
            variant="contained"
            onClick={handleSend}
            disabled={disabledButton}
          >
            Отправить ответ
          </Button>
        </Grid>
      )}
    </Grid>
  );
};
