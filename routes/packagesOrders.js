const express = require("express");
var router = express.Router();
var {
  getALLPackageOrders,
  addPackageOrder,
  getpackageOrder,
  updatePackageOrder,
  deletePackageOrder,
  getpackageOrderByUserId,
  getSucceededpackageOrderByUserId,
  // updateExpiredDate
} = require(`../controllers/packageOrders`);

router.route("/").post(addPackageOrder) //add new Packages
router.route("/").get(getALLPackageOrders) //get all Packages
router.route("/userID?:userID").get(getpackageOrderByUserId); // 
router.route("/succeed/userID?:userID").get(getSucceededpackageOrderByUserId); // 
// router.route("/update").get(updateExpiredDate)   //update Expired Date
router.route("/:id").get(getpackageOrder) // get all Packages
router.route("/:id").patch(updatePackageOrder)    // Update Packages
router.route("/:id").delete(deletePackageOrder)   //delete Packages

module.exports = router;