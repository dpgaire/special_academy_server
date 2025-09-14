const User = require("../models/User");
const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");
const Item = require("../models/Item");

const getStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const categories = await Category.countDocuments();
    const subcategories = await Subcategory.countDocuments();
    const items = await Item.countDocuments();

    res.json({
      users,
      categories,
      subcategories,
      items,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getStats,
};
