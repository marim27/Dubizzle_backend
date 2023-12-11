const express = require("express");
var router = express.Router();

var {
  getAllSearchHistories,
  addSearchHistories,
  updateSearchHistory,
  deleteSearchHistory,
  getSearchHistoryByID
} = require(`../controllers/searchHistory`);

router.route("/").get(getAllSearchHistories).post(addSearchHistories);

router.route("/:id").patch(updateSearchHistory).delete(deleteSearchHistory).get(getSearchHistoryByID);

module.exports = router;
