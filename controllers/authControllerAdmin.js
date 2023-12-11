const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admins");

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            throw new Error("Invalid email or password");
        }
        const isPasswordMatch = await bcrypt.compare(password, admin.password);
        if (!isPasswordMatch) {
            throw new Error("Invalid email or password");
        }
        const token = jwt.sign({ adminId: admin._id }, "654DubizzleAdmin");
        res.status(200).json({
            message: "success",
            admin,
            token,
        });
    } catch (err) {
        res.status(401).json({
            message: "Login failed",
            error: err.message,
        });
    }
};
