const express = require("express");
const chatRoom = require("../controller/chatRoom");

const router = express.Router();

router
  .get("/", chatRoom.getChats)
  .get("/:roomId", chatRoom.getChatsByRoom)
  .post(":/roomId/message", chatRoom.sendMessage);

module.exports = router;
