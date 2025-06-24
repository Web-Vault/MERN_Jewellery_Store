import express from "express";

import { protect } from "../middleware/authMiddleware.js"; // Assuming you have authentication middleware
import {
        addToCart,
        getCart,
        removeFromCart,
        updateQuantity
} from "../controllers/cartController.js";

import { clearUserCart } from "../controllers/cartController.js";



const router = express.Router();


// Cart routes
router.post("/add", protect, addToCart);
router.get("/:userId", protect, getCart);
router.post("/remove", protect, removeFromCart);
router.post("/update", protect, updateQuantity);
router.delete("/clear/:userId", protect, clearUserCart);

// ✅ Export Router
export default router;
