const { body, validationResult } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = {};
    errors.array().forEach((err) => {
      const field = err.param || err.path || "general"; 
      if (!formattedErrors[field]) {
        formattedErrors[field] = err.msg;
      }
    });

    return res.status(400).json({
      success: false,
      errors: formattedErrors,
    });
  }

  next();
};


const registerValidation = [
  body("fullName").notEmpty().withMessage("Full name is required"),
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  handleValidationErrors,
];

const loginValidation = [
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
  handleValidationErrors,
];

const categoryValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  handleValidationErrors,
];

const subcategoryValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("category_id").notEmpty().withMessage("Category ID is required"),
  handleValidationErrors,
];

const itemValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("subcategory_id").notEmpty().withMessage("Subcategory ID is required"),
  body("type")
    .isIn(["pdf", "youtube_url"])
    .withMessage("Type must be either 'pdf' or 'youtube_url'"),
  body("file_path").custom((value, { req }) => {
    if (req.body.type === "pdf" && !req.file) {
      throw new Error("A PDF file is required");
    }
    return true;
  }),
  body("youtube_url").custom((value, { req }) => {
    if (req.body.type === "youtube_url" && !value) {
      throw new Error("A YouTube URL is required");
    }
    if (
      req.body.type === "youtube_url" &&
      !/^(https?:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/.test(value)
    ) {
      throw new Error("Invalid YouTube URL");
    }
    return true;
  }),
  handleValidationErrors,
];

const updateUserValidation = [
  body("fullName")
    .optional()
    .notEmpty()
    .withMessage("Full name cannot be empty"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Please provide a valid email"),
  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  handleValidationErrors,
];

module.exports = {
  registerValidation,
  loginValidation,
  categoryValidation,
  subcategoryValidation,
  itemValidation,
  updateUserValidation,
};
