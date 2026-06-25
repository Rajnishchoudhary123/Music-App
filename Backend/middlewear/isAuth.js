const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/user.js");

dotenv.config();

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    console.log("Cookies:", req.cookies);
    console.log("Token:", token);

    if (!token) {
      return res.status(403).json({
        message: "Please login first",
      });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded token:", decodedData);

  
    req.user = await User.findById(decodedData._id);

    if (!req.user) {
      return res.status(403).json({
        message: "User not found",
      });
    }

    next();
  } catch (error) {
    console.log("isAuth error:", error);
    return res.status(403).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = isAuth;