const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  _id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
});

module.exports = mongoose.model("Category", CategorySchema);


