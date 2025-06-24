import express from "express";
import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Initialize Razorpay with Test Mode Keys
const razorpay = new Razorpay({
        key_id: "rzp_test_1DP5mmOlF5G5ag", // Public Test Key (No need to login)
        key_secret: "your_test_secret_key", // If available
});

// Create an order (API Endpoint)
router.post("/create-order", async (req, res) => {
        try {
                const { amount, currency } = req.body;

                const options = {
                        amount: amount * 100, // Convert amount to paisa (1 INR = 100 paisa)
                        currency,
                        receipt: `order_rcptid_${Math.random() * 1000}`,
                };

                const order = await razorpay.orders.create(options);
                res.json(order);
        } catch (error) {
                res.status(500).json({ error: error.message });
        }
});

export default router;
