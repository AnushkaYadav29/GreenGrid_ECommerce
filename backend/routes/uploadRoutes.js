const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const { uploadImage } = require("../controllers/uploadController");

router.post(
  "/",
  protect,
  authorize("admin", "vendor"),
  upload.single("image"),
  uploadImage
);

module.exports = router;