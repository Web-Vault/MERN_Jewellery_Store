import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
        {
                name: { type: String, required: true },
                description: { type: String },
                price: { type: Number, required: true },
                stock: { type: Number, default: 1 },
                category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
                images: [{ type: String }], // Array of image URLs
        },
        { timestamps: true }
);

export default mongoose.model("Product", productSchema);
