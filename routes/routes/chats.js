const express = require('express');
const {
  postChat,
  getChats,
  addMessages,
  getChat,
  determineChatExistence,
  deleteChat,
} = require("../controllers/chats");

const router = express.Router();

router.get("/api/chats-briefly/:userId", getChats);
router.get("/api/chat-existence/:adId", determineChatExistence);
router.get("/api/chat/:id", getChat);
router.post("/api/chat", postChat);
router.put("/api/chat", addMessages);
router.delete("/api/chat/:id", deleteChat)

module.exports = router;