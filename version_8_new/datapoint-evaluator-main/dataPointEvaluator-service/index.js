const loadDefinitions = require("../dataPointEvaluator-service/src/dataPointDefinitions/index");

const http = require("http");

// Creating a server instance
const server = http.createServer((req, res) => {
	// Set the response HTTP header with HTTP status and Content type
	res.writeHead(200, { "Content-Type": "text/plain" });

	const loadDefinitions = require("../dataPointEvaluator-service/src/dataPointDefinitions");
	const definitions = loadDefinitions(__dirname);

	res.end(JSON.stringify(definitions));
});

// Listening on port 3000
server.listen(3000, "127.0.0.1", () => {
	console.log("Server is running at http://127.0.0.1:3000/");
});
