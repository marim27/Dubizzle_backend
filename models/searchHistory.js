const mongoose = require(`mongoose`);
const searchHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: `users`,
      required: true,
    },
    searchQuery: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "searchHistory"
  }
);
const searchHistoryModel = mongoose.model(`searchHistory`, searchHistorySchema);
module.exports = searchHistoryModel;
