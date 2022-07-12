// import { join, dirname } from 'path';
// import { Low, JSONFile } from 'lowdb';
// import { fileURLToPath } from 'url';

// const results = require("../api/questions.json");

const results = [];

const createResults = (answerConfig, data) => {
    const resultData = JSON.parse(JSON.stringify(data));
    const { gameNumber, questionNumber, playerName, answer } = answerConfig;
    const currQuestion = resultData[questionNumber - 1];
    const currQAnswer = currQuestion['answers'];
    // currQAnswer.find(x => x['playerName'] == playerName)[0]['playerAnswer'] = answer;

    currQAnswer.forEach(element => {
        if (element['playerName'] === playerName) {
            element['playerAnswer'] = answer;
        }
    });

    resultData.forEach(element => {
        console.log(element.answers);
    });



    // io.emit("answers__show", resultData[a]);
    // writeJsonFile(resultData[a], 'results');
}

module.exports = {
    createResults
};

// const __dirname = dirname(fileURLToPath(import.meta.url));

// // Use JSON file for storage
// const file = join(__dirname, 'results.json')
// const adapter = new JSONFile(file)
// const db = new Low(adapter)

// // Read data from JSON file, this will set db.data content
// await db.read()

// // Set default data
// db.data ||= { posts: [] }

// // Create and query items using plain JS
// db.data.posts.push('hello world')
// const firstPost = db.data.posts[0]

// // Finally write db.data content to file
// await db.write()
