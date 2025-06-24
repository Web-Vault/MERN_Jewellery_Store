import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Gem, Loader2, Diamond } from "lucide-react";

const Login = () => {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [error, setError] = useState("");
        const [loading, setLoading] = useState(false);
        const [message, setMessage] = useState("");
        const navigate = useNavigate();

        const handleSubmit = async (e) => {
                e.preventDefault();
                setLoading(true);
                setError("");

                try {
                        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/login`, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ email, password }),
                        });

                        const data = await response.json();

                        if (response.ok) {
                                localStorage.setItem("userId", data.user.id);
                                localStorage.setItem("userToken", data.user.token); // ✅ Fix: Ensure token is stored
                                window.dispatchEvent(new Event("storage")); // ✅ Fix: Notify auth state update
                                navigate("/"); // ✅ Redirect user after login
                        } else {
                                setError(data.message || "Invalid credentials");
                                setMessage("Invalid credentials.");
                                hideMessage();
                        }
                } catch (err) {
                        setError("Server error");
                        setMessage("Server error");
                        hideMessage();
                } finally {
                        setLoading(false);
                }
        };

        const hideMessage = () => {
                setTimeout(() => {
                        setMessage("");
                }, 3000);
        };

        return (
                <div className="min-h-screen bg-[#FAF6F0] flex items-center justify-center p-6 relative overflow-hidden">
                        {/* Decorative Elements */}
                        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#D8B6A4]/20 rounded-full blur-xl"></div>
                        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#B76E79]/10 rounded-full blur-xl"></div>

                        {/* Diagonal Accent Shape */}
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#F5EDE1]/50 clip-path-diagonal transform -skew-x-12 origin-top"></div>

                        <div className="relative z-10 w-full max-w-5xl bg-white rounded-[2rem] shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-[1fr_1.2fr]">
                                {/* Branding Section */}
                                <div className="hidden lg:block bg-gradient-to-br from-[#F5EDE1] to-[#D8B6A4]/30 p-12">
                                        <div className="h-full flex flex-col justify-between">
                                                <div className="text-[#6B4E4D]">
                                                        <span className="text-2xl font-serif font-bold">Luxuria Jewels</span>
                                                </div>
                                                <div className="space-y-6">
                                                        <div className="w-16 h-1 bg-[#B76E79]/40 rounded-full"></div>
                                                        <h3 className="text-3xl font-serif">Experience Timeless Elegance</h3>
                                                        <p className="text-[#6B4E4D]/80">Your personal gateway to exclusive collections</p>
                                                </div>
                                                <div className="flex space-x-4">
                                                        <div className="w-12 h-12 rounded-lg bg-[#B76E79]/10 flex items-center justify-center">
                                                                <Gem className="w-6 h-6 text-[#B76E79]" />
                                                        </div>
                                                        <div className="w-12 h-12 rounded-lg bg-[#C5A880]/10 flex items-center justify-center">
                                                                <Diamond className="w-6 h-6 text-[#C5A880]" />
                                                        </div>
                                                </div>
                                        </div>
                                </div>

                                {/* Login Form Section */}
                                <div className="p-12 flex flex-col justify-center">
                                        <div className="space-y-8">
                                                <div className="text-center lg:text-left">
                                                        <h2 className="text-4xl font-serif text-[#6B4E4D] mb-2">Welcome Back</h2>
                                                        <p className="text-[#6B4E4D]/80">Sign in to your luxury account</p>
                                                </div>

                                                <form onSubmit={handleSubmit} className="space-y-6">
                                                        <div className="space-y-4">
                                                                <div className="relative">
                                                                        <input
                                                                                type="email"
                                                                                onChange={(e) => setEmail(e.target.value)}
                                                                                className="w-full px-6 py-4 bg-[#FAF6F0] border-2 border-[#F5EDE1] rounded-xl focus:border-[#B76E79]/40 focus:ring-0 placeholder-[#C5A880] text-[#6B4E4D]"
                                                                                placeholder="Email address"
                                                                                required
                                                                        />
                                                                        <Mail className="absolute right-6 top-1/2 -translate-y-1/2 text-[#C5A880]" />
                                                                </div>

                                                                <div className="relative">
                                                                        <input
                                                                                type="password"
                                                                                onChange={(e) => setPassword(e.target.value)}
                                                                                className="w-full px-6 py-4 bg-[#FAF6F0] border-2 border-[#F5EDE1] rounded-xl focus:border-[#B76E79]/40 focus:ring-0 placeholder-[#C5A880] text-[#6B4E4D]"
                                                                                placeholder="Password"
                                                                                required
                                                                        />
                                                                        <Lock className="absolute right-6 top-1/2 -translate-y-1/2 text-[#C5A880]" />
                                                                </div>
                                                        </div>

                                                        <div className="flex justify-between items-center">
                                                                <label className="flex items-center space-x-3 text-[#6B4E4D]/80">
                                                                        <input
                                                                                type="checkbox"
                                                                                className="w-5 h-5 border-2 border-[#F5EDE1] rounded-md focus:ring-[#B76E79]/40 text-[#B76E79]"
                                                                        />
                                                                        <span>Remember me</span>
                                                                </label>
                                                                <Link
                                                                        to="/ForgotPassword"
                                                                        className="text-[#6B4E4D]/80 hover:text-[#B76E79] transition-colors"
                                                                >
                                                                        Forgot password?
                                                                </Link>
                                                        </div>

                                                        <button
                                                                type="submit"
                                                                className="w-full py-4 bg-gradient-to-br from-[#B76E79] to-[#C5A880] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                                                                disabled={loading}
                                                        >
                                                                {loading ? (
                                                                        <div className="flex items-center justify-center gap-2">
                                                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                                                Authenticating...
                                                                        </div>
                                                                ) : "Access Account"}
                                                        </button>
                                                </form>

                                                {message}
                                                {error}

                                                <div className="pt-6 border-t border-[#F5EDE1]">
                                                        <p className="text-center text-[#6B4E4D]/80">
                                                                New collector?{" "}
                                                                <Link to="/signup" className="text-[#B76E79] hover:text-[#C5A880] transition-colors">
                                                                        Create account
                                                                </Link>
                                                        </p>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
        );
};

export default Login;
