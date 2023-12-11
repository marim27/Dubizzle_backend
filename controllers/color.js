const colorModel = require("../models/color");
// creat color
async function createcolor(req, res) {
  try {
    const newcolor = await colorModel.create(req.body);
    res.status(201).json(newcolor);
  } catch (error) {
    res.status(402).json({ message: error.message });
  }
}
// get all color
async function getAllcolor(req, res) {
  try {
    const color = await colorModel.find().sort({ colorName: 1 });
    res.status(201).json(color);
  } catch (error) {
    res.status(402).json({ message: error.message });
  }
}
// get color By id
async function getcolorById(req, res) {
  var id = req.params.id;
  try {
    const color = await colorModel.findById(id);
    if (!color) {
      throw new Error("color not found");
    }
    res.status(201).json(color);
  } catch (error) {
    res.status(402).json({ message: error.message });
  }
}
// update color
async function updatecolor(req, res) {
  var id = req.params.id;
  var colorName = req.body.colorName;
  try {
    const updatedcolor = await colorModel.findByIdAndUpdate(
      { _id: id },
      { colorName: colorName },
      { new: true }
    );
    res.status(201).json(updatedcolor);
  } catch (error) {
    res.status(402).json({ message: error.message });
  }
}
// delete color
async function deletecolor(req, res) {
  var id = req.params.id;
  try {
    const deletedcolor = await colorModel.findByIdAndDelete(id);
    if (!deletedcolor) {
      throw new Error("color not found");
    }
    res.status(201).json(deletedcolor);
  } catch (error) {
    res.status(402).json({ message: error.message });
  }
}

module.exports = {
  createcolor,
  getAllcolor,
  getcolorById,
  updatecolor,
  deletecolor,
};
