const Player = require("./Player1");
const Quiz = require("./Quiz1");

class QuizManager {
  constructor() {
    this.quizzes = {};
    this.players = {};
  }

  addQuiz(players, roomID, quizOptions, host) {
    const playerIDs = Object.keys(players);
    const playersList = {};

    playerIDs.map((playerID) => (playersList[playerID] = new Player(roomID, playerID === host)));

    Object.assign(this.players, playersList);

    const quiz = new Quiz(playersList, roomID, quizOptions);
    this.quizzes[roomID] = quiz;
  }

  getQuiz(roomID) {
    if (roomID in this.quizzes) return this.quizzes[roomID];
    else return null;
  }

  cleanup(quiz) {
    for (const player in quiz.players) {
      delete this.players[player];
    }

    delete this.quizzes[quiz.room];
  }
}

module.exports = QuizManager;
