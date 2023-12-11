const express = require("express");
const router = express.Router();
const {
  createcolor,
  getAllcolor,
  getcolorById,
  updatecolor,
  deletecolor,
} = require("../controllers/color");

router.post("/", createcolor);
router.get("/", getAllcolor);
router.get("/:id", getcolorById);
router.patch("/:id", updatecolor);
router.delete("/:id", deletecolor);

module.exports = router;
