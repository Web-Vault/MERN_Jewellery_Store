import express from "express";
import { postReview, getReviewsByProduct, getReviewsByUser, approveReview, getAllReviews, rejectReview } from "../controllers/reviewController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, postReview); // ✅ Ensure protect middleware is applied
router.get("/product/:productId", getReviewsByProduct);
router.get("/user/:userId", protect, getReviewsByUser);
router.put("/:id/approve", protect, admin, approveReview);

router.get("/", protect, admin, getAllReviews);
router.put("/:id/reject", protect, admin, rejectReview); // ✅ Reject review

export default router;
