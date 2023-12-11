const mongoose = require(`mongoose`);
const packagesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: [true, "Duplicated Name, You must change it."],
    },
    arName: {
      type: String,
      required: true,
      unique: [true, "Duplicated Name, You must change it."],
    },
    details: {
      type: String,
      required: true,
    },
    arDetails: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    numOfAds: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
      expiryDays:{
        type: Number,
        required: true,
      },
      TitleadsDaysDetails:{
        type: String,
        required: true,
      },
      arTitleadsDaysDetails:{
        type: String,
        required: true,
      },
      adsDaysDetails:{
        type: String,
        required: true,
      },
      aradsDaysDetails:{
        type: String,
        required: true,
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
    const packagesModel = mongoose.model(`packages`, packagesSchema);
    module.exports = packagesModel;