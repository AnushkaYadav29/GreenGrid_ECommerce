const Cart = require("../models/Cart");
const Product = require("../models/Product");
const asyncHandler = require("../utils/asyncHandler");

// Add To Cart
exports.addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      items: [],
    });
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({
      product: productId,
      quantity,
    });
  }

  cart.totalPrice = 0;

  for (const item of cart.items) {
    const p = await Product.findById(item.product);
    cart.totalPrice += p.price * item.quantity;
  }

  await cart.save();

  res.status(200).json({
    success: true,
    message: "Product added to cart",
    data: cart,
  });
});


// ================= GET CART =================
exports.getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id })
    .populate("items.product");

  if (!cart) {
    return res.status(200).json({
      success: true,
      data: {
        items: [],
        totalPrice: 0,
      },
    });
  }

  res.status(200).json({
    success: true,
    data: cart,
  });
});


// ================= UPDATE CART QUANTITY =================
exports.updateCartItem = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return res.status(404).json({
      success: false,
      message: "Cart not found",
    });
  }

  const item = cart.items.find(
    (item) => item.product.toString() === productId
  );

  if (!item) {
    return res.status(404).json({
      success: false,
      message: "Product not found in cart",
    });
  }

  item.quantity = quantity;

  cart.totalPrice = 0;

  for (const cartItem of cart.items) {
    const product = await Product.findById(cartItem.product);
    cart.totalPrice += product.price * cartItem.quantity;
  }

  await cart.save();

  res.status(200).json({
    success: true,
    message: "Cart updated successfully",
    data: cart,
  });
});

// ================= REMOVE ITEM =================
exports.removeCartItem = asyncHandler(async (req, res) => {
  const { productId } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return res.status(404).json({
      success: false,
      message: "Cart not found",
    });
  }

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId
  );

  cart.totalPrice = 0;

  for (const cartItem of cart.items) {
    const product = await Product.findById(cartItem.product);
    cart.totalPrice += product.price * cartItem.quantity;
  }

  await cart.save();

  res.status(200).json({
    success: true,
    message: "Item removed successfully",
    data: cart,
  });
});

// ================= CLEAR CART =================
exports.clearCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return res.status(404).json({
      success: false,
      message: "Cart not found",
    });
  }

  cart.items = [];
  cart.totalPrice = 0;

  await cart.save();

  res.status(200).json({
    success: true,
    message: "Cart cleared successfully",
  });
});