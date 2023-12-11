const mongoose = require(`mongoose`);

const productsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    condition: {
      type: String,
      required: true,
    },
    locationid: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: `Location`,
      required: true,
    },
    sellerid: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: `users`,
      required: true,
    },
    Categoryid: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: `categories`,
      required: true,
    },
    subCategoryID: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: `subCategories`,
      required: true,
    },
    productStatus: {
      type: String,
      required: true,
      default: `pending`,
      enum: [`pending`, "reject", `accept`,`disabled`],
    },
    Brand: {
      type: String,
    },
    PaymentOption: {
      type: String,
    },
    Deliverable: {
      type: Boolean,
      default:false,
    },
    Video: {
      type: Boolean,
      default:false,
    },
    Transmission: {
      type: Boolean,
      default:false,
    },
    PriceType: {
      type: String,
      default: `Price`,
    },
    phoneNumber: {
      type: String,
    },
    // Chat: {
    //   type: Boolean,
    //   default:false,
    // },
    colorid: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: `color`,
      default: `6521550ee00915ab1c65f0c6`,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    bombed: {
      type: Boolean,
      default: false,
    },
    views:  [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    telephone: {
      type: [String],
      required: true,
    },
    contactMethod: {
      type: String,
      required: true,
      default: `Dubizzle Chat`,
      enum: ["Dubizzle Chat", "Phone Number", "Both"],
    },
  },
  {
    timestamps: true,
    collection: "products",
  }
);

const productsModel = mongoose.model(`products`, productsSchema);
module.exports = productsModel;
