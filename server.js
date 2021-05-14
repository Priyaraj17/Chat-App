const http = require("http");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

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
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
