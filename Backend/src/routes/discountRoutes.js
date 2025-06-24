import express from "express";
import Discount from "../models/discount.js"; // ✅ Ensure correct import

const router = express.Router();

// ✅ Route to Apply Discount Code
router.post("/apply", async (req, res) => {
        const { code, totalAmount } = req.body;

        try {
                const discount = await Discount.findOne({ code, isActive: true });
                console.log("discount object: ", discount);
                if (!discount) {
                        return res.status(400).json({ message: "Invalid or expired discount code." });
                }

                if (new Date(discount.expiryDate) < new Date()) {
                        return res.status(400).json({ message: "Discount code expired." });
                }

                if (totalAmount < discount.minAmount) {
                        return res.status(400).json({ message: `Minimum order value should be ₹${discount.minAmount}.` });
                }

                let discountAmount = discount.type === "percentage"
                        ? (totalAmount * discount.value) / 100
                        : discount.value;

                const finalAmount = totalAmount - discountAmount;

                const discountCode = discount.code;

                res.json({ success: true, discountAmount, finalAmount, discountCode });
        } catch (error) {
                res.status(500).json({ message: "Server error" });
        }
});

// ✅ Export Router
export default router;
