const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Location Must have Title "],
      trim: true,
      minLength: 2,
      maxLength: 40,
      unique: [true, "Location Must have Unique Title"],
    },
    artitle: {
      type: String,
      required: [true, "Location Must have artitle "],
      trim: true,
      minLength: 2,
      maxLength: 40,
      unique: [true, "Location Must have Unique artitle"],
    },
    // productID: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
    image: {
      type: String,
      required: [true, "required"],
    },
  },
  {
    timestamps: true,
    collection: "locations",
  }
);

const Location = mongoose.model("Location", locationSchema);
module.exports = Location;
