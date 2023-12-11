const subCat = require("./../models/subCategoriesModel");
const subproductsModel = require(`../models/product`);
const { formatDistanceToNow } = require("date-fns");

exports.getProductArrayBySubCategory = async (req, res) => {
  try {
    const subCategories = await subCat.find().limit(4);
    let productList = [];
    let arrProdt;
    for (let subcategory of subCategories) {
      let subCategoryName = subcategory.title;
      let ARsubCategoryName = subcategory.artitle;
      // console.log(subCategories);
      // console.log(subCategoryName);
      arrProdt = await subproductsModel
        .find({ productStatus: "accept", subCategoryID: subcategory._id })
        .sort({ createdAt: -1 })
        .limit(4)
        .populate("locationid")
        .populate("subCategoryID")
        .populate("Categoryid");
      arrProdt = arrProdt.map((product) => {
        const createdAtDistance = formatDistanceToNow(
          new Date(product.createdAt),
          {
            addSuffix: true,
          }
        );
        return {
          ...product._doc,
          locationid: product.locationid.title,
          createdAt: createdAtDistance,
        };
      });

      // Custom sorting: Sort by "bombed" and "featured" values to make it first see
      arrProdt.sort((a, b) => {
        const aSortValue = a.bombed || a.featured ? 0 : 1;
        const bSortValue = b.bombed || b.featured ? 0 : 1;
        return aSortValue - bSortValue;
      });
      // console.log(subcategory._id);
      productList.push({ARsubCategoryName, subCategoryName, products: arrProdt ,subcategoryID:subcategory._id });
      // console.log(arrProdt);
    }

    res.status(200).json({ productList });
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

exports.createSubCategory = async (req, res, next) => {
  try {
    // const categoryId = req.body.categoryId; // ERRRRRRRRRROOR 7RRRam 3leeek
    const categoryId = req.body.CategoryID; // Retrieve the categoryId from the request body
    const subCategoryData = {
      title: req.body.title, // Make sure to include the title
      artitle: req.body.artitle, // Make sure to include the title
      CategoryID: categoryId,
    };

    const subCategory = await subCat.create(subCategoryData);
    res.status(201).json({
      message: "created",
      data: {
        subCategory,
      },
    });
  } catch (err) {
    res.status(400).json({
      message: "failed",
      err,
    });
  }
};

exports.getSubCategorys = async (req, res, next) => {
  try {
    const subCategorys = await subCat.find();
    res.status(200).json({
      message: "success",
      data: {
        data: subCategorys,
      },
    });
  } catch (err) {
    res.status(404).json({
      message: "Not Found",
      err,
    });
  }
};

//.populate("CategoryID");
exports.getSubCategory = async (req, res, next) => {
  try {
    const subCategory = await subCat
      .findById(req.params.id)
      .populate("CategoryID"); 

    if (!subCategory) {
      return res.status(404).json({
        message: "Subcategory not found",
      });
    }


    res.status(200).json({
      message: "success",
      data: {
        subCategory,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};


exports.updateSubCategory = async (req, res, next) => {
  try {
    const subCategory = await subCat.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({
      message: "success",
      data: {
        subCategory,
      },
    });
  } catch (err) {
    res.status(404).json({
      message: "Not Found",
      err,
    });
  }
};

exports.deleteSubCategory = async (req, res, next) => {
  try {
    const subCategory = await subCat.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "success",
      data: {
        subCategory,
      },
    });
  } catch (err) {
    res.status(404).json({
      message: "Not Found",
      err,
    });
  }
};

// filter subCategory by title
// exports.getSubCategoryByTitle = async (req, res) => {
//   var { title } = req.params;
//   try {
//     var subCategory = await subCat.find({ title: title });
//     res.status(201).json(subCategory);
//   } catch (err) {
//     res.status(422).json({ message: err.message });
//   }
// };

exports.getSubCategoryByCategoryID = async (req, res) => {
  const { CategoryID, limit } = req.query; // Use req.query to access query parameters
  try {
    // const subCategory = await subCat.find({ CategoryID: CategoryID });
    const subCategory = await subCat
      .find({ CategoryID: CategoryID })
      .limit(limit);
    res.status(201).json(subCategory);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

exports.getSubCategoryBytitle = async (req, res) => {
  const { title } = req.query; // Use req.query to access query parameters
  try {
    const subCategory = await subCat.find({ title: title });
    res.status(201).json(subCategory);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};
