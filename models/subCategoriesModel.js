const mongoose = require("mongoose");

const subSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Sub Category Must have Title "],
      trim: true,
      minLength: 2,
      maxLength: 40,
    },
    artitle: {
      type: String,
      required: [true, "Sub Category Must have ARTitle "],
      trim: true,
      minLength: 2,
      maxLength: 40,
    },
    CategoryID: { type: mongoose.Schema.Types.ObjectId, ref: "categories" },
  },
  {
    timestamps: true,
    collection: "subCategories",
  }
);

const subCat = mongoose.model("subCategories", subSchema);
module.exports = subCat;
