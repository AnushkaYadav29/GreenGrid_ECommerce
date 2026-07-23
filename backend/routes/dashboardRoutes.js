const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  getDashboardSummary,
  getRecentOrders,
  getMonthlySales,
  getTopSellingProducts,
  getTopRatedProducts,
  getTopCustomers,
} = require("../controllers/dashboardController");

// ================= Dashboard Summary =================
router.get(
  "/summary",
  protect,
  authorize("admin"),
  getDashboardSummary
);

// ================= Recent Orders =================
router.get(
  "/recent-orders",
  protect,
  authorize("admin"),
  getRecentOrders
);

// ================= Monthly Sales =================
router.get(
  "/monthly-sales",
  protect,
  authorize("admin"),
  getMonthlySales
);

// ================= Top Selling Products =================
router.get(
  "/top-products",
  protect,
  authorize("admin"),
  getTopSellingProducts
);

// ================= Top Rated Products =================
router.get(
  "/top-rated",
  protect,
  authorize("admin"),
  getTopRatedProducts
);

// ================= Top Customers =================
router.get(
  "/top-customers",
  protect,
  authorize("admin"),
  getTopCustomers
);

module.exports = router;