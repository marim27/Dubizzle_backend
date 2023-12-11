const express = require("express");
var router = express.Router();
const { upload } = require("./Upload");

var {
  addPackages,
  getPackages,
  getpackage,
  updatePackages,
  deletePackages,
} = require(`../controllers/packages`);

router.route("/").post(upload.single('image'),addPackages)           // add new Packages
router.route("/").get(getPackages)            // get all Packages
router.route("/:id").get(getpackage)            // get all Packages
router.route("/:id").patch(upload.single('image'),updatePackages)    // Update Packages
router.route("/:id").delete(deletePackages)   //delete Packages


module.exports = router;