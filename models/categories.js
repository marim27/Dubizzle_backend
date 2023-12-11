const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "required"],
      unique: [true, "unique"],
    },
    arname: {
      type: String,
      // required: [true, "required"],
      // unique: [true, "unique"],
    },
    image: {
      type: String,
      required: [true, "required"],
    },
  },
  {
    timestamps: true,
  }
);

const categoryModel = mongoose.model("categories", categorySchema);
module.exports = categoryModel;
