const express = require("express");
var router = express.Router();
var {
  addFavorites,
  getFavorites,
  updateFavorites,
  deleteFavorites,
} = require(`../controllers/favorites`);

router.route("/").post(addFavorites)           // add new Favorite
router.route("/").get(getFavorites)            // get all Favorites
router.route("/:id").patch(updateFavorites)    // Update Favorites
router.route("/:id").delete(deleteFavorites)   //delete Favorites


module.exports = router;

