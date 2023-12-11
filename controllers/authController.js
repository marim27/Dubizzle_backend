const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();
const { sendVerificationEmail } = require("./Email");
const { generateFromEmail } = require("unique-username-generator");

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("Invalid email or password");
        }
        if(user && user.userStatus=='accept') {

        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            throw new Error("Invalid email or password");
        }
        const token = jwt.sign({ userId: user._id }, "654DubizzleUser");
        res.status(200).json({
            message: "success",
            token,
            user,
        });
    } catch (err) {
        res.status(401).json({
            message: "Login failed",
            error: err.message,
        });
    }
};

exports.register = async (req, res) => {
    try {
        const username = generateFromEmail("User @yahoo.com", 6);
        const user = await User.create({...req.body,userStatus:'pending',username:username});
        const token = jwt.sign({ userId: user._id }, "654DubizzleUser");
        const url = `${process.env.BASE_URL}/${user._id}`;
        sendVerificationEmail(user.email, user.username,user._id ,url);
        res.status(201).json({user,token});
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
};



exports.activateAccount = async (req, res) => { 
    try {
     const id= req.params.id
     const updateduser = await User.findByIdAndUpdate(
        { _id: id },
        { userStatus: "accept" },
      );
      res.status(200).json({updateduser});
    } catch (error) {
      console.log("error");
      res.status(401).json({ message: error.message });
    }

  };


 // check if user=> log in  //  if not user =>register
exports.login_register = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(user) {
        try {
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) {
                throw new Error("Invalid email or password");
            }
            if(user.userStatus=='pending'){
                res.status(200).json({
                    message: "please, Check Your Email To Login"
                });
            }else if( user.userStatus=='accept'){
                const token = jwt.sign({ userId: user._id }, "654DubizzleUser");
                res.status(200).json({
                    message: "success",
                    token:token
                });
            }
        } catch (err) {
            res.status(401).json({
                message: "Login failed",
                error: err.message,
            });
        }
    }else if(!user){
        try {
            const username = generateFromEmail("User@yahoo.com", 3);
            const user = await User.create({...req.body,userStatus:'pending',username:username});
            const token = jwt.sign({ userId: user._id }, "654DubizzleUser");
            const url = `${process.env.BASE_URL}/`;
            sendVerificationEmail(user.email, user.username,user._id ,url);
            res.status(201).json({user: user,token:token});
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: err.message });
        }
    }
   
};


//         const { token } = req.body;

//         // Verifying the token
//         const user = jwt.verify(token, process.env.MAILING_SECRET);

//         // Checking if the user is already verified
//         const check = await User.findById(user.id);
//    // Updating the user's verified status
//    await User.findByIdAndUpdate(user.id, { userStatus: "accept" });

//    // Sending a success response
//    return res.status(200).json({ message: "Account has been activated successfully." });
//     } catch (error) {
//         // Sending an error response
//         res.status(500).json({ message: error.message });
//     }
// };