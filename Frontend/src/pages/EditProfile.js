import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, MapPin, Camera, Loader2, Link, ArrowLeft, Save, Lock } from 'lucide-react';

const EditProfile = () => {
        const [formData, setFormData] = useState({ name: "", email: "", phone: "", address: "" });
        const [message, setMessage] = useState("");
        const [loading, setLoading] = useState(false);

        const navigate = useNavigate();

        useEffect(() => {
                const fetchUserProfile = async () => {
                        try {
                                const token = localStorage.getItem("userToken");
                                if (!token) return navigate("/login");

                                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/profile`, {
                                        headers: { Authorization: `Bearer ${token}` },
                                });

                                setFormData({ name: data.name, email: data.email, phone: data.phone, address: data.address });
                        } catch (error) {
                                setMessage("❌ Failed to fetch user profile.");
                        }
                };
                fetchUserProfile();
        }, [navigate]);

        const handleChange = (e) => {
                setFormData({ ...formData, [e.target.name]: e.target.value });
        };

        const handleSubmit = async (e) => {
                e.preventDefault();
                try {

                        const token = localStorage.getItem("userToken");

                        await axios.put(`${process.env.REACT_APP_API_URL}/api/users/profile`, formData, {
                                headers: { Authorization: `Bearer ${token}` },
                        });

                        setMessage("✅ Profile updated successfully!");

                        setTimeout(() => {
                                setMessage("");
                                navigate("/profile");
                        }, 1500);
                } catch (error) {
                        setMessage("❌ Failed to update profile.");
                }

                setTimeout(() => {
                        setMessage("");
                }, 3000);
        };

        return (
                <div className="p-12 mt-[70px] flex flex-col justify-center relative overflow-hidden">
                        {/* Decorative Elements */}
                        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-gradient-to-br from-[#B76E79]/10 to-[#C5A880]/10 rounded-full blur-3xl" />
                        <div className="absolute -bottom-32 right-1/4 w-96 h-96 bg-gradient-to-tl from-[#C5A880]/10 to-transparent rounded-full blur-3xl" />

                        <div className="relative z-10 space-y-10">
                                {/* Enhanced Header */}
                                <div className="text-center space-y-4">
                                        <div className="inline-flex items-center gap-4 justify-center">
                                                <div className="w-12 h-px bg-[#B76E79]/40" />
                                                <h2 className="text-4xl font-serif text-[#6B4E4D]">Refine Your Profile</h2>
                                                <div className="w-12 h-px bg-[#B76E79]/40" />
                                        </div>
                                        <p className="text-[#6B4E4D]/80 text-lg">Curate your luxury experience</p>
                                </div>

                                {/* Profile Card */}
                                <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-[#E0D6CC] shadow-lg p-8">
                                        {/* Profile Section */}
                                        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                                                <div className="relative group">
                                                        <div className="absolute -inset-2 bg-gradient-to-br from-[#B76E79]/20 to-[#C5A880]/20 rounded-full blur-lg animate-pulse" />
                                                        <img
                                                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name || "User")}&background=0A1A2F&color=D4AF37&size=150`}
                                                                className="w-40 h-40 rounded-full border-2 border-[#F5EDE1] hover:border-[#B76E79]/40 transition-colors relative z-10"
                                                                alt="Profile"
                                                        />
                                                </div>
                                                <div className="flex-1 space-y-2 text-center md:text-left">
                                                        <h3 className="text-2xl font-serif text-[#6B4E4D]">Personal Details</h3>
                                                        <p className="text-[#6B4E4D]/80">Ensure your details reflect your exquisite taste</p>
                                                </div>
                                        </div>

                                        {/* Enhanced Form Layout */}
                                        <form onSubmit={handleSubmit} className="space-y-8">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                        {/* Left Column */}
                                                        <div className="space-y-6">
                                                                <div className="relative">
                                                                        <input
                                                                                type="text"
                                                                                name="name"
                                                                                value={formData.name}
                                                                                onChange={handleChange}
                                                                                className="w-full px-6 py-4 bg-[#FAF6F0] border-2 border-[#F5EDE1] rounded-xl focus:border-[#B76E79]/40 focus:ring-0 placeholder-[#C5A880] text-[#6B4E4D]"
                                                                                placeholder="Full Name"
                                                                                required
                                                                        />
                                                                        <div className="absolute right-4 top-3 p-2 rounded-lg">
                                                                                <User className="w-6 h-6 text-[#B76E79]" />
                                                                        </div>
                                                                </div>

                                                                <div className="relative">
                                                                        <input
                                                                                type="email"
                                                                                name="email"
                                                                                value={formData.email}
                                                                                onChange={handleChange}
                                                                                className="w-full px-6 py-4 bg-[#FAF6F0] border-2 border-[#F5EDE1] rounded-xl focus:border-[#B76E79]/40 focus:ring-0 placeholder-[#C5A880] text-[#6B4E4D]"
                                                                                placeholder="Email Address"
                                                                                required
                                                                        />
                                                                        <div className="absolute right-4 top-3 p-2 rounded-lg">
                                                                                <Mail className="w-6 h-6 text-[#B76E79]" />
                                                                        </div>
                                                                </div>
                                                        </div>

                                                        {/* Right Column */}
                                                        <div className="space-y-6">
                                                                <div className="relative">
                                                                        <input
                                                                                type="tel"
                                                                                name="phone"
                                                                                value={formData.phone}
                                                                                onChange={handleChange}
                                                                                className="w-full px-6 py-4 bg-[#FAF6F0] border-2 border-[#F5EDE1] rounded-xl focus:border-[#B76E79]/40 focus:ring-0 placeholder-[#C5A880] text-[#6B4E4D]"
                                                                                placeholder="Contact Number"
                                                                                required
                                                                        />
                                                                        <div className="absolute right-4 top-3 p-2 rounded-lg">
                                                                                <Phone className="w-6 h-6 text-[#B76E79]" />
                                                                        </div>
                                                                </div>

                                                                <div className="relative">
                                                                        <input
                                                                                type="text"
                                                                                name="address"
                                                                                value={formData.address}
                                                                                onChange={handleChange}
                                                                                className="w-full px-6 py-4 bg-[#FAF6F0] border-2 border-[#F5EDE1] rounded-xl focus:border-[#B76E79]/40 focus:ring-0 placeholder-[#C5A880] text-[#6B4E4D]"
                                                                                placeholder="Shipping Address"
                                                                                required
                                                                        />
                                                                        <div className="absolute right-4 top-3 p-2 rounded-lg">
                                                                                <MapPin className="w-6 h-6 text-[#B76E79]" />
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>

                                                {/* Enhanced Action Section */}
                                                <div className="pt-8 border-t border-[#F5EDE1]">
                                                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                                                                <Link
                                                                        to="/profile"
                                                                        className="text-[#6B4E4D]/80 hover:text-[#B76E79] transition-colors flex items-center gap-2"
                                                                >
                                                                </Link>
                                                                <button
                                                                        type="submit"
                                                                        className="px-10 py-5 bg-gradient-to-br from-[#B76E79] to-[#C5A880] text-white rounded-xl font-semibold hover:shadow-xl transition-all relative overflow-hidden group"
                                                                        disabled={loading}
                                                                >
                                                                        <span className="relative z-10 flex items-center gap-3">
                                                                                {loading ? (
                                                                                        <>
                                                                                                <Loader2 className="w-6 h-6 animate-spin" />
                                                                                                Updating...
                                                                                        </>
                                                                                ) : (
                                                                                        <>
                                                                                                <Save className="w-6 h-6 transition-transform group-hover:scale-110" />
                                                                                                Save Refinements
                                                                                        </>
                                                                                )}
                                                                        </span>
                                                                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                                </button>
                                                        </div>
                                                </div>
                                        </form>
                                </div>

                                {/* Enhanced Security Assurance */}
                                <div className="text-center space-y-2">
                                        <div className="flex items-center justify-center gap-3 text-[#6B4E4D]/80">
                                                <Lock className="w-5 h-5 text-[#B76E79]" />
                                                <span className="text-sm"> •  All Errors are logged</span>
                                        </div>
                                </div>
                        </div>
                </div>
        );
};

export default EditProfile;
