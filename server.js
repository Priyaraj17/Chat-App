const http = require("http");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const socketio = require("socket.io");
const WebSockets = require("./utils/webSocket");

//Routes:
const db = require("./db/index");
const indexRouter = require("./routes/index.js");
const userRouter = require("./routes/user.js");
const chatRoomRouter = require("./routes/chatRoom.js");
const deleteRouter = require("./routes/delete.js");

const app = express();
dotenv.config({ path: "./config.env" });

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/room", chatRoomRouter);
app.use("/delete", deleteRouter);

/** Create HTTP server. */
const PORT = process.env.PORT || "3000";
const server = http.createServer(app);
const io = socketio(server);
//global.io = socketio.listen(server);
io.on("connection", (client) => {
  client.on("disconnect", () => {
    this.users = this.users.filter((user) => user.socketId !== client.id);
  });
  // add identity of user mapped to the socket id
  client.on("identity", (userId) => {
    this.users.push({
      socketId: client.id,
      userId: userId,
    });
  });
  // subscribe person to chat & other user as well
  client.on("subscribe", (room, otherUserId = "") => {
    this.subscribeOtherUser(room, otherUserId);
    client.join(room);
  });
  // mute a chat room
  client.on("unsubscribe", (room) => {
    client.leave(room);
  });
});
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
