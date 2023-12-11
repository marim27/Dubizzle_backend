const categoryModel = require("../models/categories");
const subCategory = require("./../models/subCategoriesModel");

async function getProductArrayBySubCategory(req, res) {
  try {
    const categories = await categoryModel.find();
    let categoryList = [];
    let arrProdt;
    for (let category of categories) {
      let categoryName = category.name;
      let categoryImage = category.image;
      arrProdt = await subCategory
        .find({ CategoryID: category._id })
      categoryList.push({ categoryName, categoryImage,subCategories: arrProdt });
    }
    res.status(200).json({ categoryList });
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
}

// create a new category
async function createCategory(req, res) {
  try {
    const newCategory = await categoryModel.create({
      ...req.body,
      image: req.file.filename,
    });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(402).json({ message: error.message });
  }
}

// get all categories
async function getAllCategories(req, res) {
  try {
    const Categories = await categoryModel.find();
    res.status(201).json(Categories);
  } catch (error) {
    res.status(402).json({ message: error.message });
  }
}

// get category by id
async function getCategory(req, res) {
  var id = req.params.id;
  try {
    const Category = await categoryModel.findById(id);
    if (!Category) {
      throw new Error("Category not found");
    }
    res.status(201).json(Category);
  } catch (error) {
    res.status(402).json({ message: error.message });
  }
}

// //update category
async function updateCategory(req, res) {
  var id = req.params.id;
  var categoryData = {
    ...req.body,
    image: req.file ? req.file.filename : null,
  };
  try {
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      { _id: id },
      categoryData,
      { new: true }
    );
    res.status(201).json(updatedCategory);
  } catch (error) {
    res.status(402).json({ message: error.message });
  }
}

// delete a category
async function deleteCategory(req, res) {
  var id = req.params.id;
  try {
    const deletedCategory = await categoryModel.findByIdAndDelete(id);
    if (!deletedCategory) {
      throw new Error("Category not found");
    }
    res.status(201).json(deletedCategory);
  } catch (error) {
    res.status(402).json({ message: error.message });
  }
}

// get category by name
async function getCategoryByName(req, res) {
  var name = req.params.name;
  try {
    const categoryName = await categoryModel.find({ name: name });
    res.status(201).json(categoryName);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
}

// count categories number
async function countCategory(req, res) {
  try {
    const count = await categoryModel.estimatedDocumentCount();
    res.status(201).json(count);
  } catch (err) {
    res.status(402).json({ message: err.message });
  }
}

module.exports = {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
  getCategoryByName,
  countCategory,
  getProductArrayBySubCategory,
};
