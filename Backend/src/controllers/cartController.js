import mongoose from "mongoose";
import Cart from "../models/cart.js";
import Product from "../models/products.js";


export const addToCart = async (req, res) => {
        try {
                const { userId, productId } = req.body;

                if (!userId || !productId) {
                        return res.status(400).json({ message: "Missing userId or productId" });
                }

                let cart = await Cart.findOne({ userId });

                if (!cart) {
                        cart = new Cart({ userId, products: [] });
                }

                const product = await Product.findById(productId);
                if (!product) {
                        return res.status(404).json({ message: "Product not found" });
                }

                // ✅ Fix: Ensure `product` is stored correctly in the cart
                const itemIndex = cart.products.findIndex((p) => p.product.toString() === productId);

                if (itemIndex > -1) {
                        cart.products[itemIndex].quantity += 1; // Increase quantity
                } else {
                        cart.products.push({
                                product: productId,
                                name: product.name,
                                price: product.price,
                                quantity: 1,
                        });
                }

                await cart.save();
                res.status(200).json({ message: "Added to cart successfully!", cart });
        } catch (error) {
                console.error("Error in addToCart:", error);
                res.status(500).json({ message: "Error adding to cart", error });
        }
};

export const getCart = async (req, res) => {
        try {
                const cart = await Cart.findOne({ userId: req.params.userId }).populate("products.product");

                if (!cart) return res.status(404).json({ message: "Cart is empty" });

                console.log("✅ Cart Data Sent:", cart); // Debugging log

                res.json(cart);
        } catch (error) {
                console.error("❌ Server error fetching cart:", error);
                res.status(500).json({ message: "Server error", error });
        }
};



export const updateQuantity = async (req, res) => {
        try {
                const { userId, productId, quantity } = req.body;

                let cart = await Cart.findOne({ userId });
                if (!cart) return res.status(404).json({ message: "Cart not found" });

                const itemIndex = cart.products.findIndex((p) => p.product.toString() === productId);
                if (itemIndex === -1) return res.status(404).json({ message: "Product not in cart" });

                // Update quantity
                cart.products[itemIndex].quantity = quantity;
                if (cart.products[itemIndex].quantity <= 0) {
                        cart.products.splice(itemIndex, 1); // Remove if quantity is 0
                }

                await cart.save();
                res.json({ message: "Cart updated", cart });
        } catch (error) {
                res.status(500).json({ message: "Server error", error });
        }
};

export const removeFromCart = async (req, res) => {
        try {
                const { userId, productId } = req.body;

                let cart = await Cart.findOne({ userId });
                if (!cart) return res.status(404).json({ message: "Cart not found" });

                cart.products = cart.products.filter((p) => p.product.toString() !== productId);
                await cart.save();

                res.json({ message: "Removed from cart", cart });
        } catch (error) {
                res.status(500).json({ message: "Server error", error });
        }
};


export const clearUserCart = async (req, res) => {
        try {
                const { userId } = req.params;
                console.log("🛒 Clearing cart for user:", userId);

                if (!mongoose.Types.ObjectId.isValid(userId)) {
                        console.error("❌ Invalid User ID:", userId);
                        return res.status(400).json({ message: "Invalid User ID format" });
                }

                // Correct field name from `user` to `userId`
                const cartExists = await Cart.findOne({ userId: new mongoose.Types.ObjectId(userId) });
                if (!cartExists) {
                        console.warn("⚠️ No cart found for user:", userId);
                        return res.status(404).json({ message: "Cart does not exist for this user" });
                }

                // Delete the cart for the user
                const result = await Cart.deleteOne({ userId: new mongoose.Types.ObjectId(userId) });

                console.log(`✅ Cart cleared! Deleted ${result.deletedCount} items.`);
                return res.status(200).json({ message: "Cart cleared successfully", deletedCount: result.deletedCount });

        } catch (error) {
                console.error("❌ Error clearing cart:", error.stack || error);
                return res.status(500).json({ message: "Error clearing cart", error: error.message || error });
        }
};
