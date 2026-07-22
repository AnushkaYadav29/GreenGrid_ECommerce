const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  placeOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const {
  orderValidation,
  validate,
} = require("../validators/orderValidator");

// Customer
router.post("/", protect, orderValidation, validate, placeOrder);

router.get("/my-orders", protect, getMyOrders);

router.get("/:id", protect, getOrderById);

router.put("/cancel/:id", protect, cancelOrder);

// Admin
router.get(
  "/admin/all",
  protect,
  authorize("admin"),
  getAllOrders
);

router.put(
  "/admin/:id",
  protect,
  authorize("admin"),
  updateOrderStatus
);

module.exports = router;