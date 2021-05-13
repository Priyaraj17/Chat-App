const http = require("http");
import express from "express";
import logger from "morgan";
import cors from "cors";
import mongoose from "mongoose";

//Routes:
//const db = require("./db/index");
const indexRouter = require("./routes/index.js");
const userRouter = require("./routes/user.js");
const chatRoomRouter = require("./routes/chatRoom.js");
const deleteRouter = require("./routes/delete.js");

const app = express();

const PORT = process.env.PORT || "3000";

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/room", chatRoomRouter);
app.use("/delete", deleteRouter);

/** catch 404 and forward to error handler */
app.use("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "API endpoint doesnt exist",
  });
});

/** Create HTTP server. */
const server = http.createServer(app);
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
