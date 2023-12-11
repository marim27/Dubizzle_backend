const express = require ('express');
const router = express.Router();
const {create_order,capture_order
    ,successPayment
}= require('./payPalControl');

router.post("/create-order",create_order);
router.post("/capture-order/:orderID",capture_order);
router.get("/success/:PayerID/:paymentId",successPayment);
module.exports = router;