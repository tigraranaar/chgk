import React, { useEffect, useState } from "react";
import { socket } from "../../index";
import { CircularProgress, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";

export const ModeratorTables = () => {
  const [answersData, setAnswersData] = useState({});
  // const currentGameNumber = useSelector(state => state.lobby.gameNumber);
  const clientType = useSelector(state => state.lobby.clientType);
  // const isAnswersDataEmpty = Object.keys(answersData).length === 0;

  useEffect(() => {
    socket.on("answers__show", (answers) => {
      console.log(answers)
      if (clientType === 'moderator' && answers) {
        setAnswersData(answers);
      }
    });
  });

  useEffect(() => {
    console.log(answersData);
  }, [answersData]);

  return (
    <>
      <Container>
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

        {!Object.keys(answersData).length && <CircularProgress />}

        {Object.keys(answersData).length && (
          <TableContainer component={Paper} sx={{ padding: '20px' }}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Вопросы \ Команды</TableCell>

                  {answersData[0]['answers'].map((j) => {
                    return (
                      <TableCell align="left">{j['playerName']}</TableCell>
                    )
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {answersData.map((i) => (
                  <TableRow
                    key={i.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" sx={{ padding: '16px' }}>
                      {i['question']}
                    </TableCell>

                    {i['answers'].map((j) => {
                      return (
                        <TableCell align="left" sx={{ verticalAlign: 'bottom', padding: '16px' }}>
                          {j['playerAnswer']}
                          {j['playerScroe']}

                          <TextField
                            sx={{ width: '100%' }}
                            id="standard-basic"
                            label="очки за ответ"
                            variant="standard"
                            defaultValue={j['playerScroe']}
                            onChange={(e) => {
                              j['playerScroe'] = e.target.value
                            }}
                          />
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))}
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, paddingTop: '20px' }}
                >
                  <TableCell component="th" scope="row">
                    Итого очков
                  </TableCell>

                  {answersData[0]['answers'].map((j) => {
                    return (
                      <TableCell align="left">
                        <TextField
                          sx={{ width: '100%' }}
                          id="standard-basic"
                          label="итого очков"
                          variant="standard"
                        />
                      </TableCell>
                    )
                  })}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </>
  );
};
