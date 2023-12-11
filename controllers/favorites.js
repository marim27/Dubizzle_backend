const favoriteModel=require(`../models/favorites`)

var addFavorites=async (req, res) => {
    try {
      var favorite = await favoriteModel.create(req.body)
      res.status(201).json(favorite);
    } catch (err) {
      res.status(422).json({ message: err.message });
    }
  }
  // get all favorite
  var getFavorites=async (req, res) =>  {
    try {
      var allfavorite = await favoriteModel.find()
      res.status(201).json(allfavorite);
    } catch (err) {
      res.status(422).json({ message: err.message });
    }
  }
// //Update favorite data
var updateFavorites=async(req, res, next) =>{
    var {id} = req.params;
    try {
      await favoriteModel.updateOne( {_id:id});
      res.status(201).json(req.body);
    } catch (err) {
      res.status(422).json({ message: err.message });
    }
  }
  
  
  //delete favorite
  var deleteFavorites=async (req, res) =>  {
    var {id }= req.params;
    try {
      var delefavorite = await favoriteModel.deleteOne({ _id: id })
      res.status(201).json(delefavorite);
    } catch (err) {
      res.status(422).json({ message: err.message });
    }
  }
 
  module.exports = { addFavorites,
    getFavorites,
    updateFavorites,
    deleteFavorites,}