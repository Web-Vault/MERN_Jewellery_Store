import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Check, Loader2, Gem, Diamond, Sparkles } from 'lucide-react'
const Signup = () => {
        const [name, setName] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [confirmPassword, setConfirmPassword] = useState("");
        const [error, setError] = useState("");
        const [message, setMessage] = useState("");
        const [loading, setLoading] = useState(false);
        const navigate = useNavigate();

        // Handle form submission
        const handleSubmit = async (e) => {
                e.preventDefault();

                if (password !== confirmPassword) {
                        setError("Passwords do not match");
                        return;
                }

                setLoading(true);

                const newUser = { name, email, password };

                try {
                        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/register`, {
                                method: "POST",
                                headers: {
                                        "Content-Type": "application/json",
                                },
                                body: JSON.stringify(newUser),
                        });

                        const data = await response.json();

                        if (response.ok) {
                                navigate("/login"); // Redirect to login page
                        } else {
                                setError(data.message || "Registration failed");
                                setMessage("Error in registration. Try Again.");
                                setTimeout(() => {
                                        setMessage("");
                                }, 3000);
                        }
                } catch (err) {
                        console.error(err);
                        setError("Server error");
                        setMessage("Server Error.");
                                setTimeout(() => {
                                        setMessage("");
                                }, 3000);
                } finally {
                        setLoading(false);
                }
        };

        return (
                <div className="min-h-screen bg-[#FAF6F0] flex items-center justify-center p-6 relative overflow-hidden">
                        {/* Decorative Elements */}
                        <div className="absolute top-0 left-0 w-1/3 h-full bg-[#F5EDE1]/50 clip-path-signup"></div>
                        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#D8B6A4]/20 rounded-full blur-xl"></div>

                        <div className="relative z-10 w-full max-w-5xl bg-white rounded-[2rem] shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-[1fr_1.2fr]">
                                {/* Visual Section */}
                                <div className="hidden lg:block bg-gradient-to-br from-[#F5EDE1] to-[#D8B6A4]/30 p-12">
                                        <div className="h-full flex flex-col justify-between">
                                                <div className="space-y-8">
                                                        <div className="text-[#6B4E4D]">
                                                                <span className="text-2xl font-serif font-bold">Luxuria Jewels</span>
                                                        </div>
                                                        <div className="space-y-6">
                                                                <div className="w-24 h-24 bg-[#B76E79]/10 rounded-2xl flex items-center justify-center">
                                                                        <Sparkles className="w-12 h-12 text-[#B76E79]/40" />
                                                                </div>
                                                                <h3 className="text-3xl font-serif">Craft Your Legacy</h3>
                                                                <p className="text-[#6B4E4D]/80">Join our exclusive community of collectors</p>
                                                        </div>
                                                </div>
                                                <div className="flex space-x-4">
                                                        <div className="w-16 h-16 rounded-lg bg-[#C5A880]/10 flex items-center justify-center">
                                                                <Diamond className="w-8 h-8 text-[#C5A880]" />
                                                        </div>
                                                        <div className="w-16 h-16 rounded-lg bg-[#B76E79]/10 flex items-center justify-center">
                                                                <Gem className="w-8 h-8 text-[#B76E79]" />
                                                        </div>
                                                </div>
                                        </div>
                                </div>

                                {/* Signup Form Section */}
                                <div className="p-12 flex flex-col justify-center">
                                        <div className="space-y-8">
                                                <div className="text-center lg:text-left">
                                                        <h2 className="text-4xl font-serif text-[#6B4E4D]">Become a Member</h2>
                                                        <p className="text-[#6B4E4D]/80 mt-2">Create your exclusive account</p>
                                                </div>

                                                <form onSubmit={handleSubmit} className="space-y-6">
                                                        <div className="grid grid-cols-1 gap-6">
                                                                <div className="relative">
                                                                        <input
                                                                                type="text"
                                                                                value={name}
                                                                                onChange={(e) => setName(e.target.value)}
                                                                                className="w-full px-6 py-4 bg-[#FAF6F0] border-2 border-[#F5EDE1] rounded-xl focus:border-[#B76E79]/40 placeholder-[#C5A880] text-[#6B4E4D]"
                                                                                placeholder="Full name"
                                                                                required
                                                                        />
                                                                        <User className="absolute right-6 top-1/2 -translate-y-1/2 text-[#C5A880]" />
                                                                </div>

                                                                <div className="relative">
                                                                        <input
                                                                                type="email"
                                                                                value={email}
                                                                                onChange={(e) => setEmail(e.target.value)}
                                                                                className="w-full px-6 py-4 bg-[#FAF6F0] border-2 border-[#F5EDE1] rounded-xl focus:border-[#B76E79]/40 placeholder-[#C5A880] text-[#6B4E4D]"
                                                                                placeholder="Email address"
                                                                                required
                                                                        />
                                                                        <Mail className="absolute right-6 top-1/2 -translate-y-1/2 text-[#C5A880]" />
                                                                </div>

                                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                                                        <div className="relative">
                                                                                <input
                                                                                        type="password"
                                                                                        value={password}
                                                                                        onChange={(e) => setPassword(e.target.value)}
                                                                                        className="w-full px-6 py-4 bg-[#FAF6F0] border-2 border-[#F5EDE1] rounded-xl focus:border-[#B76E79]/40 placeholder-[#C5A880] text-[#6B4E4D]"
                                                                                        placeholder="Password"
                                                                                        required
                                                                                />
                                                                                <Lock className="absolute right-6 top-1/2 -translate-y-1/2 text-[#C5A880]" />
                                                                        </div>

                                                                        <div className="relative">
                                                                                <input
                                                                                        type="password"
                                                                                        value={confirmPassword}
                                                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                                                        className="w-full px-6 py-4 bg-[#FAF6F0] border-2 border-[#F5EDE1] rounded-xl focus:border-[#B76E79]/40 placeholder-[#C5A880] text-[#6B4E4D]"
                                                                                        placeholder="Confirm password"
                                                                                        required
                                                                                />
                                                                                <Check className="absolute right-6 top-1/2 -translate-y-1/2 text-[#C5A880]" />
                                                                        </div>
                                                                </div>
                                                        </div>

                                                        {error && <p className="text-center text-[#B76E79] text-sm">{error}</p>}
                                                        {message && <p className="text-center text-[#B76E79] text-sm">{message}</p>}

                                                        <button
                                                                type="submit"
                                                                className="w-full py-4 bg-gradient-to-br from-[#B76E79] to-[#C5A880] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                                                                disabled={loading}
                                                        >
                                                                {loading ? (
                                                                        <div className="flex items-center justify-center gap-2">
                                                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                                                Creating Account...
                                                                        </div>
                                                                ) : "Become a Member"}
                                                        </button>
                                                </form>

                                                <div className="pt-6 border-t border-[#F5EDE1]">
                                                        <p className="text-center text-[#6B4E4D]/80">
                                                                Already have an account?{" "}
                                                                <Link to="/login" className="text-[#B76E79] hover:text-[#C5A880] transition-colors">
                                                                        Sign in
                                                                </Link>
                                                        </p>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
        );
};

export default Signup;