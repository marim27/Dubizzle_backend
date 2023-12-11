const packagesModel = require(`../models/packages`);

var addPackages = async (req, res) => {
  try {
    var package = await packagesModel.create({
      ...req.body,
      image: req.file.filename,
    });
    res.status(201).json(package);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

// get all package
var getPackages = async (req, res) => {
  try {
    var allpackages = await packagesModel.find();
    res.status(201).json(allpackages);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

// get package by id
var getpackage = async (req, res) => {
  var { id } = req.params;
  try {
    var package = await packagesModel.findById({ _id: id });
    res.status(201).json(package);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};
// Update package data
var updatePackages = async (req, res, next) => {
  var { id } = req.params;
  // var { image } =req.file.filename ;
  // var { name, details, price, numOfAds, discount } = req.body;
   var packageData = {
     ...req.body,
     image: req.file ? req.file.filename : null,
   };
  try {
    await packagesModel.updateOne(
      { _id: id },
      // {
      //   name: name,
      //   details: details,
      //   price: price,
      //   numOfAds: numOfAds,
      //   discount: discount,
      //   image: image,
      // }
      packageData,
      { new: true }
    );
    res.status(201).json(req.body);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

//delete package
var deletePackages = async (req, res) => {
  var id = req.params.id;
  try {
    var delepackage = await packagesModel.deleteOne({ _id: id });
    res.status(201).json(delepackage);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

module.exports = {
  addPackages,
  getPackages,
  getpackage,
  updatePackages,
  deletePackages,
};
