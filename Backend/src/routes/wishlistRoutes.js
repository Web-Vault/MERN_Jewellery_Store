import express from "express";
import {
        addToWishlist,
        getWishlist,
        removeFromWishlist,
        clearWishlist
} from "../controllers/wishlistController.js";
import { protect } from "../middleware/authMiddleware.js"; // Authentication middleware

const router = express.Router();

router.post("/add/:productId", protect, addToWishlist);
router.get("/", protect, getWishlist);
router.delete("/remove/:productId", protect, removeFromWishlist);
router.delete("/clear", protect, clearWishlist);

export default router;
