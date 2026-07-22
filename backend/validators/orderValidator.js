const { body, validationResult } = require("express-validator");

const orderValidation = [
  body("shippingAddress.fullName").notEmpty().withMessage("Full name is required"),
  body("shippingAddress.phone").notEmpty().withMessage("Phone is required"),
  body("shippingAddress.address").notEmpty().withMessage("Address is required"),
  body("shippingAddress.city").notEmpty().withMessage("City is required"),
  body("shippingAddress.state").notEmpty().withMessage("State is required"),
  body("shippingAddress.postalCode").notEmpty().withMessage("Postal Code is required"),
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
  orderValidation,
  validate,
};