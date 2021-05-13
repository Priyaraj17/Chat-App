import express from "express";
import deleteController from "../controller/delete";

const router = express.Router();
router
  .delete("/room/:roomId", deleteController.deleteById)
  .delete("/message/:messageId", deleteController.deleteMessageById);

export default router;
