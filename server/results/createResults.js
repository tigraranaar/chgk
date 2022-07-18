const results = [];

const createResults = (answerConfig, data) => {
    const resultData = JSON.parse(JSON.stringify(data));
    const { gameNumber, questionNumber, playerName, answer } = answerConfig;
    const currQuestion = resultData[questionNumber - 1];
    const currQAnswer = currQuestion['answers'];

    currQAnswer.forEach(element => {
        if (element['playerName'] === playerName) {
            element['playerAnswer'] = answer;
        }
    });
}

module.exports = {
    createResults
};
