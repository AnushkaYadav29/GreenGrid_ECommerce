const express = require("express");

const router = express.Router();

const {
  addToWishlist,
  getWishlist,
  removeWishlistItem,
} = require("../controllers/wishlistController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getWishlist);

router.post("/", protect, addToWishlist);

router.delete("/", protect, removeWishlistItem);

module.exports = router;