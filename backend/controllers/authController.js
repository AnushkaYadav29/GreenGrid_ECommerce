const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const asyncHandler = require("../utils/asyncHandler");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
// ================= Register =================
exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  const user = await User.create({
    name,
    email,
    password,
    phone,
    role: "customer",
  });

  // ================= Send Welcome Email =================
  try{
  await sendEmail({
    to: user.email,
    subject: "Welcome to GreenGrid 🌱",
    html: `
      <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto;">
        <h2 style="color:#2E7D32;">Welcome to GreenGrid 🌱</h2>

        <p>Hello <strong>${user.name}</strong>,</p>

        <p>
          Thank you for registering with <strong>GreenGrid</strong>.
          Your account has been created successfully.
        </p>

        <p>
          We're excited to have you with us! Explore eco-friendly products,
          manage your profile, create orders, and enjoy sustainable shopping.
        </p>

        <hr>

        <p>Happy Shopping! 🌿</p>

        <p><strong>GreenGrid Team</strong></p>
      </div>
    `,
  });
  } catch (error) {
    console.error("Welcome email failed:", error.message);
  }

  const token = generateToken(user._id);

  res.status(201).json({
    success: true,
    message: "Registration Successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

// ================= Login =================
exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid Email or Password",
    });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid Email or Password",
    });
  }

  const token = generateToken(user._id);

  user.password = undefined;

  res.status(200).json({
    success: true,
    message: "Login Successful",
    token,
    user,
  });
});

// ================= Forgot Password =================
exports.forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // Generate Reset Token
  const resetToken = user.getResetPasswordToken();

  console.log("Reset Token:", resetToken);
  // Save token & expiry
  await user.save({ validateBeforeSave: false });

  // Reset URL
  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

  try {
    await sendEmail({
      to: user.email,
      subject: "GreenGrid Password Reset",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Password Reset Request</h2>

          <p>Hello ${user.name},</p>

          <p>You requested to reset your password.</p>

          <p>
            Click the button below to reset your password.
          </p>

          <a
            href="${resetUrl}"
            style="
              background:#2E7D32;
              color:white;
              padding:12px 20px;
              text-decoration:none;
              border-radius:5px;
              display:inline-block;
            "
          >
            Reset Password
          </a>

          <p>This link expires in <strong>15 minutes</strong>.</p>

          <p>If you didn't request this, ignore this email.</p>
        </div>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Password reset email sent",
    });

  } catch (error) {

  console.error("Forgot Password Email Error:");
  console.error(error);

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save({ validateBeforeSave: false });

  return res.status(500).json({
    success: false,
    message: "Email could not be sent",
  });
}
});

// ================= Reset Password =================
exports.resetPassword = asyncHandler(async (req, res) => {

  // Hash the token received from URL
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  // Find user with valid token
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  }).select("+password");

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid or expired reset token",
    });
  }

  const { password } = req.body;

  user.password = password;

  // Clear reset fields
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password reset successful",
  });

});