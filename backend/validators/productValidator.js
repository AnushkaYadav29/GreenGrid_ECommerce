const { body, validationResult } = require("express-validator");

const productValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required"),

  body("price")
    .isNumeric()
    .withMessage("Price must be a number"),

  body("brand")
    .notEmpty()
    .withMessage("Brand is required"),

  body("category")
    .notEmpty()
    .withMessage("Category is required"),

  body("stock")
    .isNumeric()
    .withMessage("Stock must be numeric"),
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
  productValidation,
  validate,
};