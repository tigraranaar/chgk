const express = require("express");
const path = require("path");
const app = express();
const server = require("http").createServer(app);
const socketIo = require("socket.io");
const QuizManager = require("./Entities/quizManager");
const myQuestions = require("./api/questions.json");
const PORT = process.env.PORT || 4001;
const questionData = Object.keys(myQuestions);
const io = socketIo(server);
const quizManager = new QuizManager();

const o = {};

const players = [];

const p = {};
const p1 = [];

io.on("connection", (socket) => {
  socket.on("create_room", (room, callback) => {
    try {
      if (io.sockets.adapter.rooms[room]) {
        throw "Error in Creating Room";
      }
      socket.join(room, () => {
        socket.quizRoom = room;
        callback({ status: "Success", roomID: room });
      });
    } catch (error) {
      callback({ status: "Failed", message: error });
    }
  });

  socket.on("join_room", (roomID, playerName, callback) => {
    console.log(playerName);
    const room = io.sockets.adapter.rooms[roomID];
    if (room) {
      if (room.length >= 1) {
        socket.join(roomID, () => {
          socket.quizRoom = roomID;
          socket.to(roomID).emit("player_joined");
          callback({ status: "Success", roomID });

          players.push(playerName);
        });
      } else {
        callback({ status: "Failed", message: "Room doesn't has players" });
      }
    } else callback({ status: "Failed", message: "Room doesn't exist" });
  });

  socket.on("submit_answer", (answerConfig) => {
    // const answerConfig = { playerID, question, answer, playerName };

    let key = answerConfig.question || "--";
    let playerID = answerConfig.playerID || "--";
    let playerName = answerConfig.playerName || "--";
    let answer = answerConfig.answer || "--";
    let data = { playerName, answer };

    if (!(key in o)) {
      o[key] = [];
      o[key].push(data);
    } else {
      o[key].push(data);
    }

    console.log(o);

    io.emit("answers__show", o);

    let json = JSON.stringify(o);

    let fs = require("fs");

    fs.writeFile("output.json", json, "utf8", function (err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      }

      console.log("JSON file has been saved.");
    });
  });

  socket.on("get_next_question", async () => {
    const quiz = quizManager.getQuiz(socket.quizRoom);
    if (quiz) {
      const question = await quiz.getNextQuestion();

      io.to(quiz.room).emit("next_question", question);
    }
  });

  socket.on("question__show", (showquestion) => {
    io.emit("question__show1", showquestion);
  });

  socket.on("start_quiz", (quizConfig) => {
    const { roomID, ...quizOptions } = quizConfig;
    if (io.sockets.adapter.rooms[roomID]) {
      const room = io.sockets.adapter.rooms[roomID];
      const nMembers = room.length;
      if (nMembers < 2) {
        return "error";
      }

      const players = room.sockets;
      const host = socket.id;
      quizManager.addQuiz(players, roomID, quizOptions, host);
      const quiz = quizManager.getQuiz(roomID);

      io.to(roomID).emit("start_quiz_ack", {
        roomID: quiz.room,
        duration: quiz.duration,
      });
    }
  });

  socket.on("disconnecting", () => {
    const room = socket.quizRoom;
    const quiz = quizManager.getQuiz(socket.quizRoom);
    io.to(room).emit("opponent_left");
    if (quiz) quizManager.cleanup(quiz);
    socket.quizRoom = null;
  });

  socket.emit("send_data", questionData);
});

app.use(express.static(path.join(__dirname, "/../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/build/index.html"));
});

server.listen(PORT, () => console.log(`Socket IO PORT# ${PORT}`));
