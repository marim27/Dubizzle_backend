const searchHistoryModel = require(`../models/searchHistory`);

// add new searchHistory
var addSearchHistories = async (req, res) => {
  try {
    var searchHistory = await searchHistoryModel.create(req.body);
    res.status(201).json(searchHistory);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

// get all searchHistory
var getAllSearchHistories = async (req, res) => {
  try {
    var allSearchHistories = await searchHistoryModel.find();
    res.status(201).json(allSearchHistories);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

// Update searchHistory data
var updateSearchHistory = async (req, res, next) => {
  var { id } = req.params;
  var {
    user,
    searchQuery
  } = req.body;

  try {
    await searchHistoryModel.updateOne(
      { _id: id },
      { user: user, searchQuery: searchQuery }
    );
    res.status(201).json(req.body);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

//delete searchHistory
var deleteSearchHistory = async (req, res) => {
  var id = req.params.id;
  try {
    var deletedSearchHistory = await searchHistoryModel.deleteOne({ _id: id });
    res.status(201).json(deletedSearchHistory);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

// filter searchHistory by id
var getSearchHistoryByID = async (req, res) => {
  var { id } = req.params;
  try {
    var searchHistories = await searchHistoryModel.findById({ _id: id });
    res.status(201).json(searchHistories);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};


module.exports ={
  getAllSearchHistories,
  addSearchHistories,
  updateSearchHistory,
  deleteSearchHistory,
  getSearchHistoryByID
}