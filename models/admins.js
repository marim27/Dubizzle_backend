const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Admin Must Have name"],
      minLength: 2,
      maxLength: 40,
    },
    adminName: {
      type: String,
      trim: true,
      required: [true, "Admin Must Have Admin name"],
      minLength: 2,
      maxLength: 40,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Admin Must have Email"],
      validate: [validator.isEmail, "Please Provide A valid Email"],
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    role: {
      type: String,
      required: true,
      enum: ["superuser", "moderator", "admin"],
    },
  },
  {
    timestamps: true,
  }
);

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const adminModel = mongoose.model("admins", adminSchema);
module.exports = adminModel;
