import express from "express";
import { getUserCart, getUserWishlist, getAllProducts, getAllOrders } from "../controllers/adminController.js";
import { protect, admin } from "../middleware/authMiddleware.js"; // Ensure admin access

const router = express.Router();

// Route to get a user's cart - Admin only
router.get('/users/cart/:userId', protect, admin, getUserCart);

// Route to get a user's wishlist - Admin only
router.get("/users/:userId/wishlist", protect, admin, getUserWishlist);


router.get("/products", getAllProducts);

router.get("/orders", getAllOrders);

export default router;
