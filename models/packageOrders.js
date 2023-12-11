const mongoose = require("mongoose");

const packagesSchema = new mongoose.Schema(
  {
    packageID: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "packages",
        required: true,
      },
    ],
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    transactionID: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["succeeded", "failed"],
      default: "failed",
    },
    ExpiredDate:{
      type:Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const packagesModel = mongoose.model("packageOrders", packagesSchema);
module.exports = packagesModel;
