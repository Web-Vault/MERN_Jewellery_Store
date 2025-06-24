import React, { useEffect, useState } from "react";
import axios from "axios";
import { ClipboardList, Loader2, AlertCircle, XCircle, RefreshCw, PackageOpen, Star } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {

        const [loading, setLoading] = useState(true);
        const [error, setError] = useState("");
        const navigate = useNavigate();


        // orders
        const [orders, setOrders] = useState([]);

        useEffect(() => {
                const fetchOrders = async () => {
                        try {
                                const token = localStorage.getItem("userToken");
                                if (!token) {
                                        setError("User not logged in");
                                        return;
                                }

                                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders/my-orders`, {
                                        headers: { Authorization: `Bearer ${token}` },
                                });

                                console.log("✅ Orders Fetched:", data);
                                setOrders(data);
                        } catch (error) {
                                console.error("❌ Error Fetching Orders:", error.response?.data || error.message);
                                setError("Failed to load orders.");
                        } finally {
                                setLoading(false);
                        }
                };

                fetchOrders();
        }, []);

        const cancelOrder = async (orderId) => {
                setOrders(
                        orders.map((order) =>
                                order._id === orderId ? { ...order, orderStatus: "Cancelled" } : order
                        )
                );
                alert("Order cancelled successfully!");
        };

        const returnOrder = async (orderId) => {
                setOrders(
                        orders.map((order) =>
                                order._id === orderId ? { ...order, orderStatus: "Returned" } : order
                        )
                );
                alert("Order return requested!");
        };

        const handleGoToReviewPage = (order) => {
                navigate("/review", { state: { order } }); // Pass order details as state
              };

        return (
                <div className="relative min-h-screen bg-[#FAF6F0] flex justify-center items-center mt-[10px] p-4 sm:p-8">

                        {/* Subtle Decorative Elements */}
                        <div className="absolute top-16 left-10 w-32 h-32 bg-[#B76E79]/10 rounded-full blur-lg"></div>
                        <div className="absolute bottom-20 right-16 w-40 h-40 bg-[#C5A880]/10 rounded-full blur-lg"></div>

                        {/* Order History Container */}
                        <div className="w-full max-w-5xl bg-white/90 backdrop-blur-sm mt-8 p-6 sm:p-8 rounded-3xl shadow-xl border border-[#E0D6CC]">

                                {/* Page Header */}
                                <div className="flex items-center gap-4 mb-8">
                                        <div className="p-3 bg-[#B76E79]/10 rounded-lg">
                                                <ClipboardList className="w-6 h-6 text-[#B76E79]" />
                                        </div>
                                        <h1 className="text-2xl sm:text-3xl font-serif text-[#6B4E4D]">Order History</h1>
                                </div>

                                {/* Content States */}
                                {loading ? (
                                        <div className="flex flex-col items-center py-12 space-y-4">
                                                <Loader2 className="w-8 h-8 text-[#B76E79] animate-spin" />
                                                <p className="text-[#6B4E4D]/80">Loading your orders...</p>
                                        </div>
                                ) : error ? (
                                        <div className="text-center py-12 space-y-4">
                                                <AlertCircle className="w-12 h-12 text-red-400 mx-auto" />
                                                <p className="text-red-500">{error}</p>
                                        </div>
                                ) : orders.length > 0 ? (
                                        <div className="space-y-6">
                                                {orders.map((order) => (
                                                        <div key={order._id} className="bg-white p-6 rounded-xl shadow-sm border border-[#E0D6CC] hover:shadow-md transition-all">

                                                                {/* Order Header */}
                                                                <div className="flex justify-between items-start mb-4">
                                                                        <div>
                                                                                <p className="text-sm text-[#6B4E4D]/80">
                                                                                        Order #{order._id.slice(-6).toUpperCase()}
                                                                                </p>
                                                                                <p className={`text-sm font-medium ${order.orderStatus === "Pending" ? "text-amber-500" :
                                                                                        order.orderStatus === "Confirmed" ? "text-emerald-500" :
                                                                                                "text-red-500"
                                                                                        }`}>
                                                                                        {order.orderStatus}
                                                                                </p>
                                                                        </div>
                                                                        <p className="text-lg font-serif text-[#6B4E4D]">
                                                                                ₹{order.totalAmount.toFixed(2)}
                                                                        </p>
                                                                </div>

                                                                {/* Product Preview */}
                                                                <div className="flex items-center gap-6 mb-6">
                                                                        <div className="relative flex -space-x-4">
                                                                                {order.items.slice(0, 3).map((item, index) => (
                                                                                        <div key={index} className="relative w-16 h-16 rounded-lg overflow-hidden border-2 border-white shadow-sm">
                                                                                                {/* <img
                                                                                                        src={item.images[0] || "https://via.placeholder.com/100"}
                                                                                                        alt={item.name}
                                                                                                        className="w-full h-full object-cover"
                                                                                                /> */}
                                                                                                {index === 2 && order.items.length > 3 && (
                                                                                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-sm">
                                                                                                                +{order.items.length - 3}
                                                                                                        </div>
                                                                                                )}
                                                                                        </div>
                                                                                ))}
                                                                        </div>
                                                                        <div className="flex-1">
                                                                                <h3 className="font-medium text-[#6B4E4D]">
                                                                                        {order.items.map(item => item.name).join(", ")}
                                                                                </h3>
                                                                        </div>
                                                                </div>

                                                                {/* Order Actions */}
                                                                <div className="flex flex-wrap gap-3 border-t border-[#E0D6CC] pt-4">
                                                                        {order.orderStatus === "Pending" && (
                                                                                <button
                                                                                        onClick={() => cancelOrder(order._id)}
                                                                                        className="flex items-center px-4 py-2 bg-red-500/10 text-red-600 rounded-lg hover:bg-red-500/20 transition"
                                                                                >
                                                                                        <XCircle className="w-5 h-5 mr-2" />
                                                                                        Cancel Order
                                                                                </button>
                                                                        )}
                                                                        {order.orderStatus === "Confirmed" && (
                                                                                <>
                                                                                        <button
                                                                                                onClick={() => returnOrder(order._id)}
                                                                                                className="flex items-center px-4 py-2 bg-[#6B4E4D]/10 text-[#6B4E4D] rounded-lg hover:bg-[#6B4E4D]/20 transition"
                                                                                        >
                                                                                                <RefreshCw className="w-5 h-5 mr-2" />
                                                                                                Return
                                                                                        </button>
                                                                                        <button
                                                                                                onClick={() => handleGoToReviewPage(order)}
                                                                                                className="flex items-center px-4 py-2 bg-[#6B4E4D]/10 text-[#6B4E4D] rounded-lg hover:bg-[#6B4E4D]/20 transition"
                                                                                        >
                                                                                                <Star className="w-5 h-5 mr-2" />
                                                                                                Review these Products 
                                                                                        </button>
                                                                                        
                                                                            </>
                                                                        )}
                                                                </div>
                                                        </div>
                                                ))}
                                        </div>
                                ) : (
                                        <div className="text-center py-12 space-y-4">
                                                <PackageOpen className="w-12 h-12 text-[#B76E79] mx-auto" />
                                                <p className="text-[#6B4E4D]/80">No orders found</p>
                                                <Link to="/products" className="inline-block text-[#B76E79] hover:text-[#C5A880] transition">
                                                        Start Shopping →
                                                </Link>
                                        </div>
                                )}
                        </div>
                </div>
        );
};

export default Profile;
