import { useState } from "react";
import axios from "axios";
import { Mail, ArrowLeft, Key } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
        const [email, setEmail] = useState("");
        const [message, setMessage] = useState("");
        const [error, setError] = useState("");

        const handleSubmit = async (e) => {
                e.preventDefault();
                setMessage("");
                setError("");

                try {
                        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/forgot-password`, { email });
                        setMessage(data.message);
                        setTimeout(() => {
                                setMessage("");
                        }, 3000);
                } catch (err) {
                        setError(err.response?.data?.message || "Error sending reset email.");
                }
        };

        return (
                <div className="min-h-screen bg-[#FAF6F0] flex items-center justify-center p-6">
                        <div className="w-full max-w-6xl bg-white rounded-[2rem] shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-[1fr_1.2fr]">
                                {/* Visual Section */}
                                <div className="relative bg-gradient-to-br from-[#F5EDE1] to-[#D8B6A4]/30 p-12">
                                        <div className="absolute top-8 left-8">
                                                <span className="text-2xl font-serif text-[#6B4E4D]">Luxuria Jewels</span>
                                        </div>

                                        <div className="h-full flex flex-col justify-center items-center space-y-8">
                                                <div className="relative w-64 h-64 bg-[#B76E79]/10 rounded-full flex items-center justify-center">
                                                        <div className="absolute inset-0 border-2 border-[#B76E79]/20 rounded-full animate-pulse"></div>
                                                        <Key className="w-24 h-24 text-[#B76E79]/40" />
                                                </div>

                                                <div className="text-center space-y-4">
                                                        <h3 className="text-2xl font-serif text-[#6B4E4D]">Secure Access</h3>
                                                        <p className="text-[#6B4E4D]/80 max-w-md">
                                                                Your gateway to exclusive jewellery collections and personalized services
                                                        </p>
                                                </div>
                                        </div>
                                </div>

                                {/* Interactive Section */}
                                <div className="p-12 flex flex-col justify-center relative">
                                        {/* Decorative Pattern */}
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#B76E79]/10 clip-path-polygon"></div>

                                        <div className="max-w-md mx-auto w-full space-y-8">
                                                <div className="space-y-4">
                                                        <h2 className="text-4xl font-serif text-[#6B4E4D]">Reset Password</h2>
                                                        <p className="text-[#6B4E4D]/80">
                                                                Enter your email to initiate the secure reset process
                                                        </p>
                                                </div>

                                                <form onSubmit={handleSubmit} className="space-y-6">
                                                        <div className="relative">
                                                                <input
                                                                        type="email"
                                                                        value={email}
                                                                        onChange={(e) => setEmail(e.target.value)}
                                                                        className="w-full px-6 py-4 bg-[#FAF6F0] border-2 border-[#F5EDE1] rounded-xl focus:border-[#B76E79]/40 focus:ring-0 placeholder-[#C5A880] text-[#6B4E4D]"
                                                                        placeholder="Your registered email"
                                                                />
                                                                <Mail className="absolute right-6 top-1/2 -translate-y-1/2 text-[#C5A880]" />
                                                        </div>

                                                        <button className="w-full py-4 bg-[#B76E79] text-white rounded-xl font-semibold hover:bg-[#A35D68] transition-colors shadow-md">
                                                                Send Verification
                                                        </button>
                                                </form>

                                                {message ? message : ""}

                                                <div className="pt-6 border-t border-[#F5EDE1]">
                                                        <Link to="/login" className="text-[#6B4E4D]/80 hover:text-[#B76E79] flex items-center gap-2">
                                                                <ArrowLeft className="w-5 h-5" />
                                                                Return to Member Portal
                                                        </Link>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
        );
};

export default ForgotPassword;
