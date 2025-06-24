import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { ShoppingCart } from "lucide-react";

const CheckoutPage = () => {
        const location = useLocation();
        const navigate = useNavigate();

        const cartItems = location.state?.cartItems || [];
        const subtotal = location.state?.total || 0;
        const finalAmount = location.state?.finalAmount || subtotal; // Use final amount directly

        const [address, setAddress] = useState("");
        const [addressError, setAddressError] = useState(""); // New state for address validation
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState("");
        const [user, setUser] = useState();
        const [discountCode, setDiscountCode] = useState("");
        const [discountAmount, setDiscountAmount] = useState(0);
        const [discountMessage, setDiscountMessage] = useState("");

        const finalPayable = finalAmount - discountAmount || finalAmount;
        const [dCode, setDCode] = useState("");

        console.log("received cartItems: ", cartItems);

        useEffect(() => {
                const fetchUserProfile = async () => {
                        try {
                                const token = localStorage.getItem("userToken");
                                if (!token) return navigate("/login");

                                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/profile`, {
                                        headers: { Authorization: `Bearer ${token}` },
                                });
                                setUser(data);
                                setAddress(data.address || "");
                        } catch (error) {
                                setError("Failed to fetch user profile.");
                        } finally {
                                setLoading(false);
                                console.log(loading);
                                console.log(error);
                        }
                };
                fetchUserProfile();
        }, [navigate]);

        // Address validation function
        const validateAddress = (input) => {
                // Blocked words (you can add more)
                const blockedWords = ["fake", "test", "unknown", "n/a", "123", "####"];

                // Regex to allow letters, numbers, spaces, commas, and common symbols
                const validAddressPattern = /^[a-zA-Z0-9\s,.-]+$/;

                if (input.length < 10) {
                        setAddressError("Address must be at least 10 characters long.");
                        return false;
                }

                if (!validAddressPattern.test(input)) {
                        setAddressError("Address contains invalid characters.");
                        return false;
                }

                if (blockedWords.some((word) => input.toLowerCase().includes(word))) {
                        setAddressError("This address is not valid for shipping.");
                        return false;
                }

                setAddressError(""); // Clear error if valid
                return true;
        };

        const handleAddressChange = (e) => {
                const newAddress = e.target.value;
                setAddress(newAddress);
                validateAddress(newAddress); // Validate on change
        };

        const applyDiscount = async () => {
                console.log("Applying Discount:", discountCode, subtotal); // Debug Log

                try {
                        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/discounts/apply`, {
                                code: discountCode,
                                totalAmount: subtotal,
                        });

                        console.log("Response:", data); // ✅ Check if response comes back

                        setDiscountAmount(data.discountAmount);
                        setDCode(data.discountCode);
                        console.log("fetched data.code", data.discountCode, "dCode: ", dCode);
                        setDiscountMessage("Discount applied successfully!");
                        hideMessage();
                } catch (error) {
                        console.error("Discount Error:", error.response?.data || error.message);
                        setDiscountMessage(error.response?.data?.message || "Invalid discount code.");
                        hideMessage();
                }
        };

        const handlePayment = async (cartItems, finalPayable, user) => {
                // console.log("🚀 handlePayment called!");
                console.log("🔹 cartItems:", cartItems);
                // console.log("🔹 finalAmount:", finalPayable);
                // console.log("🔹 user:", user);

                if (!user || !user._id) {
                        console.error("❌ User is missing or invalid! Make sure you are logged in.");
                        alert("❌ User data is missing. Please log in again.");
                        return;
                }

                try {
                        const token = localStorage.getItem("userToken");
                        if (!token) {
                                console.error("❌ Authentication error: Token is missing.");
                                alert("❌ Authentication error: Please log in.");
                                return;
                        }

                        const amountInPaise = Math.round(finalPayable * 100);

                        const loadRazorpayScript = () =>
                                new Promise((resolve) => {
                                        if (document.getElementById("razorpay-script")) {
                                                resolve(true);
                                                return;
                                        }
                                        const script = document.createElement("script");
                                        script.id = "razorpay-script";
                                        script.src = "https://checkout.razorpay.com/v1/checkout.js";
                                        script.onload = () => resolve(true);
                                        script.onerror = () => resolve(false);
                                        document.body.appendChild(script);
                                });

                        const scriptLoaded = await loadRazorpayScript();
                        if (!scriptLoaded) {
                                console.error("❌ Failed to load Razorpay.");
                                alert("❌ Failed to load Razorpay. Please try again.");
                                return;
                        }

                        if (typeof window.Razorpay === "undefined") {
                                console.error("❌ Razorpay not available.");
                                alert("❌ Razorpay not available. Try again later.");
                                return;
                        }

                        const options = {
                                key: "rzp_test_1DP5mmOlF5G5ag",
                                amount: amountInPaise,
                                currency: "INR",
                                name: "ShopEase",
                                description: "Order Payment",
                                handler: async function (response) {
                                        console.log("✅ Payment successful! Payment ID:", response.razorpay_payment_id);
                                        alert("✅ Payment successful!");

                                        const orderData = {
                                                user: user._id,
                                                items: cartItems.map((item) => ({
                                                        product: item.product._id || item._id,
                                                        name: item.name,
                                                        quantity: item.quantity || 1,
                                                        price: item.price,
                                                })),
                                                totalAmount: finalPayable,
                                                paymentId: response.razorpay_payment_id,
                                                discountCode: dCode || "NO_DISCOUNT", // ✅ Ensure discount is applied
                                                paymentStatus: "Paid",
                                        };

                                        console.log("🔹 Sending Order Request:", orderData);

                                        try {
                                                const res = await axios.post(
                                                        `${process.env.REACT_APP_API_URL}/api/orders/store-after-payment`,
                                                        orderData,
                                                        {
                                                                headers: {
                                                                        Authorization: `Bearer ${token}`,
                                                                        "Content-Type": "application/json",
                                                                },
                                                        }
                                                );

                                                console.log("✅ Order stored successfully:", res.data);
                                                alert("✅ Order placed successfully!");


                                                try {
                                                        if (!user || !user._id) {
                                                                console.error("❌ No valid user found.");
                                                                alert("User not found!");
                                                                return;
                                                        }

                                                        // let userId = user._id;
                                                        // console.log("User in cart try block: ", userId);
                                                        // console.log("🛒 Sending request to clear cart for user:", userId);

                                                        await axios.delete(`${process.env.REACT_APP_API_URL}/api/cart/clear/${user._id}`, {
                                                                headers: {
                                                                        Authorization: `Bearer ${token}`,
                                                                        "Content-Type": "application/json"
                                                                }
                                                        });

                                                        console.log("✅ Cart cleared successfully:", response.data);
                                                        alert("✅ Items removed from cart!");

                                                        navigate("/order-history");

                                                } catch (error) {
                                                        console.error("❌ Error clearing cart:", error);
                                                        alert(`⚠️ Error: ${error.response?.data?.message || "Cart was not cleared."}`);
                                                }


                                        } catch (error) {
                                                console.error("❌ Error storing order:", error);
                                                alert("❌ Error storing order: " + (error.response?.data?.message || error.message));
                                        }
                                },
                                prefill: {
                                        name: user?.name || "Test User",
                                        email: user?.email || "test@example.com",
                                },
                                theme: { color: "#3399cc" },

                                modal: {
                                        ondismiss: async function () {
                                                console.log("❌ Payment was closed by the user.");
                                                alert("❌ Payment was not completed. Storing as unpaid order.");

                                                const unpaidOrderData = {
                                                        user: user._id,
                                                        items: cartItems.map((item) => ({
                                                                product: item.productId || item._id,
                                                                name: item.name,
                                                                quantity: item.quantity || 1,
                                                                price: item.price,
                                                        })),
                                                        totalAmount: finalPayable,
                                                        paymentId: null,
                                                        paymentStatus: "Unpaid",
                                                };

                                                console.log("🔹 Storing Unpaid Order:", unpaidOrderData);

                                                try {
                                                        const res = await axios.post(
                                                                `${process.env.REACT_APP_API_URL}/api/orders/store-after-payment`,
                                                                unpaidOrderData,
                                                                {
                                                                        headers: {
                                                                                Authorization: `Bearer ${token}`,
                                                                                "Content-Type": "application/json",
                                                                        },
                                                                }
                                                        );

                                                        console.log("✅ Unpaid order stored successfully:", res.data);
                                                        alert("✅ Unpaid order has been stored.");
                                                } catch (error) {
                                                        console.error("❌ Error storing unpaid order:", error.response?.data || error.message);
                                                        alert("❌ Error storing unpaid order: " + (error.response?.data?.message || error.message));
                                                }
                                        },
                                },
                        };

                        const rzp = new window.Razorpay(options);
                        rzp.open();
                } catch (error) {
                        console.error("❌ Unexpected Error:", error);
                        alert("❌ Unexpected error occurred.");
                }
        };

        const hideMessage = () => {
                setTimeout(() => {
                        setDiscountMessage("");
                }, 3000);
        };


        return (
                <div className="max-w-6xl mx-auto p-6 mt-[60px] relative">
                        {/* Background Elements */}
                        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-gradient-to-br from-[#B76E79]/10 to-[#C5A880]/10 rounded-full blur-3xl" />

                        {/* Main Card Container */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-[#E0D6CC]">
                                {/* Header Section */}
                                <div className="p-8 border-b border-[#E0D6CC]">
                                        <div className="flex items-center gap-4">
                                                <div className="p-3 bg-[#B76E79]/10 rounded-lg">
                                                        <ShoppingCart className="w-8 h-8 text-[#B76E79]" />
                                                </div>
                                                <h2 className="text-3xl font-serif text-[#6B4E4D]">Complete Your Purchase</h2>
                                        </div>
                                </div>

                                {/* Content Grid */}
                                <div className="grid lg:grid-cols-[2fr_1fr] gap-8 p-8">
                                        {/* Left Column - Main Content */}
                                        <div className="space-y-8">
                                                {/* Order Items */}
                                                <div className="space-y-6">
                                                        {cartItems.map((item) => (
                                                                <div key={item.id} className="flex items-center gap-6 p-4 bg-[#FAF6F0] rounded-xl border border-[#E0D6CC]">
                                                                        <div className="w-20 h-20 rounded-lg overflow-hidden">
                                                                                <img src={item.product.images[0]} className="w-full h-full object-cover" />
                                                                        </div>
                                                                        <div className="flex-1">
                                                                                <h3 className="font-serif text-[#6B4E4D]">{item.name}</h3>
                                                                                <div className="flex items-center justify-between mt-2">
                                                                                        <span className="text-[#B76E79]">₹{item.price.toFixed(2)}</span>
                                                                                        <span className="text-[#6B4E4D]/80">x{item.quantity}</span>
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                        ))}
                                                </div>

                                                {/* Discount & Address Combined */}
                                                <div className="space-y-8">
                                                        <div className="bg-[#FAF6F0] rounded-xl p-6 border border-[#E0D6CC]">
                                                                <div className="flex gap-4">
                                                                        <input
                                                                                type="text"
                                                                                className="flex-1 bg-white border border-[#E0D6CC] rounded-lg px-4 py-3 text-[#6B4E4D] placeholder-[#B76E79]/50"
                                                                                placeholder="Enter promo code"
                                                                                value={discountCode}
                                                                                onChange={(e) => setDiscountCode(e.target.value)}
                                                                        />
                                                                        <button
                                                                                onClick={applyDiscount}
                                                                                className="px-6 py-3 bg-[#B76E79]/10 text-[#B76E79] rounded-lg hover:bg-[#B76E79]/20 transition-colors"
                                                                        >
                                                                                Apply
                                                                        </button>
                                                                </div>
                                                                {discountMessage && (
                                                                        <p className={`mt-3 text-sm ${discountMessage.includes('Applied') ? 'text-[#C5A880]' : 'text-[#B76E79]'}`}>
                                                                                {discountMessage}
                                                                        </p>
                                                                )}
                                                        </div>

                                                        <div className="bg-[#FAF6F0] rounded-xl p-6 border border-[#E0D6CC]">
                                                                <h3 className="font-serif text-[#6B4E4D] mb-4">Shipping Details</h3>
                                                                <textarea
                                                                        className="w-full bg-white border border-[#E0D6CC] rounded-lg px-4 py-3 text-[#6B4E4D] min-h-[120px]"
                                                                        value={address}
                                                                        onChange={handleAddressChange}
                                                                        placeholder="Enter shipping address..."
                                                                />
                                                                {addressError && <p className="text-[#B76E79] mt-2 text-sm">{addressError}</p>}
                                                        </div>
                                                </div>
                                        </div>

                                        {/* Right Column - Summary */}
                                        <div className="bg-[#FAF6F0] rounded-xl p-6 border border-[#E0D6CC] h-fit sticky top-24">
                                                <div className="space-y-6">
                                                        <div className="flex justify-between items-center pb-4 border-b border-[#E0D6CC]">
                                                                <span className="text-[#6B4E4D]">Subtotal</span>
                                                                <span className="text-[#B76E79]">₹{subtotal.toFixed(2)}</span>
                                                        </div>

                                                        <div className="flex justify-between items-center pb-4 border-b border-[#E0D6CC]">
                                                                <span className="text-[#6B4E4D]">Discount</span>
                                                                <span className="text-[#B76E79]">-₹{discountAmount.toFixed(2)}</span>
                                                        </div>

                                                        <div className="flex justify-between items-center pb-4 border-b border-[#E0D6CC]">
                                                                <span className="text-[#6B4E4D]">Shipping</span>
                                                                <span className="text-[#C5A880]">FREE</span>
                                                        </div>

                                                        <div className="flex justify-between items-center pt-4">
                                                                <span className="text-lg font-serif text-[#6B4E4D]">Total</span>
                                                                <span className="text-xl font-bold text-[#B76E79]">₹{finalPayable.toFixed(2)}</span>
                                                        </div>

                                                        <button
                                                                onClick={() => handlePayment(cartItems, finalPayable, user)}
                                                                className={`w-full py-4 mt-6 rounded-xl font-medium transition-all ${cartItems.length === 0
                                                                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                                                                : "bg-[#B76E79] hover:bg-[#C5A880] text-white hover:shadow-lg"
                                                                        }`}
                                                                disabled={cartItems.length === 0}
                                                        >
                                                                {cartItems.length > 0 ? 'Proceed to Payment' : 'Cart Empty'}
                                                        </button>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
        );
};


export default CheckoutPage;
