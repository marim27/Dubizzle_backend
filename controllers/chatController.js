const ChatModel = require("../models/chatModel");

async function createChat(req, res) {
  try {
    const newChat = await ChatModel.create(req.body);
    res.status(201).json(newChat);
  } catch (error) {
    res.status(402).json({ message: error.message });
  }
}

async function getAllChats(req, res) {
  try {
    const Chats = await ChatModel.find();
    res.status(201).json(Chats);
  } catch (error) {
    res.status(402).json({ message: error.message });
  }
}

async function getChat(req, res) {
  var id = req.params.id;
  try {
    const Chat = await ChatModel.findById(id);
    if (!Chat) {
      throw new Error("Chat not found");
    }
    res.status(201).json(Chat);
  } catch (error) {
    res.status(402).json({ message: error.message });
  }
}

async function getChatBySenderId(req, res) {
  var senderId = req.query.senderId;
  try {
    var senderChat = await ChatModel.find({ senderId: senderId });
    res.status(201).json(senderChat);
  } catch (error) {
    res.status(402).json({ message: error.message });
  }
}

async function getChatByReciverId(req, res) {
  var receiverId = req.query.receiverId;
  try {
    var receiverChat = await ChatModel.find({ receiverId: receiverId });
    res.status(201).json(receiverChat);
  } catch (error) {
    res.status(402).json({ message: error.message });
  }
}

async function updateChat(req, res) {
  try {
    const updatedChat = await ChatModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(201).json(updatedChat);
  } catch (error) {
    res.status(402).json({ message: error.message });
  }
}

async function deleteChat(req, res) {
  var id = req.params.id;
  try {
    const deletedChat = await ChatModel.findByIdAndDelete(id);
    if (!deletedChat) {
      throw new Error("Chat not found");
    }
    res.status(201).json(deletedChat);
  } catch (error) {
    res.status(402).json({ message: error.message });
  }
}

module.exports = {
  createChat,
  getAllChats,
  getChat,
  updateChat,
  deleteChat,
  getChatBySenderId,
  getChatByReciverId,
};
