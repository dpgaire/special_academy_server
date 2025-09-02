const mongoose = require("mongoose");

const SubcategorySchema = new mongoose.Schema(
  {
    _id: { type: String, required: true, unique: true },
    category_id: { type: String, ref: "Category", required: true },
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Subcategory", SubcategorySchema);
