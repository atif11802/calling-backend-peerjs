const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const { addUser, allusers, removeUser } = require("./user");
const io = new Server(server, {
	cors: {
		origin: "*",
	},
});
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
	res.send("hello world");
});

io.on("connection", (socket) => {
	socket.on("join", (peerId) => {
		// console.log("connection joined", peerId);
		// console.log("socket connected", socket.id);
		if (peerId) {
			io.to(socket.id).emit("myInfo", addUser(peerId, socket.id));

			io.emit("allusers", allusers());
		}
	});

	socket.on("callingTo", (data) => {
		if (data.friendSocketID) {
			console.log("callingTo", data.friendSocketID, socket.id);

			io.to(data.friendSocketID).emit("calling", data);
		}

		// io.emit("calledBy", data);
	});

	socket.on("calledAcceptedBy", (data) => {
		io.to(data.friendSocketID).emit("callAccepted", data);
	});

	socket.on("disconnect", () => {
		console.log("socket disconnected");

		removeUser(socket.id);

		io.emit("allusers", allusers());
		// console.log("user disconnected", socket.id);
	});
});

server.listen(port, () => {
	console.log(`listening on port ${port}`);
});
