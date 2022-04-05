const express = require("express");
const path = require("path");
const app = express();
const server = require("http").createServer(app);
const socketIo = require("socket.io");
const QuizManager = require("./Entities/quizManager");

const PORT = process.env.PORT || 4001;

const io = socketIo(server);

const quizManager = new QuizManager();

io.on("connection", socket => {
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
		const room = io.sockets.adapter.rooms[roomID];
		if (room) {
			if (room.length >= 1) {
				socket.join(roomID, () => {
					console.log(playerName);
					socket.quizRoom = roomID;
					socket.to(roomID).emit("player_joined");
					callback({ status: "Success", roomID });
				});
			} else {
				callback({ status: "Failed", message: "Room doesn't has players" });
			}
		} else callback({ status: "Failed", message: "Room doesn't exist" });
	});

	socket.on("submit_answer", answerConfig => {
		console.log(answerConfig);

		// const player = socket.id;
		// const quiz = quizManager.getQuiz(socket.quizRoom);

		// socket.on("show_answer", ({ player, answer }) => {
		// 	startQuiz(roomID, duration);
		// 	history.push(`/quiz`);
		// });

		// io.to(quiz.room).emit("show_answers", player, answer);
	});

	socket.on("get_next_question", async () => {
		const quiz = quizManager.getQuiz(socket.quizRoom);
		if (quiz) {
			const question = await quiz.getNextQuestion();

			io.to(quiz.room).emit("next_question", question);
		}
	});

	socket.on("question__show", showquestion => {
		console.log("сервер получил", showquestion);

		// socket.emit("question__show1", showquestion);

		io.emit("question__show1", showquestion);

		// io.to(showquestion).emit("question__show1", question__show);

		console.log("сервер отправил", showquestion);
	});

	socket.on("start_quiz", quizConfig => {
		const { roomID, ...quizOptions } = quizConfig;
		if (io.sockets.adapter.rooms[roomID]) {
			const room = io.sockets.adapter.rooms[roomID];
			const nMembers = room.length;
			if (nMembers < 2) {
				// Handle Error Here
				return "error";
			}

			const players = room.sockets;
			const host = socket.id;
			quizManager.addQuiz(players, roomID, quizOptions, host);
			const quiz = quizManager.getQuiz(roomID);

			io.to(roomID).emit("start_quiz_ack", { roomID: quiz.room, duration: quiz.duration });
		}
	});

	socket.on("disconnecting", () => {
		const room = socket.quizRoom;
		const quiz = quizManager.getQuiz(socket.quizRoom);
		io.to(room).emit("opponent_left");
		if (quiz) quizManager.cleanup(quiz);
		socket.quizRoom = null;
	});
});

app.use(express.static(path.join(__dirname, "/../client/build")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname + "/../client/build/index.html"));
});

server.listen(PORT, () => console.log(`Socket IO PORT# ${PORT}`));
