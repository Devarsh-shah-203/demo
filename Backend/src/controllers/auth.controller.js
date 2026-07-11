import asyncHandler from "../../../Hospital-management-system/backend/src/utils/asyncHandler.js";
import ApiResponse from "../../../Hospital-management-system/backend/src/utils/ApiResponse.js";

import {
  registerUser,
  loginUser,
  logoutUser,
} from "../../../Hospital-management-system/backend/src/services/auth.service.js";

import {
  accessCookieOptions,
  refreshCookieOptions,
} from "../../../Hospital-management-system/backend/src/utils/cookieOption.js";

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

export { register };