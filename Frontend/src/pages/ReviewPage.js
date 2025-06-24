import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Edit3, Star, MessageSquare, ArrowLeft, Send, CheckCircle, AlertCircle, PackageOpen } from 'lucide-react';

const ReviewPage = () => {
        const location = useLocation();
        const navigate = useNavigate();
        const [message, setMessage] = useState("");
        const [error, setError] = useState("");
        const order = location.state?.order;

        const [reviews, setReviews] = useState([]);

        console.log("order items", order);


        useEffect(() => {
                if (order?.items) {
                        setReviews(
                                order.items.map((item) => ({
                                        product: item.product, // ✅ Corrected: Use item's _id, not order._id
                                        order: order._id,  // ✅ Added order ID for validation
                                        rating: 0,
                                        user: order.user,
                                        comment: "",
                                }))
                        );
                }
        }, [order]);


        if (!order) {
                return <p className="text-center text-red-500">No order found.</p>;
        }

        const handleReviewChange = (index, field, value) => {
                const newReviews = [...reviews];
                newReviews[index][field] = value;
                setReviews(newReviews);
        };

        const submitReview = async () => {
                const token = localStorage.getItem("userToken");
                console.log("🟢 User Token:", token);

                if (!token) {
                        alert("❌ Authentication required. Please log in.");
                        return;
                }

                const formattedReviews = reviews.map(review => ({
                        ...review,
                        order: order._id
                }));

                try {
                        console.log("🟢 Submitting Reviews:", formattedReviews);

                        const response = await axios.post(
                                `${process.env.REACT_APP_API_URL}/api/reviews`,
                                { reviews: formattedReviews },
                                {
                                        headers: {
                                                "Content-Type": "application/json",
                                                Authorization: `Bearer ${token}`,
                                        },
                                }
                        );

                        if (response.status === 201 || response.status === 200) {
                                alert("✅ Reviews submitted successfully!");
                                navigate(-1);
                        }
                } catch (error) {
                        console.error("❌ Error submitting reviews:", error);
                        const errorMessage = error.response?.data?.message || "Failed to submit reviews. Please try again.";
                        alert(errorMessage);
                }
        };


        return (
                <div className="max-w-4xl mt-[110px] mx-auto bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-[#E0D6CC]">
                        {/* Header Section */}
                        <div className="text-center mb-8">
                                <div className="inline-block p-4 bg-[#B76E79]/10 rounded-full mb-4">
                                        <Edit3 className="w-8 h-8 text-[#B76E79]" />
                                </div>
                                <h2 className="text-3xl font-serif text-[#6B4E4D] mb-2">Share Your Experience</h2>
                                <p className="text-[#6B4E4D]/80">We value your feedback on our jewelry pieces</p>
                        </div>

                        {reviews.length > 0 ? (
                                order.items.map((item, index) => (
                                        <div key={item._id} className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-sm mb-6 border border-[#E0D6CC]">
                                                {/* Product Info */}
                                                <div className="flex items-center gap-6 mb-6">
                                                        <div className="relative w-24 h-24 flex-shrink-0">
                                                                <img
                                                                        src={item.image || "https://via.placeholder.com/100"}
                                                                        alt={item.name}
                                                                        className="w-full h-full object-cover rounded-lg border-2 border-[#E0D6CC]"
                                                                />
                                                                <div className="absolute -inset-2 bg-gradient-to-br from-[#B76E79]/10 to-transparent rounded-lg" />
                                                        </div>
                                                        <h3 className="text-xl font-serif text-[#6B4E4D]">{item.name}</h3>
                                                </div>

                                                {/* Review Form */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        {/* Rating Section */}
                                                        <div className="space-y-2">
                                                                <label className="flex items-center gap-2 text-[#6B4E4D] font-medium">
                                                                        <Star className="w-5 h-5 text-[#C5A880]" />
                                                                        Rating:
                                                                </label>
                                                                <select
                                                                        value={reviews[index]?.rating}
                                                                        onChange={(e) => handleReviewChange(index, "rating", Number(e.target.value))}
                                                                        className="w-full px-4 py-3 bg-white border-2 border-[#E0D6CC] rounded-lg focus:border-[#B76E79]/40 focus:ring-0 appearance-none"
                                                                >
                                                                        <option value="0">Select Rating</option>
                                                                        {[1, 2, 3, 4, 5].map((num) => (
                                                                                <option key={num} value={num}>
                                                                                        {num} Star{num !== 1 && 's'}
                                                                                </option>
                                                                        ))}
                                                                </select>
                                                        </div>

                                                        {/* Comment Section */}
                                                        <div className="space-y-2">
                                                                <label className="flex items-center gap-2 text-[#6B4E4D] font-medium">
                                                                        <MessageSquare className="w-5 h-5 text-[#C5A880]" />
                                                                        Comment:
                                                                </label>
                                                                <textarea
                                                                        value={reviews[index]?.comment}
                                                                        onChange={(e) => handleReviewChange(index, "comment", e.target.value)}
                                                                        className="w-full px-4 py-3 bg-white border-2 border-[#E0D6CC] rounded-lg focus:border-[#B76E79]/40 focus:ring-0 h-32"
                                                                        placeholder="Share your thoughts..."
                                                                />
                                                        </div>
                                                </div>
                                        </div>
                                ))
                        ) : (
                                <div className="text-center py-12">
                                        <PackageOpen className="w-12 h-12 text-[#B76E79] mx-auto mb-4" />
                                        <p className="text-[#6B4E4D]/80">No items available for review</p>
                                </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8 pt-6 border-t border-[#E0D6CC]">
                                <button
                                        onClick={() => navigate(-1)}
                                        className="px-6 py-3 bg-[#6B4E4D]/10 text-[#6B4E4D] rounded-lg hover:bg-[#6B4E4D]/20 transition-colors flex items-center gap-2"
                                >
                                        <ArrowLeft className="w-5 h-5" />
                                        Back to Previous
                                </button>

                                <button
                                        onClick={submitReview}
                                        className="px-6 py-3 bg-gradient-to-br from-[#B76E79] to-[#C5A880] text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
                                >
                                        <Send className="w-5 h-5" />
                                        Submit Reviews
                                </button>
                        </div>
                        
                        {/* Status Messages */}
                        {message && (
                                <div className="mt-6 p-3 bg-emerald-100 text-emerald-700 rounded-lg flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5" />
                                        {message}
                                </div>
                        )}
                        {error && (
                                <div className="mt-6 p-3 bg-red-100 text-red-700 rounded-lg flex items-center gap-2">
                                        <AlertCircle className="w-5 h-5" />
                                        {error}
                                </div>
                        )}
                </div>
        );
};

export default ReviewPage;
