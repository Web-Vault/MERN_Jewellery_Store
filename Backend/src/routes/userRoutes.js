import express from "express";
import {
        registerUser,
        loginUser,
        getAllUsers,
        deleteUser,
        adminLogin,
        updateUser,
        createUser,
} from "../controllers/userController.js";
import { getUserProfile, updateUserProfile } from "../controllers/userController.js";

import { protect, admin } from "../middleware/authMiddleware.js"; // Authentication middleware

import sendEmail from "../services/emailService.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import User from "../models/users.js"; // ✅ FIXED: User model was missing!

const router = express.Router();


// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// admin Protected routes
router.post("/admin/login", adminLogin);
router.get("/", protect, admin, getAllUsers); // Admin only
router.post("/", protect, admin, createUser);  // Add new user
router.put("/:id", protect, admin, updateUser);  // Edit user details
router.delete("/:id", protect, admin, deleteUser); // Admin only

// Client protected routes
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

// 🟢 Forgot Password Route
router.post("/forgot-password", async (req, res) => {
        try {
                const { email } = req.body;
                console.log("📩 Forgot Password Request for:", email); // Log email

                const user = await User.findOne({ email });
                if (!user) {
                        console.error("❌ User not found:", email);
                        return res.status(400).json({ message: "User not found" });
                }

                // Generate reset token
                const resetToken = crypto.randomBytes(32).toString("hex");
                user.resetToken = resetToken;
                user.resetTokenExpiry = Date.now() + 3600000; // Token expires in 1 hour
                await user.save();

                // Send email with reset link
                const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
                console.log("📧 Sending email with link:", resetLink);

                const emailResponse = await sendEmail(
                        user.email,
                        "Password Reset Request",
                        `Click the link to reset your password: ${resetLink}`
                );

                if (!emailResponse.success) {
                        console.error("❌ Email sending failed");
                        return res.status(500).json({ message: "Failed to send email" });
                }

                console.log("✅ Reset link sent to:", user.email);
                res.json({ message: "Reset link sent to email." });
        } catch (error) {
                console.error("❌ Forgot Password Route Error:", error);
                res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
});


// 🔵 Reset Password Route
router.post("/reset-password/:token", async (req, res) => {
        try {
                const { token } = req.params;
                const { password } = req.body;

                const user = await User.findOne({ resetToken: token, resetTokenExpiry: { $gt: Date.now() } });
                if (!user) return res.status(400).json({ message: "Invalid or expired token" });

                // Hash the new password
                const hashedPassword = await bcrypt.hash(password, 10);
                user.password = hashedPassword;
                user.resetToken = undefined;
                user.resetTokenExpiry = undefined;
                await user.save();

                res.json({ message: "Password updated successfully. You can now log in with your new password." });
        } catch (error) {
                console.error("Reset Password Error:", error);
                res.status(500).json({ message: "Internal Server Error" });
        }
});

export default router;
