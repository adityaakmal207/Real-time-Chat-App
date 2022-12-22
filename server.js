const express = require("express");
const path = require("path");

const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server);

// app.listen(3000, () => console.log('Server Running at http://localhost:3000'));
app.use(express.static(path.join(__dirname+"/public")));

io.on("connection", function (socket) {
    socket.on("newuser", function (username) {
        socket.broadcast.emit("update", username + " bergabung kedalam obrolan!")
    });
    socket.on("exituser", function (username) {
        socket.broadcast.emit("update", username + " keluar dari obrolan!")
    });
    socket.on("chat", function (message) {
        socket.broadcast.emit("chat")
    });
})

server.listen(5000);