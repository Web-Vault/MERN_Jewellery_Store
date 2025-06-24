import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        products: [
                {
                        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }, // ✅ Fix: Correct reference
                        name: String,
                        price: Number,
                        quantity: { type: Number, default: 1 },
                }
        ]
}, { timestamps: true });

export default mongoose.model("Cart", cartSchema);
