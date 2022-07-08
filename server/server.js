const express = require("express");
const path = require("path");
const app = express();
const server = require("http").createServer(app);
const socketIo = require("socket.io");
const QuizManager = require("./Entities/quizManager");
const myQuestions = require("./api/questions.json");
const PORT = process.env.PORT || 4001;
const io = socketIo(server);
const quizManager = new QuizManager();

// const createJsonFile = require("./results/createJsonFile.js");

let playersData = [];
let resultData = myQuestions;

const questionData = Object.keys(myQuestions);

io.on("connection", (socket) => {
  socket.on("getGamesData", () => {
    io.emit("sendGamesData", questionData);
  });

  socket.on("create_room", (roomID, callback) => {   
    const room = io.sockets.adapter.rooms.has(roomID);

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
            callback({ status: "Failed", message: 'The name already exist' });
          } else {
            const player = {playerName: playerName, playerID: socket.id};
            playersData.push(player);

            const answerData = {
              'playerName': playerName,
              'playerAnswer': ''
            };
            
            resultData[roomID].forEach(question => question['answers'].push(answerData));
          }
        } else {
          socket.join(roomID);
          
          callback({ status: "Success", roomID: roomID });
        }

        callback({ status: "Success", roomID: roomID });
      }

      else {
        callback({ status: "Failed", message: 'Room Doesn`t Exist' });  
      }
    } catch (error) {
      callback({ status: "Failed", message: 'Room Doesn`t Exist' });
    }
	});

  socket.on("submit_answer1", (answerConfig) => {
    const { gameNumber, questionNumber, playerName, answer } = answerConfig;
    const a = gameNumber.toString();
    const b = questionNumber - 1;

    const currQuestion = resultData[a][b];
    const currQAnswer = currQuestion['answers'];
    currQAnswer.find(x => x['playerName'] == playerName)['playerAnswer'] = answer;

    io.emit("answers__show", resultData[a]);

    let json = JSON.stringify(resultData[a]);
    let fs = require("fs");

    fs.writeFile("results.json", json, "utf8", function (err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      }
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
        duration: quiz.duration,
      });
    }
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

app.use(express.static(path.join(__dirname, "/../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/build/index.html"));
});

server.listen(PORT, () => console.log(`Socket IO PORT #${PORT}`));
