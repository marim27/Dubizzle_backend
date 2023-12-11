const express = require("express");
const router = express.Router();
const locationController = require("./../controllers/locationController");
const { upload } = require("./Upload");



router.route("/").get(locationController.getLocations).post(upload.single('image'),locationController.createLocation);
router.route("/:id").get(locationController.getLocation).patch(upload.single('image'),locationController.updateLocation).delete(locationController.deleteLocation);
router.get("/title?:title",locationController.getLocationByTitle);

module.exports = router;
