const mongoose = require(`mongoose`);
const favoriteSchema = new mongoose.Schema(
  {  
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: `users`,
    },
product:{
    type: mongoose.SchemaTypes.ObjectId,
      ref: `products`,
}
},{
    timestamps: true,
  }
  );

  const favoriteModel = mongoose.model(`favorites`, favoriteSchema);
  module.exports = favoriteModel;