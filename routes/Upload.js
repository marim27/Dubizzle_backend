// const express = require('express')
const multer = require("multer");
const path = require("path");
// const upload = multer({ dest: 'uploads/' })
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
// //path of image
    cb(null, path.join(__dirname, '/../public'));
  },
  filename: function (req, file, cb) {
    // //filename of uploaded file
    const uniqueSuffix =file.fieldname+ Date.now() + "-" + Math.round(Math.random());
    cb(null, uniqueSuffix + path.extname(file.originalname));
    console.log(req.body);    
  },
});

const upload = multer({ storage });
module.exports = { upload };

