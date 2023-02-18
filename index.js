import app from "./app.js";
import http from "http";

const port = process.env.PORT || 8000;
const server = http.createServer(app); //creating the server
server.listen(port, () => {
	console.log(`app is running on port: ${port}`);
});
