import express from "express";
import { checkAuth, deleteAccount, login, logout, signup, updatePassword, updateProfile } from "../controllers/authController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";
import { upload } from "../config/cloudinary.js";

export const authRouter = express.Router();

authRouter.post("/signup",signup);

authRouter.post("/login",login);

authRouter.post("/logout",logout);

authRouter.put('/profile',protectRoute,upload.single('avatar'),updateProfile)

authRouter.get('/check',protectRoute,checkAuth)

authRouter.put('/update-password',protectRoute,updatePassword)
authRouter.delete('/delete-account',protectRoute,deleteAccount)
