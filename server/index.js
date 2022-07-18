const express = require("express");
const path = require("path");
const app = express();
const server = require("http").createServer(app);
const socketIo = require("socket.io");
const QuizManager = require("./entities/QuizManager1");
const myQuestions = require("./api/questions.json");
const { writeJsonFile } = require("./utils");
const { createResults } = require("./results/createResults");
const port = process.env.PORT || 4000;
const io = socketIo(server);
const quizManager = new QuizManager();
fs = require('fs');

let playersData = [];
let results = [];
const resultData = require("./api/questions.json");

const questionData = Object.keys(myQuestions);

io.on("connection", (socket) => {
  let duration1;

  socket.on("getGamesData", () => {
    io.emit("sendGamesData", questionData);
  });

  socket.on("create_room", (roomID, dur, callback) => {
    const room = io.sockets.adapter.rooms.has(roomID);
    
    duration1 = dur;

    try {
      if (room) {
        throw "Error in Creating Room";
      }
      socket.join(roomID);
      socket.quizRoom = roomID;

      callback({ status: "Success", roomID: roomID });
    } catch (error) {
      callback({ status: "Failed", message: error });
    }
  });

  socket.on("join_room", (roomID, playerName, callback) => {
    const room = io.sockets.adapter.rooms.has(roomID);

    try {
      if (room) {
        if (playerName !== 'moderator') {
          socket.join(roomID);
          socket.quizRoom = roomID;
          socket.to(roomID).emit("player_joined", playerName);

          if (playersData.some(e => e.playerName === playerName)) {
            callback({ status: "Failed", message: 'Имя команды занято, введите другое' });
          } else {
            const player = { playerName: playerName, playerID: socket.id };
            playersData.push(player);

            const answerData = {
              'playerName': playerName,
              'playerAnswer': '',
              'playerScore': 0
            };

            resultData[roomID].forEach(question => question['answers'].push(answerData));
            results = JSON.parse(JSON.stringify(resultData));
          }
        } else {
          socket.join(roomID);

          callback({ status: "Success", roomID: roomID });
        }

        callback({ status: "Success", roomID: roomID });
      }

      else {
        callback({ status: "Failed", message: 'Ошибка! Игра уже существует' });
      }
    } catch (error) {
      callback({ status: "Failed", message: 'Ошибка! Игра уже существует' });
    }
  });

  socket.on("join_like_moderator", (roomID, callback) => {
    try {
      socket.join(roomID);
      callback({ status: "Success", roomID: roomID });
    } catch (error) {
      callback({ status: "Failed", message: 'Игра недоступна, попробуйте позже' });
    }
  });

  socket.on("submit_answer1", (answerConfig) => {
    const { gameNumber, questionNumber, playerName, answer } = answerConfig;
    const currQuestion = results[gameNumber][questionNumber - 1];
    const currQAnswer = currQuestion['answers'];

    currQAnswer.forEach(element => {
      if (element['playerName'] === playerName) {
        element['playerAnswer'] = answer;
      }
    });

    io.emit("answers__show", results[gameNumber]);
  });

  socket.on("get_next_question", async () => {
    const quiz = quizManager.getQuiz(socket.quizRoom);
    if (quiz) {
      // const question = await quiz.getNextQuestion();

      const obj = await quiz.getNextQuestion();
      

      // io.to(quiz.room).emit("next_question", question);
      io.to(quiz.room).emit("next_question", obj);
    }
  });

  socket.on("question__show", (showquestion) => {
    io.emit("question__show1", showquestion);
  });

  socket.on("start_quiz", (roomID) => {
    const quizOptions = {};
    const room = io.sockets.adapter.rooms.get(roomID);

    if (room) {
      const nMembers = room.length;
      if (nMembers < 2) {
        return "error";
      }

      // const players = room.sockets;
      const players = [];

      for (let i of room.keys()) {
        players.push(i);
      }

      const host = socket.id;
      quizManager.addQuiz(players, roomID, quizOptions, host);
      const quiz = quizManager.getQuiz(roomID);

      io.to(roomID).emit("start_quiz_ack", {
        roomID: quiz.room,
        // duration: quiz.duration,
        duration: duration1,
      });
    }
  });

  socket.on("show_results_for_everybody", (image) => {
    if (!image) return;

    const data = image.replace(/^data:image\/\w+;base64,/, "");
    const buf = Buffer.from(data, 'base64');

    fs.writeFile('server/results/scores.png', buf, function (err) {
      if (err) return console.log(err);
    });

    io.emit("show_results_for_everybody1", image);
  });

  socket.on("GameAndQuizEnd", (bool) => {
    io.emit("GameAndQuizEnd1", bool);
  });

  socket.on("disconnecting", () => {
    const sokID = socket.id.toString();
    const deletedPlayer = playersData.filter((item) => item.playerID === sokID);

    playersData.forEach((item, index, arr) => {
      if (item.playerID === sokID) {
        arr.splice(index, 1);
      }
    });

    const room = socket.quizRoom;
    const quiz = quizManager.getQuiz(socket.quizRoom);
    io.to(room).emit("opponent_left", deletedPlayer[0]);
    if (quiz) quizManager.cleanup(quiz);
    socket.quizRoom = null;
  });
});

app.use(express.static(path.join(`${__dirname}/../client/build`)));

app.get("*", (req, res) => {
  res.sendFile(path.join(`${__dirname}/../client/build/index.html`));
});

server.listen(port, () => console.log(`Application listening on port ${port}!`));
