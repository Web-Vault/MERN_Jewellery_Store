import Cart from "../models/cart.js";
import Wishlist from "../models/wishlist.js";
import Order from "../models/orders.js";

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("user", "name email");
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Fetch a user's cart
export const getUserCart = async (req, res) => {
        try {
                const { userId } = req.params;
                const cart = await Cart.findOne({ user: userId }).populate("items.product");

                if (!cart) {
                        return res.status(404).json({ message: "Cart not found" });
                }

                res.json(cart);
        } catch (error) {
                res.status(500).json({ message: "Server error", error });
        }
};

export const getAllProducts = async (req, res) => {
        try {
                const products = await Product.find({});
                res.json(products);
        } catch (error) {
                res.status(500).json({ message: "Server error", error });
        }
};

// Fetch a user's wishlist
export const getUserWishlist = async (req, res) => {
        try {
                const userId = req.params.userId;

                const wishlist = await Wishlist.findOne({ userId }).populate("products");

                if (!wishlist) {
                        return res.status(200).json({ message: "No wishlist found", wishlist: { products: [] } });
                }

                res.status(200).json({ wishlist });
        } catch (error) {
                res.status(500).json({ message: "Error fetching wishlist", error });
        }
};

