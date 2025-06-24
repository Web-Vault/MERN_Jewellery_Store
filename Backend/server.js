import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./src/config/db.js";

// Import Routes
import userRoutes from "./src/routes/userRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import categoryRoutes from "./src/routes/categoryRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import cartRoutes from "./src/routes/cartRoutes.js";
import reviewRoutes from "./src/routes/reviewRoutes.js";
import wishlistRoutes from "./src/routes/wishlistRoutes.js";
import paymentRoutes from "./src/routes/paymentRoutes.js";
import discountRoutes from "./src/routes/discountRoutes.js";
import collectionRoutes from "./src/routes/collectionRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import searchRoutes from "./src/routes/searchRoutes.js";

console.log("🔍 Loading .env file...");
import fs from "fs";

const envFilePath = "./.env";
if (fs.existsSync(envFilePath)) {
    console.log("✅ .env file found!");
} else {
    console.log("❌ .env file is missing!");
}


import dotenv from "dotenv";
dotenv.config();
console.log("📩 EMAIL_USER:", process.env.EMAIL_USER);
console.log("🔑 EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded" : "❌ Not Loaded");


// Initialize Express App
const app = express();

// Database Connection
connectDB().catch(err => {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/discounts", discountRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/search", searchRoutes);

// Default Route
app.get("/", (req, res) => {
        res.status(200).json({ message: "🚀 API is running..." });
});

// 404 Error Handling Middleware
app.use((req, res, next) => {
        res.status(404).json({ success: false, message: "❌ Route Not Found!" });
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
        console.error("❌ Error:", err.message);
        // Enhanced Error Handling for different status codes
        res.status(err.status || 500).json({
                success: false,
                message: err.message || "Internal Server Error!",
                stack: process.env.NODE_ENV === "development" ? err.stack : null, // Show stack trace only in development
        });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
