const mongoose = require("mongoose");

const colorSchema = new mongoose.Schema(
  {
    colorName: {
      type: String,
      required: [true, "required"],
      unique: [true, "unique"],
    },
  },
  {
    timestamps: true,
    collection: "color",
  }
);

const colorModel = mongoose.model("color", colorSchema);
module.exports = colorModel;
