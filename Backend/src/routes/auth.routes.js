import express from 'express'
import { register,login,logout } from '../../../../auth/src/controllers/auth.controller.js';
import {verifyOtp,sendVerificationCode}from "../../../../auth/src/controllers/verifymail.js"
import reset from "../../../../auth/src/controllers/resetPassword.controller.js"
import authenticate from "../middlewares/authenticate.middleware.js"

const router = express.Router();

router.post("/forgot-password",sendVerificationCode);
router.post("/verify-otp",verifyOtp);
router.post("/reset/:id", reset)

router.post("/register",register);
router.post("/login",login);
router.post("/logout",authenticate,logout);

export default router;