const packageOrdersModel = require(`../models/packageOrders`);
const schedule = require("node-schedule");

var addPackageOrder = async (req, res) => {
  try {
    var packageOrder = await packageOrdersModel.create(req.body);
    // console.log(packageOrder._id);
    // setTimeout(() => {
    //   packageOrdersModel
    //     .updateOne({ _id: packageOrder._id }, { ExpiredDate: true })
    //     .then(() => {
    //       console.log("order Expired (21 days)!");
    //     })
    //     .catch((err) => {
    //       console.error("Error updating product:", err);
    //     });
    // }, 21 * 24 * 60 * 60 * 1000);
    res.status(201).json(packageOrder);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

// var updateExpiredDate = async (req, res) => {
//   try {
//     var packageOrder = await packageOrdersModel.find({ ExpiredDate: false });

//     var id = packageOrder.map((ids) => ids._id);
//     console.log(id);
//     packageOrdersModel
//       .updateMany({ _id: id }, { ExpiredDate: true })
//       .then(() => {
//         console.log("update");
//       })
//       .catch((err) => {
//         console.error("Error updating product:", err);
//       });
//     res.status(201).json(packageOrder);
//   } catch (err) {
//     res.status(422).json({ message: err.message });
//   }
// };

// const job = schedule.scheduleJob("*/1 * * * *", () => {
//   async function updateExpiredDate() {
//     try {
//       var packageOrder = await packageOrdersModel.find({ ExpiredDate: false });
//       const today = new Date();
//       today.setDate(today.getDate() - 30);
//       const filteredData = packageOrder.filter(item => {
//         const createdAtDate = new Date(item.createdAt);
//         return createdAtDate < today;
//       });
//       var createdat = filteredData.map((ids) => {
//           return ids.createdAt
//         });
//         if(createdat.length > 0){
//           packageOrdersModel
//             .updateMany({ createdAt: createdat }, { ExpiredDate: true })
//             .then(() => {
//               console.log("update");
//             })
//             .catch((err) => {
//               console.error("Error updating product:", err);
//             });
//         }
//     } catch (err) {
//       console.log({ message: err.message });
//     }
//   }
//   updateExpiredDate();
// });


      // *    *    *    *    *    *
      // ┬    ┬    ┬    ┬    ┬    ┬
      // │    │    │    │    │    │
      // │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
      // │    │    │    │    └───── month (1 - 12)
      // │    │    │    └────────── day of month (1 - 31)
      // │    │    └─────────────── hour (0 - 23)
      // │    └──────────────────── minute (0 - 59)
      // └───────────────────────── second (0 - 59, OPTIONAL)


const job2 = schedule.scheduleJob("0 0 * * *", () => {
  async function updateExpiredDate() {
    try {
      var packageOrder = await packageOrdersModel.find({ ExpiredDate: false });
      const today = new Date();
      today.setDate(today.getDate() - 30);
      const filteredData = packageOrder.filter(item => {
        const createdAtDate = new Date(item.createdAt);
        return createdAtDate < today;
      });
      var createdat = filteredData.map((ids) => {
          return ids.createdAt
        });
        if(createdat.length > 0){
          packageOrdersModel
            .updateMany({ createdAt: createdat }, { ExpiredDate: true })
            .then(() => {
              console.log("update");
            })
            .catch((err) => {
              console.error("Error updating product:", err);
            });
        }
    } catch (err) {
      console.log({ message: err.message });
    }
  }
  updateExpiredDate();
});



// get all package
var getALLPackageOrders = async (req, res) => {
  try {
    var allpackageOrder = await packageOrdersModel.find();
    res.status(201).json(allpackageOrder);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

// get package by id
var getpackageOrder = async (req, res) => {
  var { id } = req.params;
  try {
    var packageOrder = await packageOrdersModel.findById({ _id: id });
    res.status(201).json(packageOrder);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};
// get package by id
var getpackageOrderByUserId = async (req, res) => {
  var { userID } = req.query;
  try {
    var packageOrder = await packageOrdersModel
      .find({ userID: userID })
      .populate("packageID");
    res.status(201).json(packageOrder);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};
// Update package data
var updatePackageOrder = async (req, res, next) => {
  var { id } = req.params;
  var { packageID, categoryID, subCategoryID, userID, transactionID } =
    req.body;
  try {
    await packageOrdersModel.updateOne(
      { _id: id },
      { packageID: packageID },
      { categoryID: categoryID },
      { subCategoryID: subCategoryID },
      { userID: userID },
      { transactionID: transactionID }
    );
    res.status(201).json(req.body);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

//delete package
var deletePackageOrder = async (req, res) => {
  var id = req.params.id;
  try {
    var delepackageOrder = await packageOrdersModel.deleteOne({ _id: id });
    res.status(201).json(delepackageOrder);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

// get Succeed package by user id
var getSucceededpackageOrderByUserId = async (req, res) => {
  var { userID } = req.query;
  try {
    var packageOrder = await packageOrdersModel.find({
      userID: userID,
      status: "succeeded",
      ExpiredDate: false,
    });
    res.status(201).json(packageOrder);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

module.exports = {
  addPackageOrder,
  updatePackageOrder,
  getALLPackageOrders,
  getpackageOrder,
  deletePackageOrder,
  getpackageOrderByUserId,
  getSucceededpackageOrderByUserId,
  // updateExpiredDate,
};
