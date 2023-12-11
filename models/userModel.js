const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            trim: true,
            required: [true, "User Must Have name"],
            minLength: 2,
            maxLength: 60,
        },
        gender: {
            type: String,
            default: "Prefer not say",
            enum: ["Male", "Female", "Prefer not say"],
        },
        about: {
            type: String,
        },
        dateOfBirth: {
            type: String,
        },
        email: {
            type: String,
            required: [true, "User Must have Email"],
            validate: [validator.isEmail, "Please Provide A valid Email"],
            unique: true,
            lowercase: true,
        },
        locationID: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Location",
        },
        contactMethod: {
            type: String,
            default: "Both",
            enum: ["Phone Number", "Dubizzle Chat", "Both"],
        },
        contactInfo: {
            type: String,
            validate: {
                validator: function (v) {
                    return /^01[0125]\d{8}$/.test(v);
                },
                message: "Invalid mobile number",
            },
        },
        userStatus: {
            type: String,
            required: true,
            default: "accept",
            enum: ["pending", "reject", "accept"],
        },
        password: {
            type: String,
            minLength: 6,
            required: [true, "password"],
        },
        confirmPassword: {
            type: String,
            validate: {
                validator: function (el) {
                    return el === this.password;
                },
                message: "Passwords Are Not The Same",
            },
        },
        // FavoriteAds: {
        //     type: Array,
        // },
        FavoriteAds: {
            type: [{ type: mongoose.SchemaTypes.ObjectId, ref: "products" }],
        },
        FavoriteSearch: {
            type: Array,
        },
        // emailVerify:{
        //     type:Boolean,
        //     default:false,
        // }
    },
    {
        timestamps: true,
        collection: "users",
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
    next();
});

const User = mongoose.model("users", userSchema);
module.exports = User;
