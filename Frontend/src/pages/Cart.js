import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Trash2, Minus, Plus, CreditCard, Gem } from "lucide-react";


const Cart = () => {
        const [cartItems, setCartItems] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
        const [message, setMessage] = useState();
        const navigate = useNavigate();
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("userToken");

        const fetchCart = async () => {
                try {
                        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/cart/${userId}`, {
                                method: "GET",
                                headers: {
                                        "Content-Type": "application/json",
                                        Authorization: `Bearer ${token}`,
                                },
                        });

                        const data = await response.json();

                        if (response.ok) {
                                setCartItems(data.products || []);
                        } else {
                                setError(data.message || "Failed to load cart.");
                        }
                } catch (err) {
                        console.error("Fetch error:", err);
                        setError("Server error while fetching cart.");
                } finally {
                        setLoading(false);
                }
        };

        useEffect(() => {
                if (userId && token) {
                        fetchCart();
                }
        }, [userId, token]);

        const updateQuantity = async (id, amount) => {
                const newQuantity = cartItems.find((item) => item.product._id === id)?.quantity + amount;
                if (newQuantity < 1) return removeItem(id);

                try {
                        await fetch(`${process.env.REACT_APP_API_URL}/api/cart/update`, {
                                method: "POST",
                                headers: {
                                        "Content-Type": "application/json",
                                        Authorization: `Bearer ${token}`,
                                },
                                body: JSON.stringify({ userId, productId: id, quantity: newQuantity }),
                        });
                        fetchCart();
                } catch (err) {
                        console.error("Update error:", err);
                }
        };

        const removeItem = async (id) => {
                try {
                        await fetch(`${process.env.REACT_APP_API_URL}/api/cart/remove`, {
                                method: "POST",
                                headers: {
                                        "Content-Type": "application/json",
                                        Authorization: `Bearer ${token}`,
                                },
                                body: JSON.stringify({ userId, productId: id }),
                        });
                        fetchCart();
                        setMessage("Item removed successfully.");
                        setTimeout(() => {
                               setMessage(""); 
                        }, 3000);

                } catch (err) {
                        console.error("Remove error:", err);
                        setMessage("Unable to remove the item.");
                        setTimeout(() => {
                               setMessage(""); 
                        }, 3000);
                }
        };

        const handleCheckout = () => {
                navigate("/checkout", {
                        state: {
                                cartItems,
                                subtotal,
                                tax,
                                shipping,
                                total
                        }
                });
        };


        const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
        const tax = subtotal * 0.1;
        const shipping = subtotal > 0 ? 10 : 0;
        const total = subtotal + tax + shipping;

        if (loading) return <div>Loading...</div>;
        if (error) return <div className="text-red-600">{error}</div>;

        return (
                <div className="max-w-7xl mx-auto p-6 mt-24 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 relative">

                        {/* Floating Decorative Elements */}
                        <div className="absolute top-24 left-24 w-48 h-48 bg-gradient-to-r from-[#B76E79]/15 to-[#C5A880]/15 rounded-full blur-2xl"></div>
                        <div className="absolute bottom-32 right-32 w-64 h-64 bg-gradient-to-b from-[#FAF6F0] to-[#F5EDE1] rounded-full blur-2xl"></div>

                        {/* Cart Items Section */}
                        <div className="bg-white backdrop-blur-sm rounded-2xl p-8 border border-[#E0D6CC] shadow-lg">
                                <div className="flex items-center gap-4 mb-8">
                                        <div className="p-3 bg-[#B76E79]/10 rounded-lg">
                                                <ShoppingCart className="w-8 h-8 text-[#B76E79]" />
                                        </div>
                                        <h2 className="text-3xl font-serif text-[#6B4E4D]">Your Curated Selection</h2>
                                </div>

                                <p className="text-[#6B4E4D]/80 underline font-semibold text-lg text-center transition-all"> {message} </p>


                                {cartItems.length === 0 ? (
                                        <div className="text-center py-12">
                                                <Gem className="w-16 h-16 text-[#B76E79]/40 mx-auto mb-4" />
                                                <p className="text-xl text-[#6B4E4D]/80">Your collection awaits</p>
                                        </div>
                                ) : (
                                        <div className="space-y-6">
                                                {cartItems.map((item) => (
                                                        <div key={item.product._id} className="group bg-white p-6 rounded-xl border border-[#E0D6CC] hover:border-[#B76E79]/30 transition-all hover:shadow-md">
                                                                <div className="flex items-center justify-between gap-6">
                                                                        {/* Product Image */}
                                                                        <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                                                                                <img
                                                                                        src={item.product.images[0]}
                                                                                        alt={item.product.name}
                                                                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform"
                                                                                />
                                                                                <div className="absolute inset-0 bg-gradient-to-t from-[#6B4E4D]/10 to-transparent" />
                                                                        </div>

                                                                        {/* Product Details */}
                                                                        <div className="flex-1">
                                                                                <h3 className="text-lg font-serif text-[#6B4E4D]">{item.product.name}</h3>
                                                                                <p className="text-[#B76E79] mt-1">₹{item.product.price.toFixed(2)}</p>
                                                                        </div>

                                                                        {/* Quantity Controls */}
                                                                        <div className="flex items-center gap-4 bg-[#FAF6F0] px-4 py-2 rounded-lg border border-[#E0D6CC]">
                                                                                <button
                                                                                        onClick={() => updateQuantity(item.product._id, -1)}
                                                                                        className="text-[#6B4E4D] hover:text-[#B76E79] transition-colors"
                                                                                >
                                                                                        <Minus className="w-5 h-5" />
                                                                                </button>
                                                                                <span className="text-[#6B4E4D] w-8 text-center">{item.quantity}</span>
                                                                                <button
                                                                                        onClick={() => updateQuantity(item.product._id, 1)}
                                                                                        className="text-[#6B4E4D] hover:text-[#B76E79] transition-colors"
                                                                                >
                                                                                        <Plus className="w-5 h-5" />
                                                                                </button>
                                                                        </div>

                                                                        {/* Price & Remove */}
                                                                        <div className="text-right min-w-[120px]">
                                                                                <p className="text-lg font-medium text-[#B76E79]">₹{(item.product.price * item.quantity).toFixed(2)}</p>
                                                                                <button
                                                                                        onClick={() => removeItem(item.product._id)}
                                                                                        className="mt-2 text-sm text-[#6B4E4D]/70 hover:text-[#B76E79] flex items-center gap-2 justify-end"
                                                                                >
                                                                                        <Trash2 className="w-4 h-4" />
                                                                                        <span>Remove</span>
                                                                                </button>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                ))}
                                        </div>
                                )}
                        </div>

                        {/* Order Summary */}
                        <div className="bg-white backdrop-blur-sm rounded-2xl p-8 border border-[#E0D6CC] shadow-lg h-fit sticky top-24">
                                <div className="flex items-center gap-4 mb-8">
                                        <div className="p-3 bg-[#B76E79]/10 rounded-lg">
                                                <CreditCard className="w-8 h-8 text-[#B76E79]" />
                                        </div>
                                        <h3 className="text-3xl font-serif text-[#6B4E4D]">Order Summary</h3>
                                </div>

                                <div className="space-y-4 text-[#6B4E4D]/80">
                                        <div className="flex justify-between items-center pb-3 border-b border-[#E0D6CC]">
                                                <span>Subtotal</span>
                                                <span className="font-medium text-[#B76E79]">₹{subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-3 border-b border-[#E0D6CC]">
                                                <span>Craftsmanship Fee</span>
                                                <span className="font-medium text-[#B76E79]">₹{tax.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-3 border-b border-[#E0D6CC]">
                                                <span>Secure Shipping</span>
                                                <span className="font-medium text-[#B76E79]">₹{shipping.toFixed(2)}</span>
                                        </div>
                                </div>

                                <div className="flex justify-between items-center mt-8 py-4">
                                        <span className="text-xl font-serif text-[#6B4E4D]">Total</span>
                                        <span className="text-2xl font-bold text-[#B76E79]">₹{total.toFixed(2)}</span>
                                </div>

                                <button
                                        className={`w-full py-4 rounded-xl font-medium text-lg transition-all ${total === 0
                                                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                                        : "bg-gradient-to-r from-[#B76E79] to-[#C5A880] hover:from-[#C5A880] hover:to-[#B76E79] text-white hover:shadow-lg"
                                                }`}
                                        disabled={total === 0}
                                        onClick={handleCheckout}
                                >
                                        {total === 0 ? 'Continue Shopping' : 'Secure Checkout'}
                                </button>
                        </div>
                </div>
        );
};

export default Cart;
