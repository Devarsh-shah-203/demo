import jwt from "jsonwebtoken";
import User from "../src/models/user.model.js";

const resetPassword = async (req, res, next) => {
  try {
    const resetPasswordToken = req.params.id // in url frontend side
    const {  password } = req.body;

    if (!resetPasswordToken || !password?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Reset token and password are required.",
      });
    }

    // Verify JWT
    const decoded = jwt.verify(
      resetPasswordToken,
      process.env.RESET_TOKEN_SECRET
    );
    console.log(decoded)

    
    const user = await User.findOne({
      _id: decoded.id,
      
    });

    console.log(user)

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token.",
      });
    }

    if (Date.now() > user.resetCodeExpiry) {
      user.resetPasswordToken = undefined;
      user.resetCodeExpiry = undefined;
      await user.save();

      return res.status(400).json({
        success: false,
        message: "Reset token has expired.",
      });
    }

   
    user.password = password;
    user.passwordChangedAt = Date.now();

   
    user.resetPasswordToken = undefined;
    user.resetCodeExpiry = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully.",
    });

  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token.",
      });
    }

    next(error);
  }
};

export default resetPassword;