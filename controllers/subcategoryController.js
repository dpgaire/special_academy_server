const Subcategory = require("../models/Subcategory");

// @desc    Create a new subcategory
// @route   POST /api/subcategories
// @access  Private/Admin
const createSubcategory = async (req, res) => {
  const { _id, category_id, name } = req.body;

  try {
    const subcategory = await Subcategory.create({
      _id,
      category_id,
      name,
    });
    res.status(201).json(subcategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all subcategories
// @route   GET /api/subcategories
// @access  Private
const getSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find({}).populate("category_id");
    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get subcategory by ID
// @route   GET /api/subcategories/:id
// @access  Private
const getSubcategoryById = async (req, res) => {
  try {
    const subcategory = await Subcategory.findById(req.params.id).populate("category_id");

    if (subcategory) {
      res.json(subcategory);
    } else {
      res.status(404).json({ message: "Subcategory not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a subcategory
// @route   PUT /api/subcategories/:id
// @access  Private/Admin
const updateSubcategory = async (req, res) => {
  const { category_id, name } = req.body;

  try {
    const subcategory = await Subcategory.findById(req.params.id);

    if (subcategory) {
      subcategory.category_id = category_id || subcategory.category_id;
      subcategory.name = name || subcategory.name;

      const updatedSubcategory = await subcategory.save();
      res.json(updatedSubcategory);
    } else {
      res.status(404).json({ message: "Subcategory not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a subcategory
// @route   DELETE /api/subcategories/:id
// @access  Private/Admin
const deleteSubcategory = async (req, res) => {
  try {
    const subcategory = await Subcategory.findById(req.params.id);

    if (subcategory) {
      await subcategory.deleteOne();
      res.json({ message: "Subcategory removed" });
    } else {
      res.status(404).json({ message: "Subcategory not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createSubcategory,
  getSubcategories,
  getSubcategoryById,
  updateSubcategory,
  deleteSubcategory,
};


