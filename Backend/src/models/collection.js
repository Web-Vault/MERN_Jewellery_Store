import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
        {
                collectionName: { type: String },
                collectionDescription: { type: String },
                collectionBannerImage: { type: String },
                collectionProducts: [{
                        productId: { type: mongoose.Schema.Types.ObjectId },
                        productName: { type: String },
                        productImage: { type: String },
                        productPrice: { type: Number },
                }],
        }, 
        { timestamps: true }
);

export default  mongoose.model("Collection", collectionSchema);