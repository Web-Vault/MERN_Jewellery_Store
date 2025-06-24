import Wishlist from "../models/wishlist.js";
import Product from "../models/products.js";

// Add product to wishlist
export const addToWishlist = async (req, res) => {
        try {
                const { productId } = req.params;
                const userId = req.user._id;

                console.log(`Adding product ${productId} to wishlist for user ${userId}`); // Debugging

                const product = await Product.findById(productId);
                if (!product) {
                        return res.status(404).json({ message: "Product not found" });
                }

                let wishlist = await Wishlist.findOne({ user: userId });

                if (!wishlist) {
                        wishlist = new Wishlist({ user: userId, products: [productId] });
                } else {
                        if (wishlist.products.includes(productId)) {
                                return res.status(400).json({ message: "Product already in wishlist" });
                        }
                        wishlist.products.push(productId);
                }

                await wishlist.save();
                res.status(200).json({ message: "Product added to wishlist", wishlist });
        } catch (error) {
                console.error("Error adding to wishlist:", error);
                res.status(500).json({ message: "Error adding to wishlist", error });
        }
};

// Fetch wishlist
export const getWishlist = async (req, res) => {
        try {
                const userId = req.user._id;
                console.log(`Fetching wishlist for user: ${userId}`);

                const wishlist = await Wishlist.findOne({ user: userId }).populate("products");

                if (!wishlist) {
                        return res.status(200).json({ message: "No wishlist found", wishlist: { products: [] } });
                }


                res.status(200).json({ wishlist });
        } catch (error) {
                console.error("Error fetching wishlist:", error);
                res.status(500).json({ message: "Error fetching wishlist", error });
        }
};

// Remove product from wishlist
export const removeFromWishlist = async (req, res) => {
        try {
                const { productId } = req.params;
                const userId = req.user._id;

                const wishlist = await Wishlist.findOne({ user: userId });

                if (!wishlist) {
                        return res.status(404).json({ message: "Wishlist not found" });
                }

                wishlist.products = wishlist.products.filter(
                        (product) => product.toString() !== productId
                );

                await wishlist.save();
                res.status(200).json({ message: "Product removed from wishlist", wishlist });
        } catch (error) {
                res.status(500).json({ message: "Error removing from wishlist", error });
        }
};

// Clear entire wishlist
export const clearWishlist = async (req, res) => {
        try {
                const userId = req.user._id;
                await Wishlist.findOneAndDelete({ user: userId });

                res.status(200).json({ message: "Wishlist cleared successfully" });
        } catch (error) {
                res.status(500).json({ message: "Error clearing wishlist", error });
        }
};
