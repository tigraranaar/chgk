import React, { useEffect, useRef, useState } from "react";
import { socket } from "../../index";
import { useDispatch, useSelector } from 'react-redux';
import { Question } from './Question';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, CircularProgress } from "@mui/material";
import { Container } from "@mui/system";
import { LinearWithValueLabel } from "./ProgressBar";
import { endQuiz } from "../../features/quiz/quizSlice";

// import { useNavigate } from "react-router-dom";

export const Quiz = () => {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [prevQuestion, setPrevQuestion] = useState(null);
  const [prevAnswer, setPrevAnswer] = useState(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showScores, setShowScores] = useState(false);
  const fetchMoreQuestionsTimeout = useRef(null);
  const pingIntervalRef = useRef(null);
  // const timerRef = useRef(null);
  const quesNumberRef = useRef(0);
  const isAdmin = useSelector(state => state.lobby.clientType) === 'admin';
  const isModerator = useSelector(state => state.lobby.clientType) === 'moderator';
  const isPlayer = useSelector(state => state.lobby.clientType) === 'player';
  const duration = useSelector(state => state.quiz.duration);
  const [quizEnd, setQuizEnd] = useState(false);
  // const navigate = useNavigate();
  const [scoreImage, setScoreImage] = useState(null);

  useEffect(() => {
    socket.on("show_results_for_everybody1", (image) => {
      setShowScores(true);
      setScoreImage(image);
    });
  })

  useEffect(() => {
    if (isAdmin) {
      getNextQuestion();
    }

    pingIntervalRef.current = setInterval(() => {
      socket.emit("ping");
    }, 15000);

    socket.on("next_question", (response) => {
      if (response.status === "Success") {
        quesNumberRef.current++;        
        setQuestion(response.obj.question);
        setAnswer(response.obj.answer);
      } else if (response.status === "Questions_Finished") {
        setQuestion(null);

        setQuizEnd(true);
        dispatch(endQuiz(true));

        socket.emit("GameAndQuizEnd", true);
      } else {
        console.log("ERROR");
      }
    });

    return () => {
      socket.off("opponent_left");
      socket.off("next_question");
      clearTimeout(fetchMoreQuestionsTimeout.current);
      clearInterval(pingIntervalRef.current);
    };
  }, [isAdmin]);

  const handleNextQuestion = () => {
    fetchMoreQuestionsTimeout.current = setTimeout(getNextQuestion, duration);
    setShowQuestion(true);
    socket.emit("question__show", true);
  };

  useEffect(() => {
    socket.on("question__show1", (showQuestion) => {
      setShowQuestion(true);
    });

    // if (isAdmin && question)
    // fetchMoreQuestionsTimeout.current = setTimeout(getNextQuestion, duration);

    return () => {
      clearTimeout(fetchMoreQuestionsTimeout.current);
      setShowQuestion(false);
    };
  }, [question, duration, isAdmin]);

  const getNextQuestion = () => {
    setPrevQuestion(question);
    setPrevAnswer(answer);

    socket.emit("get_next_question");
  };

  return (
    <Container sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    }}>
      <Box 
        sx={{ 
          flexGrow: 1, 
          width: '100%',
          height: '90vh',
          border: '2px solid #d1d1d1',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '1px 10px 10px 6px #e8e8e8',
        }}
      >

        {!showScores && !quizEnd && !isModerator && (
          <>
            {showQuestion ? (
            <>
              <LinearWithValueLabel duration={duration}/>
              <Question
                question={question}
                questionNumber={quesNumberRef.current}
                duration={duration}
              />
            </>
          ):(
            <>
              {isPlayer && (
                <Box 
                  sx={{
                    height: '100%', 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'  
                  }}>

                  <Typography 
                    variant="h1" 
                    component="h1" 
                    sx={{
                      fontSize: 38,
                      marginBottom: 10,
                      textAlign: 'center'
                    }}
                  >
                    ???????????????? ???????????? ????????????
                  </Typography>

                  <CircularProgress />
                </Box>
              )}

              {isAdmin && (
                <Box sx={{textAlign: 'center'}}>

                  {prevQuestion && (
                    <>
                      <Typography 
                        variant="h1" 
                        component="h1" 
                        sx={{
                          fontSize: 38,
                          marginBottom: 3,
                          textAlign: 'center'
                        }}
                      >
                        {prevQuestion}
                      </Typography>

                      <Typography 
                        variant="h1" 
                        component="h1" 
                        sx={{
                          fontSize: 38,
                          marginBottom: 3,
                          textAlign: 'center'
                        }}
                        >
                        ??????????: 
                        {prevAnswer}
                      </Typography>
                    </>
                  )}


                  <Typography 
                    variant="h1" 
                    component="h1" 
                    sx={{
                      fontSize: 38,
                      marginBottom: 3,
                      textAlign: 'center'
                    }}
                  >
                    ?????????????????? ????????????:
                    <br/>
                    <br/>
                    {question}
                  </Typography>

                  <Button 
                    sx={{
                      marginTop: '20px',
                    }} 
                    variant="contained"
                    onClick={handleNextQuestion}
                  >
                    ???????????? ????????????
                  </Button>
                </Box>
              )}
            </>
          )}
          </>
        )}

        {!showScores && quizEnd && (
          <Box 
            sx={{
              height: '100%', 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'  
            }}>

          <Typography 
            variant="h1" 
            component="h1" 
            sx={{
              fontSize: 38,
              marginBottom: 10,
              textAlign: 'center'
            }}
          >
            ???????? ???????????????? <br/>
            ???????????????? ??????????????????????
          </Typography>

          <CircularProgress />
        </Box>
        )}

        {showScores && scoreImage &&(
          <img src={scoreImage} alt="score table" style={{width: '100%'}}/>
        )}

      </Box>
    </Container>
  );
};
