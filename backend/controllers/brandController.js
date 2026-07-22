const Brand = require("../models/Brand");
const asyncHandler = require("../utils/asyncHandler");

// Add Brand
exports.createBrand = asyncHandler(async (req, res) => {
  const { name, description, logo, website } = req.body;

  const existingBrand = await Brand.findOne({ name });

  if (existingBrand) {
    return res.status(400).json({
      success: false,
      message: "Brand already exists",
    });
  }

  const brand = await Brand.create({
    name,
    description,
    logo,
    website,
  });

  res.status(201).json({
    success: true,
    message: "Brand created successfully",
    brand,
  });
});


// Get All Brands
exports.getBrands = asyncHandler(async (req, res) => {
  const brands = await Brand.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: brands.length,
    data: brands,
  });
});

// Get Brand By ID
exports.getBrandById = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  if (!brand) {
    return res.status(404).json({
      success: false,
      message: "Brand not found",
    });
  }

  res.status(200).json({
    success: true,
    data: brand,
  });
});


// Update Brand
exports.updateBrand = asyncHandler(async (req, res) => {
  const { name, description, logo, website, status } = req.body;

  const brand = await Brand.findById(req.params.id);

  if (!brand) {
    return res.status(404).json({
      success: false,
      message: "Brand not found",
    });
  }

  // Check duplicate name
  if (name && name !== brand.name) {
    const existingBrand = await Brand.findOne({ name });

    if (existingBrand) {
      return res.status(400).json({
        success: false,
        message: "Brand name already exists",
      });
    }
  }

  brand.name = name || brand.name;
  brand.description = description || brand.description;
  brand.logo = logo || brand.logo;
  brand.website = website || brand.website;

  if (typeof status === "boolean") {
    brand.status = status;
  }

  await brand.save();

  res.status(200).json({
    success: true,
    message: "Brand updated successfully",
    data: brand,
  });
});


// Delete Brand
exports.deleteBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  if (!brand) {
    return res.status(404).json({
      success: false,
      message: "Brand not found",
    });
  }

  await Brand.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Brand deleted successfully",
  });
});