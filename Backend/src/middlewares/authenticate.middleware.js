import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authenticate = async (req, res, next) => {
  try {
<<<<<<< HEAD
    // Get token from header
    const authHeader = req.headers.authorization;
   
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
=======
    let token = null;

    // 1. Try Authorization Header
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    // 2. If not found, try Cookies
    if (!token) {
      token = req.cookies?.accessToken;
    }

    // 3. No token
    if (!token) {
>>>>>>> 2e375c146242fe393d4527427418ddf7a35bd99d
      return res.status(401).json({
        success: false,
        message: "No token provided. Access denied.",
      });
    }

    // 4. Verify Token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // 5. Find User
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found. Token invalid.",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(error);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token.",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Authentication error.",
    });
  }
};

export default authenticate;