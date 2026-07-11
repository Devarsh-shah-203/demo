import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  registerUser,
  loginUser,
  logoutUser,
} from "/services/auth.service.js";

import {
  accessCookieOptions,
  refreshCookieOptions,
} from "/utils/cookieOption.js";

const register = asyncHandler(async (req, res) => {
  // from frontend recieve username,email,password,phone
  const { user, accessToken, refreshToken } = await registerUser(req.body);

  return res
    .status(201)
    .cookie("accessToken", accessToken, accessCookieOptions)
    .cookie("refreshToken", refreshToken, refreshCookieOptions)
    .json(
      new ApiResponse(
        201,
        {
          id: user._id,
          username: user.username,
          email: user.email,
        },
        "Registration successful"
      )
    );
});

const login = asyncHandler(async (req, res) => {
  // frontend will give  username or email and pwd
  const { identity, password } = req.body;

  const { user, accessToken, refreshToken } = await loginUser(
    identity,
    password
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, accessCookieOptions)
    .cookie("refreshToken", refreshToken, refreshCookieOptions)
    .json(
      new ApiResponse(
        200,
        {
          id: user._id,
          username: user.username,
          email: user.email,
        },
        "Login successful"
      )
    );
});

const logout = asyncHandler(async (req, res) => {
  await logoutUser(req.user._id);

  return res
    .clearCookie("accessToken", accessCookieOptions)
    .clearCookie("refreshToken", refreshCookieOptions)
    .status(200)
    .json(new ApiResponse(200, null, "Logged out successfully"));
});

export { register, login , logout };