import mongoose from "mongoose";
import Review from "../models/review.js";
import Order from "../models/orders.js";

export const postReview = async (req, res) => {
        try {
                console.log("🟢 Received Review Data:", req.body);
                const reviews = req.body.reviews;
                const userId = req.user._id;

                console.log("received reviews :", reviews);

                if (!Array.isArray(reviews) || reviews.length === 0) {
                        return res.status(400).json({ message: "❌ Invalid reviews data." });
                }

                console.log("🔹 Fetching Order:", reviews[0].order);

                const order = await Order.findOne({
                        _id: reviews[0].order,
                        user: userId,
                        orderStatus: "Confirmed",
                }).populate("items.product"); // ✅ Ensures products are populated correctly

                if (!order) {
                        console.warn("❌ Order not found or not eligible for reviews");
                        return res.status(403).json({ message: "Order not found or not eligible for reviews" });
                }

                // Debug: Check if products are populated
                console.log("✅ Order Items After Populate:", order.items);


                const validReviews = await Promise.all(
                        reviews.map(async (review) => {
                                console.log("🔹 Checking Review for Product:", review.product);

                                const orderItem = order.items.find(
                                        (item) => item.product && item.product._id.toString() === review.product.toString()
                                );


                                // if (!orderItem) {
                                //         console.log("❌ Product not found in order or not populated:", review.product);
                                //         return null;
                                // }

                                const exists = await Review.findOne({
                                        user: userId,
                                        product: review.product,
                                        order: review.order,
                                });

                                if (exists) {
                                        console.log("❌ Review already exists for:", review.product);
                                        return null;
                                }


                                console.log("✅ Review is valid:", review);
                                return review;
                        })
                );

                const filteredReviews = validReviews.filter((review) => review !== null);

                if (filteredReviews.length === 0) {
                        console.warn("❌ All reviews were filtered out. Check logs above.");
                        return res.status(400).json({ message: "No valid reviews to submit" });
                }


                console.log("✅ Saving Reviews:", filteredReviews);

                const reviewDocs = filteredReviews.map((review) => ({
                        user: userId,
                        product: review.product,
                        order: review.order,
                        rating: review.rating,
                        comment: review.comment,
                        status: "approved",
                }));

                const savedReviews = await Review.insertMany(reviewDocs);

                res.status(201).json({
                        message: "✅ Reviews submitted successfully!",
                        reviews: savedReviews,
                });
        } catch (error) {
                console.error("❌ Error saving reviews:", error);
                res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
};

const calculateAverageRating = async (productId) => {
        const result = await Review.aggregate([
                {
                        $match: {
                                product: mongoose.Types.ObjectId(productId),
                                status: "approved"
                        }
                },
                {
                        $group: {
                                _id: "$product",
                                averageRating: { $avg: "$rating" },
                                reviewCount: { $sum: 1 }
                        }
                }
        ]);

        if (result.length > 0) {
                await mongoose.model("Product").findByIdAndUpdate(productId, {
                        averageRating: result[0].averageRating.toFixed(1),
                        reviewCount: result[0].reviewCount
                });
        }
};


// ✅ Get Reviews by Product (Only approved ones)
export const getReviewsByProduct = async (req, res) => {
        try {
                const { productId } = req.params;

                const reviews = await Review.find({ product: productId, status: "approved" })
                        .populate("user", "name") // Include user details
                        .sort("-createdAt");

                res.json(reviews);
        } catch (error) {
                res.status(500).json({ message: error.message });
        }
};

// ✅ Get Reviews by User
export const getReviewsByUser = async (req, res) => {
        try {
                if (req.user._id.toString() !== req.params.userId) {
                        return res.status(403).json({ message: "Unauthorized" });
                }

                const reviews = await Review.find({ user: req.params.userId }).sort("-createdAt");
                res.json(reviews);
        } catch (error) {
                res.status(500).json({ message: error.message });
        }
};

// ✅ Approve a Review (Admin Only)
export const approveReview = async (req, res) => {
        try {
                const review = await Review.findById(req.params.id);

                if (!review) {
                        return res.status(404).json({ message: "Review not found." });
                }

                review.status = "approved";
                await review.save();

                res.json({ message: "Review approved successfully!" });
        } catch (error) {
                res.status(500).json({ message: error.message });
        }
};

export const getAllReviews = async (req, res) => {
        try {
                const reviews = await Review.find()
                        .populate("user", "name")
                        .populate("product", "name")
                        .sort("-createdAt");

                res.json(reviews);
        } catch (error) {
                res.status(500).json({ message: error.message });
        }
};

export const rejectReview = async (req, res) => {
        try {
                const review = await Review.findById(req.params.id);

                if (!review) {
                        return res.status(404).json({ message: "Review not found." });
                }

                review.status = "rejected";
                await review.save();

                res.json({ message: "Review rejected successfully!" });
        } catch (error) {
                res.status(500).json({ message: error.message });
        }
};
