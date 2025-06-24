import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },  // ✅ Ensure `user` is required
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }, 
      name: String,
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  paymentId: { type: String, required: true },
  discountCode: { type: String },
  paymentStatus: { type: String, enum: ["Paid", "Unpaid"], default: "Unpaid" },
  orderStatus: { type: String, enum: ["Pending", "Confirmed"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);
