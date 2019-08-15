const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const util = require("util");
const connectMongo = require("connect-mongo");

import MongoDb from "./mongo-db";

const mongo = await MongoDb();

server.express.post("/create/editor", (req, res) =>
	createEditor(req, res, mongo)
);

io.on("connection", function(socket) {
	console.log("a user connected");
	socket.on("new-operations", data => {
		io.emit("new-remote-operations", data);
	});
});

http.listen(4000, function() {
	console.log("listening on *:4000");
});
