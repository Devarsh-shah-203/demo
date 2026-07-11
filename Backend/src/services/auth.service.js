import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";
import {signupEmail} from "./email.service.js"


export const registerUser = async ({
  username,
  email,
  password,
  phone,
  role,
}) => {
  username = username.trim();
  email = email.trim().toLowerCase();

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    const error = new Error(
      existingUser.username === username
        ? "Username already taken"
        : "Email already registered"
    );
    error.statusCode = 409;
    throw error;
  }

  const user = await User.create({
    username,
    email,
    password,
    phone,
    role,
   
  });

  const accessToken = generateAccessToken(user._id, user.username,user.email);
  const refreshToken = generateRefreshToken(user._id);

 await signupEmail(email,username);

  user.refreshToken = refreshToken;

  await user.save({ validateBeforeSave: false });

  return {
    user,
    accessToken,
    refreshToken,
  };
};

export const loginUser = async (identity, password) => {
  identity = identity.trim().toLowerCase();

  const user = await User.findOne({
    $or: [{ username: identity }, { email: identity }],
  }).select("+password");

  if (!user) {
    const error = new Error("No user found. Please register first.");
    error.statusCode = 404;
    throw error;
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    user.loginAttempts += 1;

    await user.save({ validateBeforeSave: false });

    if (user.loginAttempts >= 5) {
      const error = new Error(
        "Too many failed login attempts. Please reset your password." // give option to reset password
      );
      error.statusCode = 401;
      throw error;
    }

    const error = new Error("Invalid password.");
    error.statusCode = 401;
    throw error;
  }

  user.loginAttempts = 0;
  user.lastLogin = new Date();

  const accessToken = generateAccessToken(user._id, user.username,user.email);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;

  await user.save({ validateBeforeSave: false });

  user.password = undefined;

  return {
    user,
    accessToken,
    refreshToken,
  };
};

export const logoutUser = async (userId) => {
  await User.findByIdAndUpdate(
    userId,
    {
      $unset: {
        refreshToken: "",
      },
    },
    {
      new: true,
    }
  );
};