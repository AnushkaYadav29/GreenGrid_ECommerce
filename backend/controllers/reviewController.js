const Review = require("../models/Review");
const Product = require("../models/Product");
const asyncHandler = require("../utils/asyncHandler");

const updateProductRating = async (productId) => {
  const reviews = await Review.find({ product: productId });

  const totalReviews = reviews.length;

  const rating =
    totalReviews === 0
      ? 0
      : reviews.reduce((sum, item) => sum + item.rating, 0) / totalReviews;

  await Product.findByIdAndUpdate(productId, {
    rating: Number(rating.toFixed(1)),
    totalReviews,
  });
};

// ================= ADD REVIEW =================
exports.addReview = asyncHandler(async (req, res) => {
  const { productId, rating, comment } = req.body;

  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  const existingReview = await Review.findOne({
    user: req.user._id,
    product: productId,
  });

  if (existingReview) {
    return res.status(400).json({
      success: false,
      message: "You have already reviewed this product",
    });
  }

  const review = await Review.create({
    product: productId,
    user: req.user._id,
    rating,
    comment,
  });

  await updateProductRating(productId);

  res.status(201).json({
    success: true,
    message: "Review added successfully",
    data: review,
  });
});

// ================= GET PRODUCT REVIEWS =================
exports.getProductReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({
    product: req.params.productId,
  }).populate("user", "name");

  res.status(200).json({
    success: true,
    count: reviews.length,
    data: reviews,
  });
});


// ================= UPDATE REVIEW =================
exports.updateReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const review = await Review.findById(req.params.id);

  if (!review) {
    return res.status(404).json({
      success: false,
      message: "Review not found",
    });
  }

  if (review.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "Access Denied",
    });
  }

  review.rating = rating;
  review.comment = comment;

  await review.save();

  await updateProductRating(review.product);

  res.status(200).json({
    success: true,
    message: "Review updated successfully",
    data: review,
  });
});

// ================= DELETE REVIEW =================
exports.deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return res.status(404).json({
      success: false,
      message: "Review not found",
    });
  }

  if (
    review.user.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    return res.status(403).json({
      success: false,
      message: "Access Denied",
    });
  }

  const productId = review.product;

  await Review.findByIdAndDelete(req.params.id);

  await updateProductRating(productId);

  res.status(200).json({
    success: true,
    message: "Review deleted successfully",
  });
});