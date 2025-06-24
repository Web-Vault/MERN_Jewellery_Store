import express from "express";
import {
        getCollections,
        getProductFromCollectionsAndAddToCart,
        getProductFromCollectionsAndAddToWishList
} from "../controllers/collectionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getCollections);
router.post("/cart", protect, getProductFromCollectionsAndAddToCart);
router.post("/wishlist", protect, getProductFromCollectionsAndAddToWishList);

export default router;
