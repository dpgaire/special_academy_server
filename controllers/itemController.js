const Item = require("../models/Item");
const logActivity = require("../utils/activityLogger");

// @desc    Create a new item
// @route   POST /api/items
// @access  Private/Admin
const createItem = async (req, res) => {
  const { subcategory_id, name, description, type, file_path, youtube_url } = req.body;
  try {
    const item = await Item.create({
      subcategory_id,
      name,
      description,
      type,
      file_path: type === "pdf" ? file_path : undefined,
      youtube_url: type === "youtube_url" ? youtube_url : undefined,
    });
    await logActivity(req.user.id, 'create', 'item', item._id, req);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all items
// @route   GET /api/items
// @access  Private
const getItems = async (req, res) => {
  try {
    const { subcategoryId } = req.query; // or req.params depending on your route

    let filter = {};
    if (subcategoryId) {
      filter.subcategory_id = subcategoryId; // only fetch items under this subcategory
    }

    const items = await Item.find(filter).populate("subcategory_id");

    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc    Get item by ID
// @route   GET /api/items/:id
// @access  Private
const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate("subcategory_id");

    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update an item
// @route   PUT /api/items/:id
// @access  Private/Admin
const updateItem = async (req, res) => {
  const { subcategory_id, name, description, type, youtube_url } = req.body;
  const file_path = req.file ? req.file.path : null;

  try {
    const item = await Item.findById(req.params.id);

    if (item) {
      item.subcategory_id = subcategory_id || item.subcategory_id;
      item.name = name || item.name;
      item.description = description || item.description;
      item.type = type || item.type;

      if (type === "pdf") {
        item.file_path = file_path || item.file_path;
        item.youtube_url = undefined; // Clear youtube_url if type changes to pdf
      } else if (type === "youtube_url") {
        item.youtube_url = youtube_url || item.youtube_url;
        item.file_path = undefined; // Clear file_path if type changes to youtube_url
      }

      const updatedItem = await item.save();
      await logActivity(req.user.id, 'update', 'item', item._id, req);
      res.json(updatedItem);
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete an item
// @route   DELETE /api/items/:id
// @access  Private/Admin
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (item) {
      await item.deleteOne();
      await logActivity(req.user.id, 'delete', 'item', req.params.id, req);
      res.json({ message: "Item removed" });
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Search items
// @route   GET /api/items/search
// @access  Private
const searchItems = async (req, res) => {
  try {
    const { q, startDate, endDate, sortBy, sortOrder } = req.query;

    let query = {};

    if (q) {
      query.$text = { $search: q };
    }

    if (startDate && endDate) {
      query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    } else if (startDate) {
      query.createdAt = { $gte: new Date(startDate) };
    } else if (endDate) {
      query.createdAt = { $lte: new Date(endDate) };
    }

    let sort = {};
    if (sortBy) {
      sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    }

    const items = await Item.find(query).sort(sort).populate("subcategory_id");

    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
  searchItems,
};


