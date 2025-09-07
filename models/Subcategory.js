const mongoose = require("mongoose");

const SubcategorySchema = new mongoose.Schema(
  {
    category_id: { type: String, ref: "Category", required: true },
    name: { type: String, required: true },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Subcategory", SubcategorySchema);
