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

