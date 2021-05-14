const express = require("express");
const deleteController = require("../controller/delete");

const router = express.Router();
router
  .delete("/room/:roomId", deleteController.deleteRoomById)
  .delete("/message/:messageId", deleteController.deleteMessageById);

module.exports = router;
