const express = require("express");

const router = express.Router();

const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  categoryValidation,
  validate,
} = require("../validators/categoryValidator");

router.get("/", getCategories);

router.get("/:id", getCategoryById);

router.post(
  "/",
  protect,
  authorize("admin"),
  categoryValidation,
  validate,
  createCategory
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  categoryValidation,
  validate,
  updateCategory
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteCategory
);

module.exports = router;