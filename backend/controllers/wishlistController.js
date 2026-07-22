const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");
const asyncHandler = require("../utils/asyncHandler");

// Add To Wishlist
exports.addToWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.body;

  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  let wishlist = await Wishlist.findOne({ user: req.user._id });

  if (!wishlist) {
    wishlist = await Wishlist.create({
      user: req.user._id,
      products: [],
    });
  }

  if (!wishlist.products.includes(productId)) {
    wishlist.products.push(productId);
  }

  await wishlist.save();

  res.status(200).json({
    success: true,
    message: "Product added to wishlist",
    data: wishlist,
  });
});

// Get Wishlist
exports.getWishlist = asyncHandler(async (req, res) => {
  const wishlist = await Wishlist.findOne({
    user: req.user._id,
  }).populate("products");

  if (!wishlist) {
    return res.status(200).json({
      success: true,
      data: [],
    });
  }

  res.status(200).json({
    success: true,
    data: wishlist,
  });
});

// Remove Wishlist Item
exports.removeWishlistItem = asyncHandler(async (req, res) => {
  const { productId } = req.body;

  const wishlist = await Wishlist.findOne({
    user: req.user._id,
  });

  if (!wishlist) {
    return res.status(404).json({
      success: false,
      message: "Wishlist not found",
    });
  }

  wishlist.products = wishlist.products.filter(
    (item) => item.toString() !== productId
  );

  await wishlist.save();

  res.status(200).json({
    success: true,
    message: "Product removed from wishlist",
    data: wishlist,
  });
});