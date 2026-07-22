const Category = require("../models/Category");
const asyncHandler = require("../utils/asyncHandler");

// Create Category
exports.createCategory = asyncHandler(async (req, res) => {
  const { name, description, image } = req.body;

  const existingCategory = await Category.findOne({ name });

  if (existingCategory) {
    return res.status(400).json({
      success: false,
      message: "Category already exists",
    });
  }

  const category = await Category.create({
    name,
    description,
    image,
  });

  res.status(201).json({
    success: true,
    message: "Category created successfully",
    data: category,
  });
});

// Get All Categories
exports.getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: categories.length,
    data: categories,
  });
});

// Get Category By ID
exports.getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }

  res.status(200).json({
    success: true,
    data: category,
  });
});

// ================= UPDATE CATEGORY =================
exports.updateCategory = asyncHandler(async (req, res) => {
  const { name, description, image, status } = req.body;

  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }

  if (name && name !== category.name) {
    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }
  }

  category.name = name || category.name;
  category.description = description || category.description;
  category.image = image || category.image;

  if (typeof status === "boolean") {
    category.status = status;
  }

  await category.save();

  res.status(200).json({
    success: true,
    message: "Category updated successfully",
    data: category,
  });
});

// ================= DELETE CATEGORY =================
exports.deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }

  await Category.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Category deleted successfully",
  });
});