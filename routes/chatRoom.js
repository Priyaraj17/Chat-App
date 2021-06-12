const express = require("express");
const chatRoom = require("../controller/chatRoom");

const router = express.Router();

router
  .get("/", chatRoom.getRecentChats)
  .get("/:roomId", chatRoom.getChatsByRoomId)
  .post("/initiate", chatRoom.initiate)
  .post(":/roomId/message", chatRoom.sendMessage);

module.exports = router;
