import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { X, ShoppingCart, Eye, Star, Share2, Printer, Gift, HeartOff } from 'lucide-react'

const Wishlist = () => {
        const [wishlist, setWishlist] = useState([]);
        const [loading, setLoading] = useState(true);
        const [message, setMessage] = useState("");
        const navigate = useNavigate();

        useEffect(() => {
                const fetchWishlist = async () => {
                        try {
                                const token = localStorage.getItem("userToken");
                                if (!token) {
                                        alert("Please log in to view your wishlist.");
                                        return;
                                }

                                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/wishlist`, {
                                        headers: { Authorization: `Bearer ${token}` },
                                });

                                setWishlist(data.wishlist?.products || []);
                        } catch (error) {
                                setMessage(error.response?.data?.message || "Failed to fetch wishlist.");
                        } finally {
                                setLoading(false);
                        }
                };
                fetchWishlist();
        }, []);

        const removeFromWishlist = async (productId) => {
                try {
                        const token = localStorage.getItem("userToken");
                        await axios.delete(`${process.env.REACT_APP_API_URL}/api/wishlist/remove/${productId}`, {
                                headers: { Authorization: `Bearer ${token}` },
                        });

                        setWishlist(wishlist.filter((item) => item._id !== productId));
                        setMessage("❌ Removed from wishlist.");
                } catch (error) {
                        setMessage(error.response?.data?.message || "Failed to remove item from wishlist.");
                }
                hideMessage(); // Auto-hide message after 3 seconds
        };

        const addToCart = async (productId) => {
                try {
                        const token = localStorage.getItem("userToken");
                        const userId = localStorage.getItem("userId");

                        if (!userId || !productId) {
                                setMessage("⚠️ Missing userId or productId.");
                                console.error("🚨 Missing values:", { userId, productId });
                                hideMessage();
                                return;
                        }

                        console.log("📤 Sending request to add product to cart:", { userId, productId });

                        await axios.post(
                                `${process.env.REACT_APP_API_URL}/api/cart/add`,
                                { userId, productId },
                                { headers: { Authorization: `Bearer ${token}` } }
                        );

                        setMessage("✅ Product added to cart successfully!");
                } catch (error) {
                        setMessage(error.response?.data?.message || "❌ Failed to add product to cart.");
                        console.error("❌ Error adding to cart:", error);
                }
                hideMessage(); // Auto-hide message after 3 seconds
        };

        // Function to auto-hide message after 3 seconds
        const hideMessage = () => {
                setTimeout(() => {
                        setMessage("");
                }, 3000);
        };



        if (loading) return <div className="text-center text-gray-600 py-10">Loading wishlist...</div>;

        return (
                <div className="min-h-screen bg-[#FAF6F0] relative mt-[60px] overflow-hidden">
                        {/* Decorative Elements */}
                        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-[#B76E79]/5 to-transparent -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-tl from-[#C5A880]/5 to-transparent translate-x-1/2 translate-y-1/2 rounded-full blur-3xl" />

                        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
                                {/* Header Section */}
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
                                        <div className="space-y-4">
                                                <h1 className="text-4xl font-serif text-[#6B4E4D]">
                                                        <span className="block text-[#B76E79] text-sm uppercase tracking-widest mb-2">Curated Collection</span>
                                                        Your Private Selection
                                                </h1>
                                                <p className="text-[#6B4E4D]/80 max-w-xl">
                                                        A carefully curated assemblage of pieces that caught your discerning eye
                                                </p>
                                        </div>
                                        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-[#E0D6CC]">
                                                <dl className="grid grid-cols-2 gap-4">
                                                        <div>
                                                                <dt className="text-sm text-[#6B4E4D]/80">Total Items</dt>
                                                                <dd className="text-2xl font-serif text-[#B76E79]">{wishlist.length}</dd>
                                                        </div>
                                                        <div>
                                                                <dt className="text-sm text-[#6B4E4D]/80">Estimated Value</dt>
                                                                <dd className="text-2xl font-serif text-[#B76E79]">
                                                                        ${wishlist.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                                                                </dd>
                                                        </div>
                                                </dl>
                                        </div>
                                </div>

                                {/* Main Content Area */}
                                <div className="grid lg:grid-cols-[1fr_400px] gap-12">
                                        {/* Wishlist Items */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-min">
                                                {wishlist.map((item) => (
                                                        <div key={item._id} className="group relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl border border-[#E0D6CC] transition-all">
                                                                {/* Image Container */}
                                                                <div className="relative aspect-square overflow-hidden rounded-t-2xl">
                                                                        <div className="absolute inset-0 bg-gradient-to-t from-[#6B4E4D]/30 to-transparent z-10" />
                                                                        <img
                                                                                src={item.images[0]}
                                                                                alt={item.name}
                                                                                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                                                                        />
                                                                </div>

                                                                {/* Content Panel */}
                                                                <div className="p-6 space-y-4">
                                                                        <div className="flex justify-between items-start">
                                                                                <h3 className="text-xl font-serif text-[#6B4E4D]">{item.name}</h3>
                                                                                <button
                                                                                        onClick={() => removeFromWishlist(item._id)}
                                                                                        className="text-[#B76E79] hover:text-[#C5A880] transition-colors"
                                                                                >
                                                                                        <X className="w-5 h-5" />
                                                                                </button>
                                                                        </div>

                                                                        <div className="flex items-center justify-between">
                                                                                <span className="text-lg font-medium text-[#B76E79]">${item.price.toFixed(2)}</span>
                                                                                <div className="flex items-center gap-1">
                                                                                        {[...Array(5)].map((_, i) => (
                                                                                                <Star
                                                                                                        key={i}
                                                                                                        className={`w-4 h-4 ${i < item.rating ? 'text-[#C5A880] fill-current' : 'text-[#E0D6CC]'}`}
                                                                                                />
                                                                                        ))}
                                                                                </div>
                                                                        </div>

                                                                        {/* Action Bar */}
                                                                        <div className="flex gap-3 border-t border-[#E0D6CC] pt-4">
                                                                                <button
                                                                                        onClick={() => addToCart(item._id)}
                                                                                        className="flex-1 flex items-center justify-center gap-2 bg-[#B76E79]/10 text-[#B76E79] hover:bg-[#B76E79] hover:text-white py-2 rounded-lg transition-all"
                                                                                >
                                                                                        <ShoppingCart className="w-4 h-4" />
                                                                                        <span className="text-sm">Add to Cart</span>
                                                                                </button>
                                                                                <button
                                                                                        onClick={() => navigate(`/product/${item._id}`)}
                                                                                        className="flex-1 flex items-center justify-center gap-2 bg-[#B76E79]/10 text-[#B76E79] hover:bg-[#B76E79] hover:text-white py-2 rounded-lg transition-all"
                                                                                >
                                                                                        <Eye className="w-4 h-4" />
                                                                                        <span className="text-sm">Details</span>
                                                                                </button>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                ))}
                                        </div>

                                        {/* Sidebar */}
                                        <div className="bg-white/90 backdrop-blur-sm h-fit p-8 rounded-2xl shadow-lg border border-[#E0D6CC] space-y-8">
                                                <div>
                                                        <h3 className="font-serif text-[#6B4E4D] text-xl mb-4">Collection Insights</h3>
                                                        <div className="space-y-4">
                                                                <div className="flex items-center justify-between text-[#6B4E4D]/80">
                                                                        <span>Most Added Category</span>
                                                                        <span className="font-medium text-[#B76E79]">Rings</span>
                                                                </div>
                                                        </div>
                                                </div>

                                                <div className="pt-6 border-t border-[#E0D6CC]">
                                                        <h3 className="font-serif text-[#6B4E4D] text-xl mb-4">Quick Actions</h3>
                                                        <div className="space-y-3">
                                                                <button className="w-full flex items-center gap-3 text-[#6B4E4D] hover:text-[#B76E79] p-3 rounded-lg hover:bg-[#B76E79]/5 transition-colors">
                                                                        <Share2 className="w-5 h-5" />
                                                                        Share Collection
                                                                </button>
                                                                {/* <button className="w-full flex items-center gap-3 text-[#6B4E4D] hover:text-[#B76E79] p-3 rounded-lg hover:bg-[#B76E79]/5 transition-colors">
                                                                        <Printer className="w-5 h-5" />
                                                                        Print Summary
                                                                </button> */}
                                                                <button className="w-full flex items-center gap-3 text-[#6B4E4D] hover:text-[#B76E79] p-3 rounded-lg hover:bg-[#B76E79]/5 transition-colors">
                                                                        <Gift className="w-5 h-5" />
                                                                        Create Gift List
                                                                </button>
                                                        </div>
                                                </div>
                                        </div>
                                </div>

                                {/* Empty State */}
                                {!wishlist.length && (
                                        <div className="text-center py-20 space-y-6">
                                                <div className="inline-block p-6 bg-[#B76E79]/10 rounded-full">
                                                        <HeartOff className="w-12 h-12 text-[#B76E79]" />
                                                </div>
                                                <h2 className="text-2xl font-serif text-[#6B4E4D]">Your Curated Gallery Awaits</h2>
                                                <p className="text-[#6B4E4D]/80 max-w-xl mx-auto">
                                                        Begin your collection of exceptional pieces - items you love will appear here for easy access and future consideration.
                                                </p>
                                                <button
                                                        onClick={() => navigate('/products')}
                                                        className="mt-6 px-6 py-3 bg-gradient-to-br from-[#B76E79] to-[#C5A880] text-white rounded-xl hover:shadow-lg transition-all"
                                                >
                                                        Explore New Arrivals
                                                </button>
                                        </div>
                                )}
                        </div>
                </div>
        );
};

export default Wishlist;
