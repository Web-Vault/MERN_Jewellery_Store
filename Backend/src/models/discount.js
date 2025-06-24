import mongoose from "mongoose";

const discountSchema = new mongoose.Schema({
        code: { type: String, required: true, unique: true },
        type: { type: String, enum: ["percentage", "fixed"], required: true },
        value: { type: Number, required: true },
        minAmount: { type: Number, default: 0 },
        expiryDate: { type: Date, required: true },
        usageLimit: { type: Number, default: 1 },
        isActive: { type: Boolean, default: true }
});

export default mongoose.model("Discount", discountSchema);
