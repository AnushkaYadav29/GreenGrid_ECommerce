const { body, validationResult } = require("express-validator");

// Add Brand Validation
const brandValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Brand name is required"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required"),

  body("website")
    .optional()
    .isURL()
    .withMessage("Please enter a valid website URL"),
];

// Validation Result
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  next();
};

module.exports = {
  brandValidation,
  validate,
};