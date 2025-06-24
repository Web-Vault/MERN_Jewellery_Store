import express from 'express';
import Product from '../models/products.js';

import {
        createProduct,
        getAllProducts,
        updateProduct,
        deleteProduct,
        getProductsByCategory,
        searchProducts
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js"; // Assuming authentication middleware

const router = express.Router();

// Routes
router.post("/admin", protect, admin, createProduct);
router.get("/", getAllProducts); // Get all products

router.get('/:id', async (req, res) => {
        try {
                const product = await Product.findById(req.params.id);
                if (!product) {
                        return res.status(404).json({ message: "Product not found" });
                }
                res.json(product);
        } catch (error) {
                res.status(500).json({ message: "Server Error" });
        }
});

router.get('/random', async (req, res) => {
        try {
                let cachedProducts = productCache.get("randomProducts");

                if (!cachedProducts) {
                        console.log("⏳ Fetching new random products...");
                        cachedProducts = await Product.aggregate([{ $sample: { size: 4 } }]);
                        productCache.set("randomProducts", cachedProducts);
                } else {
                        console.log("⚡ Serving from cache...");
                }

                res.json(cachedProducts);
        } catch (error) {
                console.error("🔥 [ERROR] Fetching random products:", error);
                res.status(500).json({ message: "Server Error" });
        }
});


router.get('/search/:q', searchProducts);


router.put("/:id", protect, admin, updateProduct); // Admin updates a product
router.delete("/:id", protect, admin, deleteProduct); // Admin deletes a product
router.get("/category/:categoryId", getProductsByCategory); // Get products by category

export default router;

