const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const asyncHandler = require("../utils/asyncHandler");
const sendEmail = require("../utils/sendEmail");
const orderConfirmationTemplate = require("../templates/orderConfirmationTemplate");
const orderStatusTemplate = require("../templates/orderStatusTemplate");

// ================= PLACE ORDER =================
exports.placeOrder = asyncHandler(async (req, res) => {
  const { shippingAddress, paymentMethod } = req.body;

  const cart = await Cart.findOne({ user: req.user._id }).populate(
    "items.product"
  );

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Cart is empty",
    });
  }

  const orderItems = [];

  let itemsPrice = 0;

  for (const item of cart.items) {
    if (item.product.stock < item.quantity) {
      return res.status(400).json({
        success: false,
        message: `${item.product.name} is out of stock`,
      });
    }

    orderItems.push({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price,
    });

    itemsPrice += item.product.price * item.quantity;

    item.product.stock -= item.quantity;
    await item.product.save();
  }

  const shippingPrice = itemsPrice > 1000 ? 0 : 100;

  const taxPrice = Number((itemsPrice * 0.18).toFixed(2));

  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const order = await Order.create({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  });

  // ================= Send Order Confirmation Email =================
try {
  const populatedOrder = await Order.findById(order._id)
    .populate("user", "name email")
    .populate("orderItems.product", "name");

  const html = orderConfirmationTemplate(populatedOrder);

  await sendEmail({
    to: populatedOrder.user.email,
    subject: `GreenGrid Order Confirmation #${populatedOrder._id}`,
    html,
  });

  console.log("Order confirmation email sent.");

} catch (error) {
  console.error("Order confirmation email failed:", error.message);
}

  cart.items = [];
  cart.totalPrice = 0;

  await cart.save();

  res.status(201).json({
    success: true,
    message: "Order placed successfully",
    data: order,
  });
});

// ================= GET MY ORDERS =================
exports.getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .populate("orderItems.product", "name price images")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: orders.length,
    data: orders,
  });
});

// ================= GET ORDER BY ID =================
exports.getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name email")
    .populate("orderItems.product", "name price images");

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  if (
    req.user.role !== "admin" &&
    order.user._id.toString() !== req.user._id.toString()
  ) {
    return res.status(403).json({
      success: false,
      message: "Access Denied",
    });
  }

  res.status(200).json({
    success: true,
    data: order,
  });
});

// ================= CANCEL ORDER =================
exports.cancelOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  if (order.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "Access Denied",
    });
  }

  if (order.orderStatus !== "Pending") {
    return res.status(400).json({
      success: false,
      message: "Order cannot be cancelled",
    });
  }

  order.orderStatus = "Cancelled";

  await order.save();

  res.status(200).json({
    success: true,
    message: "Order cancelled successfully",
    data: order,
  });
});

// ================= ADMIN GET ALL ORDERS =================
exports.getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .populate("orderItems.product", "name")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: orders.length,
    data: orders,
  });
});

// ================= UPDATE ORDER STATUS =================
exports.updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderStatus } = req.body;

  const order = await Order.findById(req.params.id)
    .populate("user", "name email");

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  order.orderStatus = orderStatus;

  if (orderStatus === "Delivered") {
    order.deliveredAt = new Date();
  }

  await order.save();

  // ================= Send Status Email =================
  try {
    const html = orderStatusTemplate(order);

    await sendEmail({
      to: order.user.email,
      subject: `GreenGrid Order ${order.orderStatus}`,
      html,
    });

    console.log("Order status email sent.");
  } catch (error) {
    console.error("Order status email failed:", error.message);
  }

  res.status(200).json({
    success: true,
    message: "Order status updated",
    data: order,
  });
});