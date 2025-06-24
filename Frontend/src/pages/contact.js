import React from "react";
import { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";


const Contact = () => {

        const [name, setName] = useState("");
        const [email, setEmail] = useState("");
        const [message, setMessage] = useState("");


        return (
                <div className="relative min-h-screen flex items-center justify-center bg-[#FAF6F0] overflow-hidden px-6 py-20">
                        {/* Decorative Elements */}
                        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gradient-to-br from-[#B76E79]/10 to-[#C5A880]/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-1/3 -right-32 w-64 h-64 bg-gradient-to-tl from-[#FAF6F0] to-[#F5EDE1]/50 rounded-full blur-2xl" />

                        {/* Main Content Container */}
                        <div className="relative z-10 w-full max-w-6xl flex flex-col lg:flex-row items-stretch bg-white/90 backdrop-blur-sm rounded-[40px] border border-[#E0D6CC] shadow-2xl overflow-hidden">

                                {/* Left Panel - Decorative Accent */}
                                <div className="lg:w-1/3 bg-gradient-to-br from-[#B76E79]/10 to-[#C5A880]/10 p-12 flex flex-col justify-between">
                                        <div className="space-y-10">
                                                <h2 className="text-5xl font-serif text-[#6B4E4D] leading-tight">
                                                        Crafting Connections<br />
                                                        <span className="text-[#B76E79]">Through Luxury</span>
                                                </h2>

                                                <div className="space-y-8">
                                                        <div className="flex items-center gap-4 group">
                                                                <div className="p-3 bg-[#B76E79]/10 rounded-xl transition-all group-hover:bg-[#B76E79]/20">
                                                                        <MapPin className="w-8 h-8 text-[#B76E79] transition-colors" />
                                                                </div>
                                                                <div>
                                                                        <h3 className="font-serif text-[#6B4E4D] text-lg">Visit Our Atelier</h3>
                                                                        <p className="text-[#6B4E4D]/80">123 Luxury Avenue</p>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>

                                        {/* Signature Element */}
                                        <div className="mt-16 border-t border-[#E0D6CC] pt-6">
                                                <p className="font-serif text-[#6B4E4D]/80 italic">
                                                        "Where every gem tells a story,<br />
                                                        and every connection sparkles"
                                                </p>
                                        </div>
                                </div>

                                {/* Right Panel - Contact Form */}
                                <div className="lg:w-2/3 p-12 lg:p-16 space-y-10">
                                        <div className="space-y-4">
                                                <h3 className="text-4xl font-serif text-[#6B4E4D]">
                                                        Personal Luxury<br />
                                                        <span className="text-[#B76E79]">Consultation</span>
                                                </h3>
                                                <p className="text-[#6B4E4D]/80 max-w-xl">
                                                        Begin your bespoke jewelry journey with our master artisans.
                                                        Share your vision and we'll craft perfection.
                                                </p>
                                        </div>

                                        <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                {/* Form Column 1 */}
                                                <div className="space-y-8">
                                                        <div className="space-y-4">
                                                                <label className="block font-serif text-[#6B4E4D]">Your Name</label>
                                                                <input
                                                                        type="text"
                                                                        className="w-full px-6 py-4 bg-[#FAF6F0] border border-[#E0D6CC] rounded-2xl focus:ring-2 focus:ring-[#B76E79]/50 focus:border-transparent"
                                                                        placeholder="First & Last Name"
                                                                />
                                                        </div>

                                                        <div className="space-y-4">
                                                                <label className="block font-serif text-[#6B4E4D]">Preferred Contact</label>
                                                                <input
                                                                        type="email"
                                                                        className="w-full px-6 py-4 bg-[#FAF6F0] border border-[#E0D6CC] rounded-2xl focus:ring-2 focus:ring-[#B76E79]/50 focus:border-transparent"
                                                                        placeholder="Email or Phone Number"
                                                                />
                                                        </div>
                                                </div>

                                                {/* Form Column 2 */}
                                                <div className="space-y-8">
                                                        <div className="space-y-4">
                                                                <label className="block font-serif text-[#6B4E4D]">Occasion</label>
                                                                <select className="w-full px-6 py-4 bg-[#FAF6F0] border border-[#E0D6CC] rounded-2xl focus:ring-2 focus:ring-[#B76E79]/50 appearance-none">
                                                                        <option>Engagement</option>
                                                                        <option>Anniversary</option>
                                                                        <option>Custom Design</option>
                                                                        <option>Special Event</option>
                                                                </select>
                                                        </div>

                                                        <div className="space-y-4">
                                                                <label className="block font-serif text-[#6B4E4D]">Your Vision</label>
                                                                <textarea
                                                                        className="w-full h-32 px-6 py-4 bg-[#FAF6F0] border border-[#E0D6CC] rounded-2xl focus:ring-2 focus:ring-[#B76E79]/50 focus:border-transparent"
                                                                        placeholder="Describe your dream piece..."
                                                                />
                                                        </div>
                                                </div>

                                                {/* Full Width Submit */}
                                                <div className="md:col-span-2 pt-8">
                                                        <button className="w-full py-5 bg-gradient-to-r from-[#B76E79] to-[#C5A880] hover:from-[#C5A880] hover:to-[#B76E79] text-white rounded-2xl font-serif text-lg tracking-wide shadow-lg hover:shadow-xl transition-all">
                                                                Schedule Private Consultation
                                                        </button>
                                                </div>
                                        </form>
                                </div>

                                {/* Vertical Divider */}
                                <div className="absolute left-1/3 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#E0D6CC] to-transparent hidden lg:block" />
                        </div>
                </div> 
        );
};
export default Contact;
