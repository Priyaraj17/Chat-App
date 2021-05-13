import express from "express";
import chatRoom from "../controller/chatRoom";

const router = express.Router();

router
  .get("/", chatRoom.getChats)
  .get("/:roomId", chatRoom.getChatsByRoom)
  .post(":/roomId/message", chatRoom.sendMessage);

export default router;
