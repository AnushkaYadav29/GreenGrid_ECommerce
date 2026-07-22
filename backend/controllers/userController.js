const asyncHandler = require("../utils/asyncHandler");

exports.getProfile = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});