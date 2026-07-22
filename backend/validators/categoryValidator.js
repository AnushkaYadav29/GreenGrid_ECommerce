const { body, validationResult } = require("express-validator");

const categoryValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required"),
];

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
  categoryValidation,
  validate,
};