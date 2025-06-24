import express from "express";
import {
    storeOrderAfterPayment,
    getAllOrders,
    getUserOrders,
    getOrderById,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Store order after payment (User)
router.post("/store-after-payment", protect, (req, res, next) => {
    console.log("🛑 Debugging Protect Middleware: req.user =", req.user);
    next();
}, storeOrderAfterPayment);

// Fetch all orders (Admin)
router.get("/", protect, admin, getAllOrders);
router.get("/orders/:id", protect, admin, getOrderById);

// Fetch user’s orders
router.get("/my-orders", protect, getUserOrders);

export default router;
