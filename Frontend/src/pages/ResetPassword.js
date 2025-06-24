import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Key, Lock, LockKeyhole, CheckCircle, AlertCircle, ArrowLeft, ShieldCheck, Fingerprint, Loader2 } from 'lucide-react';

const ResetPassword = () => {
        const { token } = useParams();
        const navigate = useNavigate();
        const [password, setPassword] = useState("");
        const [confirmPassword, setConfirmPassword] = useState("");
        const [message, setMessage] = useState("");
        const [error, setError] = useState("");
        const [loading, setLoading] = useState(false); // Loading state


        const handleSubmit = async (e) => {
                e.preventDefault();
                setMessage("");
                setError("");

                if (password !== confirmPassword) {
                        setError("Passwords do not match!");
                        return;
                }

                try {
                        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/reset-password/${token}`, { password });
                        setMessage(data.message);
                        setTimeout(() => navigate("/login"), 2000);
                } catch (err) {
                        setError(err.response?.data?.message || "Error resetting password.");
                } finally {
                        setLoading(false);
                }
        };

        return (
                <div className="min-h-screen flex">
                        {/* Left Decorative Panel */}
                        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#B76E79] to-[#C5A880] items-center justify-center p-12 relative overflow-hidden">
                                {/* Background Pattern */}
                                <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>

                                {/* Content */}
                                <div className="relative z-10 text-center space-y-8 max-w-md">
                                        {/* Main Icon */}
                                        <div className="p-6 bg-white/20 backdrop-blur-lg rounded-full w-fit mx-auto">
                                                <ShieldCheck className="w-16 h-16 text-white" />
                                        </div>

                                        {/* Security Tips */}
                                        <div className="space-y-4 text-left">
                                                <h3 className="text-2xl font-serif text-white mb-4">Password Security Tips</h3>
                                                <div className="flex items-center gap-3 text-white/90">
                                                        <CheckCircle className="w-5 h-5 text-white" />
                                                        <span>Use at least 8 characters</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-white/90">
                                                        <CheckCircle className="w-5 h-5 text-white" />
                                                        <span>Include numbers & symbols</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-white/90">
                                                        <CheckCircle className="w-5 h-5 text-white" />
                                                        <span>Avoid common phrases</span>
                                                </div>
                                        </div>

                                        {/* Decorative Icons */}
                                        <div className="flex justify-center space-x-6 mt-8 opacity-50">
                                                <LockKeyhole className="w-8 h-8 text-white" />
                                                <Key className="w-8 h-8 text-white" />
                                                <Fingerprint className="w-8 h-8 text-white" />
                                        </div>
                                </div>
                        </div>

                        {/* Right Form Panel */}
                        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#FAF6F0] relative">
                                {/* Floating Elements for Mobile */}
                                <div className="absolute top-20 left-20 w-48 h-48 bg-[#B76E79]/10 rounded-full blur-2xl lg:hidden"></div>
                                <div className="absolute bottom-32 right-32 w-64 h-64 bg-[#C5A880]/10 rounded-full blur-2xl lg:hidden"></div>

                                {/* Form Container */}
                                <div className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl border border-white/30 p-8">
                                        {/* Header */}
                                        <div className="text-center space-y-1 mb-8">
                                                <Key className="w-12 h-12 text-[#B76E79] mx-auto mb-4" />
                                                <h2 className="text-3xl font-serif text-[#6B4E4D]">Reset Password</h2>
                                                <p className="text-[#6B4E4D]/80 mt-2">Create a new secure password</p>
                                        </div>

                                        {/* Form */}
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                                {/* Password Inputs */}
                                                <div className="relative">
                                                        <input
                                                                type="password"
                                                                placeholder="New Password"
                                                                value={password}
                                                                onChange={(e) => setPassword(e.target.value)}
                                                                className="w-full px-5 py-3.5 bg-white border-2 border-[#E0D6CC] rounded-xl
                                   placeholder-[#C5A880] text-[#6B4E4D] focus:border-[#B76E79]/40
                                   focus:ring-0 pr-12 transition-all"
                                                                required
                                                        />
                                                        <Lock className="absolute right-5 top-1/2 -translate-y-1/2 text-[#C5A880]" />
                                                </div>

                                                <div className="relative">
                                                        <input
                                                                type="password"
                                                                placeholder="Confirm Password"
                                                                value={confirmPassword}
                                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                                className="w-full px-5 py-3.5 bg-white border-2 border-[#E0D6CC] rounded-xl
                                   placeholder-[#C5A880] text-[#6B4E4D] focus:border-[#B76E79]/40
                                   focus:ring-0 pr-12 transition-all"
                                                                required
                                                        />
                                                        <LockKeyhole className="absolute right-5 top-1/2 -translate-y-1/2 text-[#C5A880]" />
                                                </div>

                                                {/* Submit Button */}
                                                <button
                                                        type="submit"
                                                        className="w-full bg-gradient-to-br from-[#B76E79] to-[#C5A880] text-white 
                             py-4 rounded-xl font-medium hover:shadow-lg transition-all
                             hover:from-[#C5A880] hover:to-[#B76E79] disabled:opacity-50"
                                                        disabled={loading}
                                                >
                                                        {loading ? (
                                                                <div className="flex items-center justify-center gap-2">
                                                                        <Loader2 className="w-5 h-5 animate-spin" />
                                                                        Updating...
                                                                </div>
                                                        ) : (
                                                                'Reset Password'
                                                        )}
                                                </button>
                                        </form>

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

                                        {/* Back to Login */}
                                        <div className="mt-8 text-center">
                                                <a href="/login" className="text-[#6B4E4D]/80 hover:text-[#B76E79] transition-colors
                                inline-flex items-center gap-1">
                                                        <ArrowLeft className="w-4 h-4" />
                                                        Return to Login
                                                </a>
                                        </div>
                                </div>
                        </div>
                </div>
        );
};

export default ResetPassword;
