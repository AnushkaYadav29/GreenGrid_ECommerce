require("dotenv").config();

const mongoose = require("mongoose");
const User = require("../models/User");

mongoose.connect(process.env.MONGO_URI);

const createAdmin = async () => {
  try {
    const existing = await User.findOne({
      email: "admin@greengrid.com",
    });

    if (existing) {
      console.log("Admin already exists");
      process.exit();
    }

    await User.create({
      name: "GreenGrid Admin",
      email: "admin@greengrid.com",
      password: "Admin@123",
      phone: "9999999999",
      role: "admin",
      isVerified: true,
    });

    console.log("✅ Admin Created Successfully");

    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

createAdmin();