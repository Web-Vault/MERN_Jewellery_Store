import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
        {
                name: { type: String, required: true },
                email: { type: String, required: true, unique: true },
                password: { type: String, required: true },
                address: { type: String },
                phone: { type: String },
                role: { type: String, enum: ["customer", "admin"], default: "customer" }, // User role
                resetToken: String,
                resetTokenExpiry: Date,
        },
        { timestamps: true }
);

export default mongoose.model("User", userSchema);
