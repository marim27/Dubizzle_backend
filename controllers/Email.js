const User = require("../models/userModel");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const {OAuth2} = google.auth;
const OAuth_Link = "https://developers.google.com/oauthplayground";
require('dotenv').config();
const { AUTH_EMAIL, MAILING_ID, MAILING_REFRESH, MAILING_SECRET } = process.env;
const auth = new OAuth2(
  MAILING_ID,
  MAILING_SECRET,
  MAILING_REFRESH,
  OAuth_Link
);
// async function updateUserStatus (id){
//   try {
//     await User.updateOne(
//       { _id: id },
//       { userStatus: "accept" });
//   console.log("user Status accept" );
//   } catch (err) {
//     console.log(err);
//   }
// };

const sendVerificationEmail = (email, name,id, url) => {
    auth.setCredentials({
    refresh_token: MAILING_REFRESH,
  });
  const accessToken = auth.getAccessToken();
  const stmp = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type:"OAuth2",
      user: AUTH_EMAIL,
      clientId: MAILING_ID,
      clientSecret: MAILING_SECRET,
      refreshToken: MAILING_REFRESH,
      accessToken,
    },
  });
  const mailOptions={
    from: AUTH_EMAIL,
    to:email,
    subject:"send register email Verification",
    // html:`<div style="padding:50px"><h2 style="padding-bottom:30px">Hello ${name}</h2><a onclick="${updateUserStatus(id)}" href="${url}" style="color:#fff;font-weight:700;text-decoration:none;width:200px;background-color:#e00000;padding:40px;border-radius:3%;border:none;text-align:center;display:block">confirm your dubizzle account</a></div>`,
    html:`<div style="padding:30px"><h2 style="padding-bottom:30px">Hello ${name}</h2><a href="${url}" style="color:#fff;font-weight:700;text-decoration:none;width:200px;background-color:#e00000;padding:40px;border-radius:3%;border:none;text-align:center;display:block">confirm your dubizzle account</a></div>`,
  };
  stmp.sendMail(mailOptions,(err,res)=>{
    if(err){
        console.log(err);
        console.log("error sending mail");
        return err
    }else{
      console.log(res.response);
      console.log("Email send");
      return res;
    }
  })
};
module.exports ={sendVerificationEmail }