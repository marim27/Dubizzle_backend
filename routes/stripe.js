const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/stripe");



router.post("/", paymentController.payment);
router.get("/config", paymentController.getInfo);

  

module.exports = router;
