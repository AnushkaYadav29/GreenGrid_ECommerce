const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  addReview,
  getProductReviews,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

const {
  reviewValidation,
  validate,
} = require("../validators/reviewValidator");

// Customer
router.post(
  "/",
  protect,
  reviewValidation,
  validate,
  addReview
);

router.get("/:productId", getProductReviews);

router.put(
  "/:id",
  protect,
  reviewValidation,
  validate,
  updateReview
);

router.delete("/:id", protect, deleteReview);

module.exports = router;