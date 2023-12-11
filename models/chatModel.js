const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "users",
      required: true,
    },
    receiverId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "users",
      required: true,
    },
    productId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "products",
      required: true,
    },
    chat: {
      type: Array,
    }
  },
  {
    timestamps: true,
    collection: "chat"
  }
);

const chatModel = mongoose.model("chat", chatSchema);
module.exports = chatModel;