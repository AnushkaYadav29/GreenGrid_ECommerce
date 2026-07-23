const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const Brand = require("../models/Brand");
const Category = require("../models/Category");

const asyncHandler = require("../utils/asyncHandler");

// ======================================================
// Dashboard Summary
// ======================================================
exports.getDashboardSummary = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments();

  const totalProducts = await Product.countDocuments();

  const totalOrders = await Order.countDocuments();

  const totalBrands = await Brand.countDocuments();

  const totalCategories = await Category.countDocuments();

  const revenue = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: {
          $sum: "$totalPrice",
        },
      },
    },
  ]);

  res.status(200).json({
    success: true,
    data: {
      totalUsers,
      totalProducts,
      totalOrders,
      totalBrands,
      totalCategories,
      totalRevenue: revenue[0]?.totalRevenue || 0,
    },
  });
});

// ======================================================
// Recent Orders
// ======================================================
exports.getRecentOrders = asyncHandler(async (req, res) => {
  const recentOrders = await Order.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 })
    .limit(10);

  res.status(200).json({
    success: true,
    count: recentOrders.length,
    data: recentOrders,
  });
});

// ======================================================
// Monthly Sales
// ======================================================
exports.getMonthlySales = asyncHandler(async (req, res) => {
  const sales = await Order.aggregate([
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        totalSales: {
          $sum: "$totalPrice",
        },
        totalOrders: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
      },
    },
  ]);

  res.status(200).json({
    success: true,
    data: sales,
  });
});

// ======================================================
// Top Selling Products
// ======================================================
exports.getTopSellingProducts = asyncHandler(async (req, res) => {
  const products = await Order.aggregate([
    {
      $unwind: "$orderItems",
    },
    {
      $group: {
        _id: "$orderItems.product",
        totalSold: {
          $sum: "$orderItems.quantity",
        },
      },
    },
    {
      $sort: {
        totalSold: -1,
      },
    },
    {
      $limit: 10,
    },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "product",
      },
    },
    {
      $unwind: "$product",
    },
    {
      $project: {
        _id: "$product._id",
        name: "$product.name",
        price: "$product.price",
        images: "$product.images",
        stock: "$product.stock",
        totalSold: 1,
      },
    },
  ]);

  res.status(200).json({
    success: true,
    data: products,
  });
});

// ======================================================
// Top Rated Products
// ======================================================
exports.getTopRatedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find()
    .sort({ rating: -1 })
    .limit(10);

  res.status(200).json({
    success: true,
    data: products,
  });
});

// ======================================================
// Top Customers
// ======================================================
exports.getTopCustomers = asyncHandler(async (req, res) => {
  const customers = await Order.aggregate([
    {
      $group: {
        _id: "$user",
        totalSpent: {
          $sum: "$totalPrice",
        },
        totalOrders: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        totalSpent: -1,
      },
    },
    {
      $limit: 10,
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "customer",
      },
    },
    {
      $unwind: "$customer",
    },
    {
      $project: {
        _id: "$customer._id",
        name: "$customer.name",
        email: "$customer.email",
        totalOrders: 1,
        totalSpent: 1,
      },
    },
  ]);

  res.status(200).json({
    success: true,
    data: customers,
  });
});