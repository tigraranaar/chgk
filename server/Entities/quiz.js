var myQuestions = require("../api/questions.json");

const { decodeHtml } = require("../utils");

class Quiz {
	constructor(players, roomID, quizOptions) {
		this.room = roomID;
		this.questions = null;
		this.currentQuesIdx = 0;
		this.currentAnswer = null;
		this.players = players;
		this.duration = 20000;
	}

	async getNextQuestion() {
		if (!this.currentAnswer) {
			this.questions = myQuestions[this.room];
		}
		return this.getQuestion();
	}

	getQuestion() {
		if (this.currentQuesIdx === myQuestions.length) {
			// Quiz Finished
			return { status: "Questions_Finished" };
		}

		const currentQues = this.questions[this.currentQuesIdx++];

		// Set next Question and Answer
		// this.currentAnswer = decodeHtml(currentQues.correct_answer);
		const choices = "";

		const question = decodeHtml(currentQues.question);
		this.resetPlayersTime();
		return { status: "Success", question, choices };
	}

	resetPlayersTime() {
		// Reset Time after Fetching next Question

		const currrentTime = new Date().getTime();
		for (const player in this.players) {
			this.players[player].time = currrentTime;
		}
	}
}

module.exports = Quiz;
