const http = require("http");
const path = require("path");
const express = require("express");
const socektio = require("socket.io");
const formatMessage = require("./utils/messages");
const db = require("db");

const {
  getCurrentUser,
  joinUser,
  userLeft,
  getRoomUsers,
} = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = socektio(server);

const Bot = "Albus Dumbledore";

// Set static folder:

app.use(express.static(path.join(__dirname, "public")));

// Run when client connects:
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    const user = joinUser(socket.id, username, room);
    socket.join(user.room);

    // Welcome current user:
    socket.emit("message", formatMessage(Bot, "Welcome to ChatCord"));

    // BroadCast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(Bot, `${user.username} has joined the chat`)
      );

    // Send users and room info:
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  // Listen for chatMessage:
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

  // Runs when client disconnects
  socket.on("disconnect", () => {
    const user = userLeft(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(Bot, `${user.username} has left the chat`)
      );
    }
  });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
