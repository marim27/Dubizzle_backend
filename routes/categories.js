const express = require("express");
const router = express.Router();
const {upload}=require("./Upload")
const {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
  getCategoryByName,
  countCategory,
  getProductArrayBySubCategory,
} = require("../controllers/categories");

router.post("/",upload.single('image'), createCategory);

router.get("/", getAllCategories);
router.get("/category/SubCategory", getProductArrayBySubCategory);

router.get("/:id", getCategory);

router.patch("/:id",upload.single('image'), updateCategory);

router.delete("/:id", deleteCategory);

router.get("/name/:name", getCategoryByName);

router.get("/categorycount/categorycount", countCategory);

module.exports = router;
