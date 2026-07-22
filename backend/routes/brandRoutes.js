const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const { createBrand,
        getBrands,
        getBrandById,
        updateBrand,
        deleteBrand,
} = require("../controllers/brandController");

console.log({
  createBrand,
  getBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
});

const {
  brandValidation,
  validate,
} = require("../validators/brandValidator");

router.get("/", getBrands);

router.get("/:id", getBrandById);

// Admin Only
router.post(
  "/",
  protect,
  authorize("admin"),
  brandValidation,
  validate,
  createBrand
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  brandValidation,
  validate,
  updateBrand
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteBrand
);


module.exports = router;