const makeValidation = require("@withvoid/make-validation");
const ChatRoomModel = require("../model/ChatRoom.js");
// const ChatMessageModel = require("../model/ChatMessage.js");
const UserModel = require("../model/users.js");

(exports.initiate = async (req, res) => {
  try {
    const validation = makeValidation((types) => ({
      payload: req.body,
      checks: {
        userIds: {
          type: types.array,
          options: { unique: true, empty: false, stringOnly: true },
        },
        type: { type: types.enum, options: { enum: CHAT_ROOM_TYPES } },
      },
    }));
    if (!validation.success) return res.status(400).json({ ...validation });

    const { userIds, type } = req.body;
    const { userId: chatInitiator } = req;
    const allUserIds = [...userIds, chatInitiator];
    const chatRoom = await ChatRoomModel.initiateChat(
      allUserIds,
      type,
      chatInitiator
    );
    return res.status(200).json({ success: true, chatRoom });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
}),
  (exports.sendMessage = async (req, res) => {
    try {
      const { roomId } = req.params;
      const validation = makeValidation((types) => ({
        payload: req.body,
        checks: {
          messageText: { type: types.string },
        },
      }));
      if (!validation.success) return res.status(400).json({ ...validation });

      const messagePayload = {
        messageText: req.body.messageText,
      };
      const currentLoggedUser = req.userId;
      const post = await ChatMessageModel.createPostInChatRoom(
        roomId,
        messagePayload,
        currentLoggedUser
      );
      global.io.sockets.in(roomId).emit("new message", { message: post });
      return res.status(200).json({ success: true, post });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  }),
  (exports.getRecentChats = async (req, res) => {
    try {
      const currentLoggedUser = req.userId;
      const options = {
        page: parseInt(req.query.page) || 0,
        limit: parseInt(req.query.limit) || 10,
      };
      const rooms = await ChatRoomModel.getChatRoomsByUserId(currentLoggedUser);
      const roomIds = rooms.map((room) => room._id);
      const recentConversation = await ChatMessageModel.getRecentConversation(
        roomIds,
        options,
        currentLoggedUser
      );
      return res
        .status(200)
        .json({ success: true, conversation: recentConversation });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  }),
  (exports.getChatsByRoomId = async (req, res) => {
    try {
      const { roomId } = req.params;
      const room = await ChatRoomModel.getChatRoomByRoomId(roomId);
      if (!room) {
        return res.status(400).json({
          success: false,
          message: "No room exists for this id",
        });
      }
      const users = await UserModel.getUserByIds(room.userIds);
      const options = {
        page: parseInt(req.query.page) || 0,
        limit: parseInt(req.query.limit) || 10,
      };
      const conversation = await ChatMessageModel.getConversationByRoomId(
        roomId,
        options
      );
      return res.status(200).json({
        success: true,
        conversation,
        users,
      });
    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
  });
