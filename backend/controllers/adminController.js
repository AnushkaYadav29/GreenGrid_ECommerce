const asyncHandler = require("../utils/asyncHandler");

exports.adminDashboard = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: `Welcome ${req.user.name}`,
    role: req.user.role,
  });
});