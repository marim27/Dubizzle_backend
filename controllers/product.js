const productsModel = require(`../models/product`);
const subCat = require("./../models/subCategoriesModel");

const { formatDistanceToNow } = require("date-fns");
const User = require('../models/userModel');

// // add new product
// var addProducts = async (req, res) => {
//   try {
//     var product = await productsModel.create({...req.body,images: req.file.filename});
//     res.status(201).json(product);
//   } catch (err) {
//     res.status(422).json({ message: req.file });
//   }
// };
// const { formatDistanceToNow } = require('date-fns');
const Location = require("../models/locationModel");

require("./../models/userModel");

const addProducts = async (req, res) => {
  console.log("111111");
  console.log(req.body);

  console.log("req.files", req.files); // Use req.files to access uploaded files
  try {
    const { ...productData } = req.body;
    const images = [];
    req.files.forEach((element, index) => {
      images.push(element.filename);
    });
    var product = await productsModel.create({
      ...productData,
      images: images,
    });
    // console.log(req.files);
    console.log(req.body);
    res.status(201).json(product);
  } catch (err) {
    console.log(err.message);

    res.status(422).json({ message: err.message });
  }
};

module.exports = addProducts;

var getProductArrayBySubCategory = async (req, res) => {
  try {
    const subCategories = await subCat.find().limit(4);
    let productList = [];
    subCategories.forEach((ele) => {
      let subCategoryName = ele.title;
      // console.log(ele.title);

      (async () => {
        // console.log(ele._id);

        let arrProdt = await subproductsModel
          .find({ productStatus: "accept", subCategoryID: ele._id })
          .limit(4);
        productList.push({ subCategoryName: arrProdt });
        console.log(productList);
        res.status(200).json({ productList: productList });
      })();
    });
    // console.log(productList);
    // var productsArray=await subproductsModel.find({productStatus:'accept'}).limit(4)
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

// get all Accepted product
var getAllAcceptedProducts = async (req, res) => {
  var { limit } = req.query;
  try {
    var acceptedProducts = await productsModel.find({
      productStatus: "accept",
    });
    res.status(200).json(acceptedProducts);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

// get all product
// var getAllProducts = async (req, res) => {
//   try {
//     var allProducts = await productsModel
//       .find()
//       .populate("locationid")
//       .populate("Categoryid")
//       .sort({ createdAt: -1 })
//     // .populate('sellerid')
//     const formattedProducts = allProducts.map((product) => {
//       return {
//         ...product._doc,
//         locationid: product.locationid.title,
//         Categoryid: product.Categoryid.name,
//         // sellerid:product.sellerid.username,
//       };
//     });

//     res.status(201).json(formattedProducts);
//   } catch (err) {
//     res.status(422).json({ message: err.message });
//   }
// };
/////////////////////////////////////////////////////////////////////////////
// // Update product data
// var updateProduct = async (req, res, next) => {
//   var { id } = req.params;
//   const images = [];
//   req.files.forEach((element) => {
//     images.push(element.filename);
//   });
//   var productData = { ...req.body, images: images };
//   try {
//     await productsModel.updateOne({ _id: id }, productData, { new: true });
//     res.status(201).json(productData);
//   } catch (err) {
//     res.status(422).json({ message: err.message });
//   }
// };

// Update product data
var updateProduct = async (req, res, next) => {
  var { id } = req.params;
  // console.log(req.body);
  const images = [];
  req.files.forEach((element) => {
    images.push(element.filename);
  });

  try {
    // Fetch the existing product data
    const existingProduct = await productsModel.findById(id);
    let x = [...existingProduct.images];
    // console.log(x);

    // Remove deleted images from the existing images array
    const updatedImages = x.filter((img) => req.body.images.includes(img));

    // Merge the existing product data with the new data, including the images
    const updatedProductData = {
      ...req.body,
      images: [...updatedImages, ...images],
    };

    // Perform the update
    const updatedProduct = await productsModel.findByIdAndUpdate(
      id,
      updatedProductData,
      { new: true }
    );
    res.status(201).json(updatedProduct);
    const { featured, bombed } = req.body;
    // Update the 'featured' and 'bombed' fields to false after 3 days
    if (featured || bombed) {
      if (featured && bombed) {
        setTimeout(() => {
          productsModel
            .updateOne({ _id: id }, { featured: false, bombed: false })
            .then(() => {
              console.log(
                "featured & bombed updated after 3 days Succesfully!"
              );
            })
            .catch((err) => {
              console.error("Error updating product:", err);
            });
        }, 3 * 24 * 60 * 60 * 1000);
      } else if (featured) {
        setTimeout(() => {
          productsModel
            .updateOne({ _id: id }, { featured: false })
            .then(() => {
              console.log("featured updated after 3 days Succesfully!");
            })
            .catch((err) => {
              console.error("Error updating product:", err);
            });
        }, 5 * 24 * 60 * 60 * 1000);
      } else if (bombed) {
        setTimeout(() => {
          productsModel
            .updateOne({ _id: id }, { bombed: false })
            .then(() => {
              console.log("bombed updated after 3 days Succesfully!");
            })
            .catch((err) => {
              console.error("Error updating product:", err);
            });
        }, 3 * 24 * 60 * 60 * 1000);
      }
    }
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};



var updateNumOfPhoneView = async (req, res, next) => {
  var { id } = req.params;
  const { telephone } = req.body;

  try {
    // Fetch the existing product data
    const existingProduct = await productsModel.findById(id);
    
    let x = [...existingProduct.telephone];
if(x.includes(telephone)){
  res.status(201).json('user is already viewing phone number');
  // console.log(telephone);
  // console.log(x.includes(telephone));
  // console.log(x);
}else{
  // Perform the update
  // console.log(telephone);
  // console.log(x.includes(telephone));
  // console.log(x);
  const updatedProduct = await productsModel.findByIdAndUpdate(
    id,
   { telephone: [...x, telephone]},
    { new: true }
  );
  res.status(201).json(updatedProduct);
}
    // Update the 'featured' and 'bombed' fields to false after 3 days
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};


//delete product

// var deleteProduct = async (req, res) => {
//   var id = req.params.id;
//   try {
//     var deletedProduct = await productsModel.deleteOne({ _id: id });
//     res.status(201).json(deletedProduct);
//   } catch (err) {
//     res.status(422).json({ message: err.message });
//   }
// };

// const getallAds1 = async (req, res) => {
//   const favId  = req.query.favId;
//   try {
//     const numOfLikes = await User.find( { FavoriteAds: { $in: [ favId ] } })
//     const productLikes = await productsModel.updateOne( {},{ likes: numOfLikes })

// console.log(numOfLikes.count());
//     res.status(200).json(numOfLikes);
//   } catch (err) {
//     res.status(422).json({ message: err.message });
//   }
// };

var deleteProduct = async (req, res) => {
  var id = req.params.id;
  try {
    await User.updateMany({}, { $pull: { FavoriteAds: id } });
    var deletedProduct = await productsModel.deleteOne({ _id: id });
    res.status(201).json(deletedProduct);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};
///////////////////////////////////////////////
const getallAds = async (req, res) => {
  const favId  = req.query.favId;
  try {
    const numOfLikes = await User.find( { FavoriteAds: { $in: [ favId ] } }).count()
    const productLikes = await productsModel.updateOne( {_id:favId},{ likes: numOfLikes })
    res.status(200).json({numOfLikes:numOfLikes});
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

///////////////// Filters /////////////////

// filter product by id

var getProductByID = async (req, res) => {
  var { id } = req.params;
  try {
    const { single, list ,numOfLikes} = await getProductDetails(id);
    res.status(201).json({ single, list ,numOfLikes});
  } catch (err) {
    res.status(422).json({ message: err.message + " enta ya 3m" });
  }
};

// Function to get product by ID and related products
const getProductDetails = async (id) => {
  try {
    const product = await productsModel
      .findById({ _id: id })
      .populate("locationid")
      .populate("Categoryid")
      .populate("sellerid")
      .populate("subCategoryID");
      const numOfLikes = await User.find( { FavoriteAds: { $in: [ product._id ] } }).count()
    if (!product) {
      throw new Error("Product not found");
    }

    const createdAtDistance = formatDistanceToNow(new Date(product.createdAt), {
      addSuffix: true,
    });

    const formattedProduct = {
      ...product._doc,
      locationid: product.locationid,
      createdAt: createdAtDistance,
    };

    const subCategoryID = product.subCategoryID._id;
    const limit = 10;
    const productsInSameCategory = await productsModel
      .find({ subCategoryID, productStatus: "accept" })
      .sort({ bombed: -1, featured: -1 })
      .limit(limit)
      .populate("locationid")
      .populate("Categoryid")
      .populate("subCategoryID");
    let formatList = productsInSameCategory.map((product) => {
      const createdAtDistance = formatDistanceToNow(
        new Date(product.createdAt),
        {
          addSuffix: true,
        }
      );
      return {
        ...product._doc,
        locationid: product.locationid,
        // sellerid:product.sellerid.username,
        createdAt: createdAtDistance,
      };
    });

    return { single: formattedProduct, list: formatList ,numOfLikes:numOfLikes };
  } catch (err) {
    throw new Error(`Error fetching product details: ${err.message}`);
  }
};

// filter product by sub category id
var getProductByCategoryID = async (req, res) => {
  var { subCategoryID, limit } = req.query;
  console.log(subCategoryID, limit);

  try {
    var products = await productsModel
      .find({ subCategoryID: subCategoryID, productStatus: "accept" })
      .limit(limit)
      .populate("locationid")
      .populate("Categoryid")
      .populate("subCategoryID");
    // .populate('sellerid')
    const formattedProducts = products.map((product) => {
      const createdAtDistance = formatDistanceToNow(
        new Date(product.createdAt),
        {
          addSuffix: true,
        }
      );
      return {
        ...product._doc,
        locationid: product.locationid.title,
        // sellerid:product.sellerid.username,
        subCategoryID: product.subCategoryID.title,
        Categoryid: product.Categoryid.name,
        createdAt: createdAtDistance,
      };
    });
    res.status(200).json(formattedProducts);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

// get all product
// var getAllProducts = async (req, res) => {
//   try {
//     var allProducts = await productsModel
//       .find()
//       .populate("locationid")
//       .populate("Categoryid")
//       .populate("sellerid")
//       .populate("subCategoryID")
//       .sort({ createdAt: -1 })

//     const formattedProducts = allProducts.map((product) => {
//       return {
//         ...product._doc,
//         locationid: product.locationid.title,
//         Categoryid: product.Categoryid.name,
//         subCategoryID: product.subCategoryID.title,
//         // sellerid:product.sellerid.username,
//       };
//     });

//     res.status(201).json(formattedProducts);
//   } catch (err) {
//     console.log("222222");

//     res.status(422).json({ message: err.message });
//   }
// };

// module.exports = getProductByID;
// filter product by title
var getProductByTitle = async (req, res) => {
  var { title } = req.query;
  try {
    var product = await productsModel
      .find({ title: title, productStatus: "accept" })
      .populate("locationid")
      .populate("Categoryid")
      .populate("subCategoryID");
    // .populate('sellerid')
    const formattedProducts = product.map((product) => {
      const createdAtDistance = formatDistanceToNow(
        new Date(product.createdAt),
        {
          addSuffix: true,
        }
      );
      return {
        ...product._doc,
        locationid: product.locationid.title,
        // sellerid:product.sellerid.username,
        subCategoryID: product.subCategoryID.title,
        Categoryid: product.Categoryid.name,
        createdAt: createdAtDistance,
      };
    });
    res.status(201).json(formattedProducts);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

// filter product by location
var getProductByLocation = async (req, res) => {
  var { location } = req.query;
  try {
    var products = await productsModel
      .find({ locationid: location, productStatus: "accept" })
      .populate("locationid")
      .populate("Categoryid")
      .populate("subCategoryID");
    // .populate('sellerid')
    const formattedProducts = products.map((product) => {
      const createdAtDistance = formatDistanceToNow(
        new Date(product.createdAt),
        {
          addSuffix: true,
        }
      );
      return {
        ...product._doc,
        locationid: product.locationid.title,
        // sellerid:product.sellerid.username,
        subCategoryID: product.subCategoryID.title,
        Categoryid: product.Categoryid.name,
        createdAt: createdAtDistance,
      };
    });
    res.status(201).json(formattedProducts);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

// filter product by seller id
var getProductBySellerID = async (req, res) => {
  var { seller } = req.query;
  try {
    var products = await productsModel
      .find({ sellerid: seller })
      .populate("locationid")
      .populate("Categoryid")
      .populate("subCategoryID");
      
    var like=  products.map((num)=>num._id)

let fav=[]
for(var i=0; i<like.length; i++){
  const numOfLikes = await User.find( { FavoriteAds: { $in: [ like[i] ] } }).count()
  fav.push(numOfLikes)
}
const numOfTel =products.map((product)=>product.telephone.length)
console.log(numOfTel);
    const formattedProducts = products.map((product) => {
      const createdAtDistance = formatDistanceToNow(
        new Date(product.createdAt),
        {
          addSuffix: true,
        }
      );
      return {
        ...product._doc,
        locationid: product.locationid.title,
        // sellerid:product.sellerid.username,
        subCategoryID: product.subCategoryID.title,
        Categoryid: product.Categoryid.name,
        createdAt: createdAtDistance,
      };
    });

    res.status(201).json({formattedProducts:formattedProducts,fav:fav,numOfTel:numOfTel} );
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};
// filter accepted product by seller id
var getAcceptedProductBySellerID = async (req, res) => {
  var { seller } = req.query;
  try {
    var products = await productsModel
      .find({ sellerid: seller, productStatus: "accept" })
      .populate("locationid")
      .populate("Categoryid")
      .populate("subCategoryID");
    // .populate('sellerid')
    const formattedProducts = products.map((product) => {
      const createdAtDistance = formatDistanceToNow(
        new Date(product.createdAt),
        {
          addSuffix: true,
        }
      );
      return {
        ...product._doc,
        locationid: product.locationid.title,
        // sellerid:product.sellerid.username,
        subCategoryID: product.subCategoryID.title,
        Categoryid: product.Categoryid.name,
        createdAt: createdAtDistance,
      };
    });

    res.status(201).json(formattedProducts);
    // res.status(201).json(products);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

// filter product by condition
var getProductByCondition = async (req, res) => {
  var { condition } = req.query;
  try {
    var products = await productsModel
      .find({ condition: condition, productStatus: "accept" })
      .populate("locationid")
      .populate("Categoryid")
      .populate("subCategoryID");
    // .populate('sellerid')
    const formattedProducts = products.map((product) => {
      const createdAtDistance = formatDistanceToNow(
        new Date(product.createdAt),
        {
          addSuffix: true,
        }
      );
      return {
        ...product._doc,
        locationid: product.locationid.title,
        // sellerid:product.sellerid.username,
        subCategoryID: product.subCategoryID.title,
        Categoryid: product.Categoryid.name,
        createdAt: createdAtDistance,
      };
    });

    res.status(201).json(formattedProducts);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

// filter product by price
var getProductByPrice = async (req, res) => {
  var { min, max } = req.query;
  try {
    var products = await productsModel.find({
      $and: [{ price: { $gte: parseInt(min), $lte: parseInt(max) } }],
      productStatus: "accept",
    });
    res.status(201).json(products);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
}; //error

///////////////// Pagination /////////////////
var getProductsByPage = async (req, res) => {
  var { page } = req.query;
  try {
    page = parseInt(page);
    var itemsPerPage = 4;
    var skip = (page - 1) * itemsPerPage;

    var products = await productsModel.find().skip(skip).limit(itemsPerPage);
    res.status(200).json(products);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};
/////////////////////////////////////////////////////////////////////////////
// filter products by status
var getProductByStatus = async (req, res) => {
  var { productStatus } = req.query;
  try {
    var products = await productsModel
      .find({ productStatus: productStatus })
      .populate("locationid")
      .populate("Categoryid")
      .populate("subCategoryID");
    // .populate('sellerid')
    const formattedProducts = products.map((product) => {
      const createdAtDistance = formatDistanceToNow(
        new Date(product.createdAt),
        {
          addSuffix: true,
        }
      );
      return {
        ...product._doc,
        locationid: product.locationid.title,
        // sellerid:product.sellerid.username,
        subCategoryID: product.subCategoryID.title,
        Categoryid: product.Categoryid.name,
        createdAt: createdAtDistance,
      };
    });

    res.status(201).json(formattedProducts);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

// count  products number
async function countProducts(req, res) {
  try {
    const count = await productsModel.estimatedDocumentCount();
    res.status(201).json(count);
  } catch (err) {
    res.status(402).json({ message: err.message });
  }
}
// update Product Status
var updateProductStatus = async (req, res) => {
  var { id } = req.params;
  var productStatus = req.body.productStatus;
  try {
    var updateStatus = await productsModel.updateOne(
      { _id: id },
      { productStatus: productStatus });
    res.status(201).json(updateStatus);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};
// update Product Status
var deactiveProduct = async (req, res) => {
  var { id } = req.params;
  try {
    var updateStatus = await productsModel.updateOne(
      { _id: id },
      { productStatus: "disabled" });
    res.status(201).json(updateStatus);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

// filter product by sub category id

// var getProductByCategoryID = async (req, res) => {
//   var { subCategoryID } = req.query;
//   try {
//     console.log(subCategoryID);
//     var products = await productsModel.find({ subCategoryID: subCategoryID });
//     res.status(201).json(products);
//   } catch (err) {
//     res.status(422).json({ message: err.message });
//   }
// };


// filter product by sub category id
var getProductByCategoryID = async (req, res) => {
  var { subCategoryID, limit } = req.query;
  console.log(subCategoryID, limit);

  try {
    var products = await productsModel
      .find({ subCategoryID: subCategoryID, productStatus: "accept" })
      .limit(limit)
      .populate("locationid")
      .populate("Categoryid")
      .populate("subCategoryID");
    // .populate('sellerid')
    const formattedProducts = products.map((product) => {
      const createdAtDistance = formatDistanceToNow(
        new Date(product.createdAt),
        {
          addSuffix: true,
        }
      );
      return {
        ...product._doc,
        locationid: product.locationid.title,
        // sellerid:product.sellerid.username,
        subCategoryID: product.subCategoryID.title,
        Categoryid: product.Categoryid.name,
        createdAt: createdAtDistance,
      };
    });
    res.status(200).json(formattedProducts);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

// get all product
var getAllProducts = async (req, res) => {
  try {
    var allProducts = await productsModel
      .find()
      .populate("locationid")
      .populate("Categoryid")
      .populate("sellerid")
      .populate("subCategoryID")
      .sort({ createdAt: -1 })
    const formattedProducts = allProducts.map((product) => {
      return {
        ...product._doc,
        locationid: product.locationid.title,
        Categoryid: product.Categoryid.name,
        subCategoryID: product.subCategoryID.title,
        // sellerid:product.sellerid.username,
      };
    });

    res.status(201).json(formattedProducts);
  } catch (err) {
    console.log("222222");

    res.status(422).json({ message: err.message });
  }
};


var searchProducts = async (req, res) => {
  const {
    title,
    location,
    seller,
    condition,
    minPrice,
    maxPrice,
    productStatus,
    subCategoryID,
    Categoryid,
  } = req.query;
  try {
    let query = {};
    if (title) {
      query.title = new RegExp(title, "i");
    }
    if (location) {
      query.locationid = location;
    }
    if (seller) {
      query.sellerid = seller;
    }
    if (condition) {
      query.condition = condition;
    }
    if (minPrice && maxPrice) {
      query.price = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };
    }
    if (productStatus) {
      query.productStatus = productStatus;
    }

    if (subCategoryID) {
      query.subCategoryID = subCategoryID;
    }
    if (Categoryid) {
      query.Categoryid = Categoryid;
    }
    const products = await productsModel
      .find(query)
      .populate("locationid")
      .populate("Categoryid")
      .populate("subCategoryID");
    const formattedProducts = products.map((product) => {
      const createdAtDistance = formatDistanceToNow(
        new Date(product.createdAt),
        {
          addSuffix: true,
        }
      );
      return {
        ...product._doc,
        location: product.locationid.title,
        subCategory: product.subCategoryID.title,
        Category: product.Categoryid.name,
        createdAt: createdAtDistance,
      };
    });
    res.status(200).json(formattedProducts);
  } catch (err) {
    res.status(422).json({ message: "Error fetching products" });
  }
};

var getAllProductBySubCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const subCategories = await subCat.find().limit(4);
    let productList = [];
    let arrProdt;
    for (let subcategory of subCategories) {
      let subCategoryName = subcategory.title;
      // console.log(subCategories);
      // console.log(subCategoryName);
      arrProdt = await subproductsModel
        .find({ productStatus: "accept", subCategoryID: subcategory._id })
        .limit(4)
        .populate("locationid");
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
      productList.push({ subCategoryName, products: arrProdt });
      // console.log(arrProdt);
    }

    res.status(200).json({ productList });
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

// const filterProducts = async (req, res) => {
//   const { title, min, max, location } = req.query;
//   const minPrice = min ? parseInt(min) : 0;
//   const maxPrice = max ? parseInt(max) : Infinity;
//   try {
//     let filter = { productStatus: 'accept' };
//     if (title) {
//       filter.title = new RegExp(title, "i");
//     }
//     if (min && !max) {
//       filter.price = { $gte: minPrice };
//     } else if (!min && max) {
//       filter.price = { $lte: maxPrice };
//     } else if (min && max) {
//       filter.price = { $gte: minPrice, $lte: maxPrice };
//     }
//     if (location) {
//       const regex = new RegExp(location, 'i');
//       const locationDoc = await Location.findOne({ title: { $regex: regex } }).exec();
//       if (locationDoc) {
//         filter.locationid = locationDoc._id;
//       } else {
//         filter.locationid = null;
//       }
//     }
//     const filteredProducts = await productsModel.find(filter).populate('locationid');
//     const formattedProducts = filteredProducts.map((product) => {
//       const createdAtDistance = formatDistanceToNow(new Date(product.createdAt), {
//         addSuffix: true,
//       });
//       return {
//         ...product._doc,
//         location: product.locationid ? product.locationid.title : 'Unknown Location',
//         createdAt: createdAtDistance,
//       };
//     });
//     res.status(200).json(formattedProducts);
//   } catch (err) {
//     res.status(422).json({ message: 'Error: ' + err.message });
//   }
// };

const filterProducts = async (req, res) => {
  const { title, min, max, location, subCategoryID, Categoryid } = req.query;
  // console.log(location+"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  const minPrice = min ? parseInt(min) : 0;
  const maxPrice = max ? parseInt(max) : Infinity;
  try {
    let filter = { productStatus: "accept" };
    if (title) {
      filter.title = new RegExp(title, "i");
    }
    if (min && !max) {
      filter.price = { $gte: minPrice };
    } else if (!min && max) {
      filter.price = { $lte: maxPrice };
    } else if (min && max) {
      filter.price = { $gte: minPrice, $lte: maxPrice };
    }
    if (location && location !== "Egypt") {
      const regex = new RegExp(location, "i");
      const locationDoc = await Location.findOne({
        title: { $regex: regex },
      }).exec();
      if (locationDoc) {
        filter.locationid = locationDoc._id;
      } else {
        filter.locationid = null;
      }
    }
    if (subCategoryID) {
      filter.subCategoryID = subCategoryID;
    }
    if (Categoryid) {
      filter.Categoryid = Categoryid;
    }

    // Sort based on 'bombed' and 'featured' values, with 'bombed' or 'featured' first
    const filteredProducts = await productsModel
      .find(filter)
      .populate("locationid")
      .sort({ bombed: -1, featured: -1 });

    const formattedProducts = filteredProducts.map((product) => {
      const createdAtDistance = formatDistanceToNow(
        new Date(product.createdAt),
        {
          addSuffix: true,
        }
      );
      return {
        ...product._doc,
        location: product.locationid
          ? product.locationid.title
          : "Unknown Location",
        createdAt: createdAtDistance,
      };
    });
    res.status(200).json(formattedProducts);
  } catch (err) {
    res.status(422).json({ message: "Error: " + err.message });
  }
};

module.exports = {
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
  searchProducts,
  getAllAcceptedProducts,
  getAcceptedProductBySellerID,
  getAllProductBySubCategory,
  filterProducts,
  getallAds,
  deactiveProduct,
  updateNumOfPhoneView
};
