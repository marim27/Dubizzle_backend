const express = require("express");
const router = express.Router();

const {
  createChat,
  getAllChats,
  getChat,
  updateChat,
  deleteChat,
  getChatBySenderId,
  getChatByReciverId,
} = require("../controllers/chatController");

router.post("/", createChat);

router.get("/", getAllChats);

router.get("/senderId?:senderId", getChatBySenderId);

router.get("/receiverId?:receiverId", getChatByReciverId);

router.get("/:id", getChat);

router.patch("/:id", updateChat);

router.delete("/:id", deleteChat);

module.exports = router;