const express = require("express");

const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  productValidation,
  validate,
} = require("../validators/productValidator");

// Public
router.get("/", getProducts);

router.get("/:id", getProductById);

// Admin & Vendor
router.post(
  "/",
  protect,
  authorize("admin", "vendor"),
  productValidation,
  validate,
  createProduct
);

router.put(
  "/:id",
  protect,
  authorize("admin", "vendor"),
  productValidation,
  validate,
  updateProduct
);

router.delete(
  "/:id",
  protect,
  authorize("admin", "vendor"),
  deleteProduct
);
module.exports = router;