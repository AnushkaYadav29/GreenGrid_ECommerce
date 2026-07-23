const razorpay = require("../config/razorpay");
const Order = require("../models/Order");
const asyncHandler = require("../utils/asyncHandler");
const crypto = require("crypto");

// ================= CREATE RAZORPAY ORDER =================
exports.createRazorpayOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.body;

  const order = await Order.findById(orderId);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  // Ensure only the owner or an admin can create a payment
  if (
    req.user.role !== "admin" &&
    order.user.toString() !== req.user._id.toString()
  ) {
    return res.status(403).json({
      success: false,
      message: "Access Denied",
    });
  }

  // Prevent duplicate payment attempts
  if (order.paymentStatus === "Paid") {
    return res.status(400).json({
      success: false,
      message: "Order is already paid",
    });
  }

  const options = {
    amount: Math.round(order.totalPrice * 100), // Razorpay expects paise
    currency: "INR",
    receipt: order._id.toString(),
  };

  const razorpayOrder = await razorpay.orders.create(options);

  res.status(200).json({
    success: true,
    orderId: razorpayOrder.id,
    amount: razorpayOrder.amount,
    currency: razorpayOrder.currency,
    receipt: razorpayOrder.receipt,
    key: process.env.RAZORPAY_KEY_ID,
  });
});

// ================= VERIFY PAYMENT =================
exports.verifyPayment = asyncHandler(async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    orderId,
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({
      success: false,
      message: "Payment verification failed",
    });
  }

  const order = await Order.findById(orderId);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  order.paymentStatus = "Paid";

  order.paymentResult = {
    paymentId: razorpay_payment_id,
    orderId: razorpay_order_id,
    signature: razorpay_signature,
  };

  await order.save();

  res.status(200).json({
    success: true,
    message: "Payment verified successfully",
    data: order,
  });
});