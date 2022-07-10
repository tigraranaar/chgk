const results = require("../api/questions.json");

const createResults = (answerConfig) => {
    const { gameNumber, questionNumber, playerName, answer } = answerConfig;
    const a = gameNumber.toString();
    const b = questionNumber - 1;

    const currQuestion = results[a][b];
    const currQAnswer = currQuestion['answers'];
    // currQAnswer.find(x => x['playerName'] == playerName)['playerAnswer'] = answer;

    // io.emit("answers__show", resultData[a]);

    // writeJsonFile(resultData[a], 'results');
}

module.exports = {
	createResults
};
