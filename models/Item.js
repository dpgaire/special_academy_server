const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true, unique: true },
    subcategory_id: { type: String, ref: "Subcategory", required: true },
    title: { type: String, required: true },
    description: { type: String },
    type: { type: String, required: true, enum: ["pdf", "youtube_url"] },
    // Conditional fields based on type
    file_path: {
      type: String,
      required: function () {
        return this.type === "pdf";
      },
    },
    youtube_url: {
      type: String,
      required: function () {
        return this.type === "youtube_url";
      },
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("Item", ItemSchema);
