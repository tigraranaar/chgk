import React, { useEffect, useState, createRef } from "react";
import { socket } from "../../index";
import { Button, Checkbox, CircularProgress, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateResults } from "../../features/results/resultsSlice";
import { useScreenshot, createFileName } from "use-react-screenshot";
// import { endQuiz } from "../../features/quiz/quizSlice";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export const ModeratorTables = () => {
  const ref = createRef(null);
  const dispatch = useDispatch();
  const [answersData, setAnswersData] = useState({});
  const [playersScore, setPlayersScore] = useState([]);
  const clientType = useSelector(state => state.lobby.clientType);
  // const isQuizEnd = useSelector(state => state.quiz.quizEnd);
  const isAnswersDataEmpty = Object.keys(answersData).length === 0;

  const [isQuizEnd, setIsQuizEnd] = useState(false);

  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0
  });

  useEffect(() => {
    socket.emit("show_results_for_everybody", image);
  }, [image]);

  useEffect(() => {
    socket.on("answers__show", (answers) => {
      if (clientType === 'moderator' && answers) {
        setAnswersData(answers);
        dispatch(updateResults(answers))

        if (!playersScore.lentgh === 0) return;
        
        setPlayersScore(answers[0]['answers']);
      }
    });

    socket.on("GameAndQuizEnd1", (bool) => {
      // dispatch(endQuiz(bool));
      setIsQuizEnd(bool);
    });    
  });

  const handleChecked = (e, i, j) => {
    for(let index = 0; index < playersScore.length; index++) {
      if(playersScore[index]['playerName'] === j.playerName) {
        
        let newArray = []
        playersScore.forEach( (item, index) => {
          newArray[index] = {...item}
        })

        if (e.target.checked) {
          newArray[index]['playerScore'] ++;
        } else {
          newArray[index]['playerScore'] --;
        }

        setPlayersScore(newArray);
      }
    }
  }

  const download = (image, { name = "img", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const handleSubmit = () => {
    takeScreenShot(ref.current);
  }

  const handleQuizEnd = () => {
    takeScreenShot(ref.current).then(download);
  }

  return (
    <>
      <Container ref={ref}>
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontSize: 32,
            marginTop: 4,
            marginBottom: 10
          }}
        >
          Таблица ответов
        </Typography>

        {isAnswersDataEmpty && <CircularProgress />}

        {!isAnswersDataEmpty && (
          <>
            <TableContainer component={Paper} sx={{ padding: '20px' }}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Вопросы \ Команды</TableCell>

                    {answersData[0]['answers'].map((j) => {
                      return ( 
                        <>
                          <TableCell align="left" key={j['playerName']}>{j['playerName']}</TableCell>
                        </>
                      )
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {answersData.map((i) => {
                    return (
                      <>
                        <TableRow
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row" sx={{ padding: '16px' }}>
                            {i['question']}
                          </TableCell>

                          {i['answers'].map((j) => {
                            return (
                              <>
                                <TableCell align="left" sx={{ verticalAlign: 'bottom', padding: '16px' }}>
                                  {j['playerAnswer']}
                                  {j['playerScroe']}

                                  <br/>

                                  <Checkbox {...label} 
                                    color="success"
                                    defaultChecked={false}
                                    onChange={e => {handleChecked(e, i, j)}}
                                    sx={{p:0}}
                                  />

                                  {/* <TextField
                                    sx={{ width: '100%' }}
                                    id="standard-basic"
                                    label="очки за ответ"
                                    variant="standard"
                                    defaultValue={j['playerScroe']}
                                    onChange={(e) => {
                                      j['playerScroe'] = e.target.value
                                    }}
                                  /> */}
                                </TableCell>
                              </>
                            )
                          })}
                        </TableRow>
                      </>
                    )
                  })}
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, paddingTop: '20px' }}
                  >
                    <TableCell component="th" scope="row">
                      Итого очков
                    </TableCell>

                    {playersScore.map((j) => {
                      return (
                        <>
                          <TableCell align="left">
                            {j?.playerScore || 0}
                          </TableCell>
                        </>
                      )
                    })}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Container>

      {isQuizEnd && (
        <Container>
          <Button
            sx={{
              marginTop: '30px'
            }}
            variant="contained"
            onClick={handleSubmit}
            // disable={clientType !== 'moderator'}
          >
            Отправить результаты всем
          </Button>

          <br/>

          <Button
            sx={{
              marginTop: '30px'
            }}
            variant="contained"
            onClick={handleQuizEnd}
          >
            Скачать результаты
          </Button>
        </Container>
      )}
    </>
  );
};
