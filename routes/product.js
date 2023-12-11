const express = require("express");
const { upload } = require("./Upload");
const { searchProducts, filterProducts } = require("../controllers/product");

var router = express.Router();
var {
  addProducts,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductByID,
  getProductByCategoryID,
  getProductBySellerID,
  getProductByCondition,
  getProductByLocation,
  getProductByTitle,
  getProductsByPage,
  getProductByPrice,
  countProducts,
  updateProductStatus,
  getProductByStatus,
  getAllAcceptedProducts,
  getAcceptedProductBySellerID,
  getallAds,
  deactiveProduct,
  updateNumOfPhoneView
} = require(`../controllers/product`);

router.route("/").get(getAllProducts);
router.route("/accepted").get(getAllAcceptedProducts);
router.post("/", upload.array("images", 16), addProducts);

router
  .get("/subCategoryID?:subCategoryID", getProductByCategoryID)
  // .get("/AcceptedProductBySellerID", getAcceptedProductBySellerID)
  .get("/seller?:seller", getProductBySellerID)
  .get("/accepted/seller?:seller", getAcceptedProductBySellerID)
  .get("/condition?:condition", getProductByCondition)
  .get("/location?:location", getProductByLocation)
  .get("/title?:title", getProductByTitle)
  .get("/productStatus?:productStatus", getProductByStatus)
  .get("/page?:page", getProductsByPage);
  router.get("/favId?:favId", getallAds);

router.get("/search", searchProducts);
router.get('/filter', filterProducts);
router
  .route("/:id")
  .patch(upload.array("images", 16), updateProduct)
  .delete(deleteProduct)
  .get(getProductByID);

router.get("/productcount/productcount", countProducts);
// router.get("/productcount/productcount", countProducts);
router.patch("/status/:id", updateProductStatus);
router.patch("/deactive/:id", deactiveProduct);
router.patch("/phoneView/:id", updateNumOfPhoneView);

router.get("/:min/:max", getProductByPrice);

module.exports = router;
