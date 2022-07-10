const unescape = require("he").unescape;

const decodeHtml = htmlString => {
	return unescape(htmlString);
};

const writeJsonFile = (data, fileName) => {
	const json = JSON.stringify(data);
	const fs = require("fs");

	fs.writeFile(`${fileName}.json`, json, "utf8", function (err) {
		if (err) {
			console.log("An error occured while writing JSON Object to File.");
			return console.log(err);
		}
	});
}

module.exports = {
	decodeHtml,
	writeJsonFile
};
