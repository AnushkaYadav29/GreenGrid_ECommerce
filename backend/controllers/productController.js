const Product = require("../models/Product");
const Brand = require("../models/Brand");
const Category = require("../models/Category");
const asyncHandler = require("../utils/asyncHandler");

// Create Product
exports.createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    discount,
    images,
    brand,
    category,
    stock,
    sustainability,
    specifications,
  } = req.body;

  const brandExists = await Brand.findById(brand);

  if (!brandExists) {
    return res.status(404).json({
      success: false,
      message: "Brand not found",
    });
  }

  const categoryExists = await Category.findById(category);

  if (!categoryExists) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }

  const product = await Product.create({
    name,
    description,
    price,
    discount,
    images,
    brand,
    category,
    vendor: req.user._id,
    stock,
    sustainability,
    specifications,
  });

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: product,
  });
});

// ================= GET PRODUCTS =================
exports.getProducts = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const {
    keyword,
    category,
    brand,
    minPrice,
    maxPrice,
    status,
    sort,
  } = req.query;

  const filter = {};

  // Search
  if (keyword) {
    filter.name = {
      $regex: keyword,
      $options: "i",
    };
  }

  // Category
  if (category) {
    filter.category = category;
  }

  // Brand
  if (brand) {
    filter.brand = brand;
  }

  // Status
  if (status) {
    filter.status = status;
  }

  // Price Filter
  if (minPrice || maxPrice) {
    filter.price = {};

    if (minPrice) {
      filter.price.$gte = Number(minPrice);
    }

    if (maxPrice) {
      filter.price.$lte = Number(maxPrice);
    }
  }

  let sortOption = {
    createdAt: -1,
  };

  switch (sort) {
    case "priceLow":
      sortOption = { price: 1 };
      break;

    case "priceHigh":
      sortOption = { price: -1 };
      break;

    case "rating":
      sortOption = { rating: -1 };
      break;

    case "oldest":
      sortOption = { createdAt: 1 };
      break;

    case "newest":
      sortOption = { createdAt: -1 };
      break;
  }

  const totalProducts = await Product.countDocuments(filter);

  const products = await Product.find(filter)
    .populate("brand", "name")
    .populate("category", "name")
    .populate("vendor", "name email")
    .sort(sortOption)
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    success: true,
    page,
    totalPages: Math.ceil(totalProducts / limit),
    totalProducts,
    count: products.length,
    data: products,
  });
});

// ================= GET PRODUCT BY ID =================
exports.getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate("brand", "name")
    .populate("category", "name")
    .populate("vendor", "name email");

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

// ================= UPDATE PRODUCT =================
exports.updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  Object.assign(product, req.body);

  await product.save();

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: product,
  });
});

// ================= DELETE PRODUCT =================
exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});