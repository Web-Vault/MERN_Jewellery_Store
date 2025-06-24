import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
        ShoppingCart,
        Heart,
        CheckCircle,
        Star,
        Gem,
        User,
        PenTool,
        ScrollText,
        Sparkle,
        ThumbsUp,
        MessageCircle,
} from 'lucide-react';
import RecommendedProducts from "../components/RecommendedProducts";

const SingleProduct = () => {
        const { id } = useParams(); // Extract product ID from URL
        const [product, setProduct] = useState(null);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
        const [message, setMessage] = useState(""); // State for feedback messages
        const [reviews, setReviews] = useState([]);

        // temporary
        // const reviews = [
        //         {
        //                 id: 1,
        //                 user: "John Doe",
        //                 rating: 5,
        //                 comment: "Amazing product! Totally worth the price.",
        //                 date: "2024-03-07",
        //         },
        //         {
        //                 id: 2,
        //                 user: "Jane Smith",
        //                 rating: 4,
        //                 comment: "Great quality, but the delivery took longer than expected.",
        //                 date: "2024-03-06",
        //         },
        //         {
        //                 id: 3,
        //                 user: "David Johnson",
        //                 rating: 3,
        //                 comment: "Good, but expected better packaging.",
        //                 date: "2024-03-05",
        //         },
        // ];


        // Fetch product data from the backend using fetch
        useEffect(() => {
                const fetchProduct = async () => {
                        console.log("Fetched ID:", id); // Log the ID to ensure it's correct

                        try {
                                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/${id}`);
                                const data = await response.json(); // Parse the JSON data

                                console.log("Fetched Product Data:", data); // Log the fetched data

                                if (data) {
                                        setProduct(data);
                                        setLoading(false);
                                } else {
                                        setError(data.message || "Product not found");
                                        setLoading(false);
                                }
                        } catch (err) {
                                console.error("Error fetching product:", err); // Log any error
                                setError("Product not found or server error");
                                setLoading(false);
                        } finally {
                                setLoading(false);
                        }
                };

                const fetchReviews = async () => {
                        try {
                                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/reviews/product/${id}`);
                                setReviews(response.data);
                                console.log("data before setting review: ", response.data);
                        } catch (err) {
                                setError(err.response?.data?.message || "Error fetching reviews.");
                        }
                };

                fetchProduct();
                fetchReviews();
        }, [id]);

        // Function to add product to cart
        const handleAddToCart = async () => {
                const userId = localStorage.getItem("userId");
                const token = localStorage.getItem("userToken");

                if (!userId || !token) {
                        setMessage("⚠️ Please log in to add items to the cart.");
                        hideMessage();
                        return;
                }

                console.log("Sending request to add product:", { userId, productId: id });

                try {
                        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/cart/add`, {
                                method: "POST",
                                headers: {
                                        "Content-Type": "application/json",
                                        Authorization: `Bearer ${token}`,
                                },
                                body: JSON.stringify({ userId, productId: id }),
                        });

                        const data = await response.json();
                        console.log("Response from server:", data);

                        if (response.ok) {
                                setMessage("✅ Added to cart successfully!");
                        } else {
                                setMessage(`❌ ${data.message || "Error adding to cart"}`);
                        }
                } catch (error) {
                        console.error("Error adding to cart:", error);
                        setMessage("❌ Server error while adding to cart.");
                }

                hideMessage();
        };

        const handleAddToWishlist = async () => {
                const token = localStorage.getItem("userToken");

                if (!token) {
                        setMessage("⚠️ Please log in to add items to your wishlist.");
                        hideMessage();
                        return;
                }

                try {
                        const response = await axios.post(
                                `${process.env.REACT_APP_API_URL}/api/wishlist/add/${id}`,
                                {},
                                {
                                        headers: { Authorization: `Bearer ${token}` },
                                }
                        );

                        console.log("Wishlist response:", response.data);
                        setMessage("❤️ Added to wishlist!");
                } catch (error) {
                        setMessage(`❌ ${error.response?.data?.message || "Failed to add to wishlist."}`);
                }

                hideMessage();
        };

        // Function to hide message after 3 seconds
        const hideMessage = () => {
                setTimeout(() => {
                        setMessage("");
                }, 3000);
        };

        console.log("product reviews: ", reviews);

        const products = [
                { id: 1, name: "Product 1", price: "$99.99", image: "/product_images/product-1.webp" },
                { id: 2, name: "Product 2", price: "$109.99", image: "/product_images/product-2.webp" },
                { id: 3, name: "Product 3", price: "$89.99", image: "/product_images/product-3.webp" },
                { id: 4, name: "Product 4", price: "$79.99", image: "/product_images/product-4.webp" },
        ];


        if (loading) return <div className="text-center py-10">Loading...</div>;
        if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

        return (
                <div className="relative min-h-screen bg-[#FAF6F0] overflow-hidden mt-[60px] px-6 py-12">
                        {/* Product Main Section */}
                        {product && (
                                <div className="max-w-7xl mx-auto bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row gap-12 p-8 border border-[#E0D6CC]">
                                        {/* Product Image Section */}
                                        <div className="lg:w-1/2 relative group">
                                                <div className="absolute inset-0 bg-gradient-to-br from-[#B76E79]/10 to-[#C5A880]/10 rounded-3xl blur-xl"></div>
                                                <img
                                                        src={product.images[0]}
                                                        alt={product.name}
                                                        className="w-full h-[600px] object-contain transform group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute top-6 left-6 bg-[#B76E79]/90 text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm">
                                                        Luxury Collection
                                                </div>
                                        </div>

                                        {/* Product Details Section */}
                                        <div className="lg:w-1/2 flex flex-col justify-between space-y-8">
                                                <div className="space-y-6">
                                                        <h2 className="text-4xl font-serif text-[#6B4E4D] tracking-tight">{product.name}</h2>

                                                        {/* Product Description Section */}
                                                        <div className="space-y-4">
                                                                <h3 className="text-xl font-medium text-[#B76E79] border-b border-[#E0D6CC] pb-2">
                                                                        <ScrollText className="w-5 h-5 inline-block mr-2" />
                                                                        Product Story
                                                                </h3>
                                                                <p className="text-lg text-[#6B4E4D]/80 leading-relaxed">
                                                                        {product.description}
                                                                </p>
                                                        </div>

                                                        {/* Price & Rating */}
                                                        <div className="flex flex-col items-left gap-4">
                                                                <span className="text-4xl font-bold text-[#B76E79]">${product.price}</span>

                                                                <div className="space-y-6 mt-8">

    {/* Highlighted Attributes in Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {product.metal && (
            <div className="bg-[#F5EFE8] p-4 rounded-xl shadow-sm border border-[#E0D6CC] text-center">
                <p className="text-sm text-[#9D8B7B] uppercase tracking-wide">Crafting material</p>
                <p className="text-lg font-semibold text-[#6B4E4D]">{product.metal}</p>
            </div>
        )}
        {product.occasion?.length > 0 && (
            <div className="bg-[#F5EFE8] p-4 rounded-xl shadow-sm border border-[#E0D6CC] text-center">
                <p className="text-sm text-[#9D8B7B] uppercase tracking-wide">Occasions</p>
                <p className="text-lg font-semibold text-[#6B4E4D]">{product.occasion.join(", ")}</p>
            </div>
        )}
        {product.gender && (
            <div className="bg-[#F5EFE8] p-4 rounded-xl shadow-sm border border-[#E0D6CC] text-center">
                <p className="text-sm text-[#9D8B7B] uppercase tracking-wide">Specially for</p>
                <p className="text-lg font-semibold text-[#6B4E4D]">{product.gender}</p>
            </div>
        )}
    </div>

    {/* Tags Cloud */}
    {product.tags?.length > 0 && (
        <div>
            <h4 className="text-sm text-[#B76E79] font-medium uppercase mb-2">Tags</h4>
            <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, i) => (
                    <span
                        key={i}
                        className="bg-[#FFF9F5] border border-[#E0D6CC] text-[#6B4E4D] px-4 py-1 rounded-full text-sm hover:bg-[#FAF2EB]"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    )}
</div>

                                                        </div>
                                                </div>


                                                {/* Action Buttons */}
                                                <div className="flex flex-col sm:flex-row gap-4">
                                                        <button
                                                                onClick={handleAddToCart}
                                                                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-br from-[#B76E79] to-[#C5A880] text-white py-4 px-8 rounded-xl hover:shadow-lg transition-all"
                                                        >
                                                                <ShoppingCart className="w-5 h-5" />
                                                                Add to Cart
                                                        </button>
                                                        <button
                                                                onClick={handleAddToWishlist}
                                                                className="flex-1 flex items-center justify-center gap-2 border-2 border-[#B76E79] text-[#B76E79] py-4 px-8 rounded-xl hover:bg-[#B76E79]/10 transition-colors"
                                                        >
                                                                <Heart className="w-5 h-5" />
                                                                Wishlist
                                                        </button>
                                                </div>
                                                {message && (
                                                        <div className="mt-4 p-3 bg-emerald-100 text-emerald-700 rounded-lg flex items-center gap-2">
                                                                <CheckCircle className="w-5 h-5" />
                                                                {message}
                                                        </div>
                                                )}
                                        </div>
                                </div>
                        )}

                        {/* Category Description */}
                        <div className="max-w-7xl mx-auto mt-12 bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-[#E0D6CC]">
                                <div className="flex items-center gap-4 mb-6">
                                        <Gem className="w-8 h-8 text-[#B76E79]" />
                                        <h3 className="text-2xl font-serif text-[#6B4E4D]">Collection Story</h3>
                                </div>
                                <p className="text-[#6B4E4D]/80 leading-relaxed">
                                        Crafted with precision and passion, our Luxury Collection embodies timeless elegance. Each piece is
                                        meticulously designed by master artisans using ethically sourced materials, blending traditional
                                        craftsmanship with modern sophistication.
                                </p>
                        </div>

                        {/* Product Reviews */}
                        <div className="max-w-7xl mx-auto mt-12 bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-[#E0D6CC]">
                                <div className="flex flex-col md:flex-row justify-between items-start mb-8">
                                        <h2 className="text-2xl font-serif text-[#6B4E4D] mb-4 md:mb-0">Client Testimonials</h2>
                                        <div className="text-center md:text-right">
                                                {/* <div className="text-3xl font-bold text-[#B76E79]">{product.rating?.toFixed(1) || 0}</div> */}
                                                <p className="text-[#6B4E4D]/80">{product.numReviews} Verified Reviews</p>
                                        </div>
                                </div>

                                {/* Rating Breakdown */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                                        {[5, 4, 3, 2, 1].map((star) => (
                                                <div key={star} className="flex items-center gap-4 group">
                                                        {/* Star Rating Label */}
                                                        <div className="flex items-center gap-2 w-28 min-w-[7rem]">
                                                                <span className="text-[#6B4E4D] font-medium text-sm w-4 text-center">
                                                                        {star}
                                                                </span>
                                                                <div className="relative">
                                                                        <Star className="w-5 h-5 text-[#C5A880]" />
                                                                        {star === 5 && (
                                                                                <Sparkle className="w-3 h-3 absolute -top-1 -right-1 text-[#D4AF37] animate-pulse" />
                                                                        )}
                                                                </div>
                                                                <span className="text-xs text-[#9D8B7B] ml-1">
                                                                        ({reviews.filter(r => r.rating === star).length})
                                                                </span>
                                                        </div>

                                                        {/* Progress Bar Container */}
                                                        <div className="flex-1 relative h-[14px] group-hover:h-4 transition-all duration-300 flex items-center gap-4">
                                                                {/* Track */}
                                                                <div className="relative flex-1 h-full">
                                                                        {/* Background Track */}
                                                                        <div className="absolute inset-0 bg-[#F5EFE8]/80 rounded-full overflow-hidden shadow-inner border border-[#F5EFE8]">
                                                                                {/* Progress Fill */}
                                                                                <div
                                                                                        className="h-full bg-gradient-to-r from-[#D8C4A8] via-[#C5A880] to-[#B76E79] rounded-full transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] relative overflow-hidden"
                                                                                        style={{
                                                                                                width: `${Math.max(2, (reviews.filter(r => r.rating === star).length / reviews.length) * 100)}%`,
                                                                                                boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3)'
                                                                                        }}
                                                                                >
                                                                                        {/* Shimmer Effect */}
                                                                                        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.3)_50%,transparent_100%)] opacity-50 animate-shimmer" />
                                                                                </div>
                                                                        </div>
                                                                </div>

                                                                {/* Percentage Indicator - Always Visible */}
                                                                <div className="w-10 text-right">
                                                                        <span className="text-xs font-medium text-[#6B4E4D] tabular-nums">
                                                                                {Math.round((reviews.filter(r => r.rating === star).length / reviews.length) * 100)}%
                                                                        </span>
                                                                </div>
                                                        </div>
                                                </div>
                                        ))}
                                </div>

                                {/* Reviews List */}
                                <div className="space-y-8">
                                        {reviews.length > 0 ? reviews.map((review) => (
                                                <div
                                                        key={review._id}
                                                        className="border-t border-[#E0D6CC] pt-8 pb-6 group hover:bg-[#fff8f5]/30 transition-all duration-300 px-4 -mx-4 rounded-lg"
                                                >
                                                        <div className="flex items-start gap-5">
                                                                {/* User Avatar with Animation */}
                                                                <div className="relative">
                                                                        <div className="w-14 h-14 rounded-full bg-[#B76E79]/10 flex items-center justify-center 
          border-2 border-[#F5EFE8] group-hover:border-[#B76E79]/30 transition-all duration-300 shadow-sm">
                                                                                <User className="w-7 h-7 text-[#B76E79] opacity-80 group-hover:opacity-100 transition-opacity" />
                                                                        </div>
                                                                        {review.rating === 5 && (
                                                                                <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-sm">
                                                                                        <Sparkle className="w-4 h-4 text-[#D4AF37] animate-pulse" />
                                                                                </div>
                                                                        )}
                                                                </div>

                                                                {/* Review Content */}
                                                                <div className="flex-1">
                                                                        <div className="flex flex-wrap items-center gap-3 mb-3">
                                                                                <h4 className="font-medium text-[#6B4E4D] text-lg group-hover:text-[#B76E79] transition-colors">
                                                                                        {review.name}
                                                                                </h4>

                                                                                {/* Rating Stars with Enhanced Styling */}
                                                                                <div className="flex items-center gap-1">
                                                                                        {[...Array(5)].map((_, i) => (
                                                                                                <Star
                                                                                                        key={i}
                                                                                                        className={`w-5 h-5 transition-all ${i < review.rating ?
                                                                                                                'text-[#C5A880] fill-current' :
                                                                                                                'text-[#E0D6CC]'}`}
                                                                                                />
                                                                                        ))}
                                                                                </div>

                                                                                {/* Review Date */}
                                                                                <span className="text-sm text-[#9D8B7B] ml-auto">
                                                                                        {new Date(review.createdAt).toLocaleDateString('en-US', {
                                                                                                year: 'numeric',
                                                                                                month: 'short',
                                                                                                day: 'numeric'
                                                                                        })}
                                                                                </span>
                                                                        </div>

                                                                        {/* Review Comment with Smooth Appearance */}
                                                                        <p className="text-[#6B4E4D]/90 leading-relaxed transition-all duration-300 
          group-hover:pl-2 border-l-2 border-transparent group-hover:border-[#B76E79]/30">
                                                                                {review.comment}
                                                                        </p>

                                                                        {/* Helpful Actions */}
                                                                        <div className="flex items-center gap-4 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                                <button className="text-sm text-[#9D8B7B] hover:text-[#B76E79] flex items-center gap-1">
                                                                                        <ThumbsUp className="w-4 h-4" />
                                                                                        Helpful
                                                                                </button>
                                                                                <button className="text-sm text-[#9D8B7B] hover:text-[#B76E79] flex items-center gap-1">
                                                                                        <MessageCircle className="w-4 h-4" />
                                                                                        Reply
                                                                                </button>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                        )) : (
                                                <div className="text-center py-12">
                                                        <PenTool className="w-12 h-12 text-[#B76E79] mx-auto mb-4" />
                                                        <p className="text-[#6B4E4D]/80">Be the first to share your experience</p>
                                                </div>
                                        )}
                                </div>
                        </div>

                        {/* Featured Collection */}
                        <div className="bg-[#faf8f5] py-20">
                                <div className="max-w-7xl mx-auto px-6">
                                        <h2 className="text-3xl font-serif text-[#6B4E4D] text-center mb-16">
                                                Our Curated Collections
                                        </h2>
                                        <div className="flex flex-col md:flex-row gap-12">
                                                {/* Grid Layout */}
                                                <RecommendedProducts />
                                        </div>
                                </div>
                        </div>
                </div>
        );

};

export default SingleProduct;


// 
