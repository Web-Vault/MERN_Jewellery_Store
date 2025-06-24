import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaGem, FaPinterest, FaWhatsapp, FaRegEnvelope, FaClock, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
        return (
                <footer className="relative bg-[#FAF6F0] border-t border-[#E0D6CC] pt-16 pb-12 overflow-hidden">
                        {/* Decorative Elements */}
                        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-gradient-to-br from-[#B76E79]/10 to-[#C5A880]/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-[#FAF6F0] to-[#F5EDE1]/50 rounded-full blur-2xl" />

                        <div className="max-w-7xl mx-auto px-6 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">

                                        {/* Brand Section */}
                                        <div className="space-y-6">
                                                <div className="group w-fit mx-auto md:mx-0">
                                                        <img
                                                                src="product_images/logo.png"
                                                                alt="JewelStore"
                                                                className="h-16 transition-transform duration-300 group-hover:scale-105"
                                                        />
                                                </div>
                                                <p className="text-[#6B4E4D]/80 text-lg italic">
                                                        "Where timeless elegance meets modern craftsmanship"
                                                </p>
                                                <div className="flex justify-center md:justify-start space-x-4">
                                                        {[FaInstagram, FaPinterest, FaWhatsapp, FaYoutube].map((Icon, idx) => (
                                                                <a
                                                                        key={idx}
                                                                        href="#"
                                                                        className="p-2.5 bg-[#B76E79]/10 rounded-lg hover:bg-[#B76E79]/20 transition-all text-[#6B4E4D] hover:text-[#B76E79]"
                                                                >
                                                                        <Icon className="w-6 h-6" />
                                                                </a>
                                                        ))}
                                                </div>
                                        </div>

                                        {/* Collections */}
                                        <div>
                                                <h3 className="text-2xl font-serif text-[#B76E79] mb-6">Collections</h3>
                                                <ul className="space-y-4">
                                                        {['Bridal Sets', 'Statement Pieces', 'Vintage Revival', 'Custom Designs'].map((item) => (
                                                                <li key={item}>
                                                                        <a
                                                                                href="#"
                                                                                className="text-[#6B4E4D]/80 hover:text-[#B76E79] transition-colors flex items-center gap-3 group"
                                                                        >
                                                                                <div className="w-2 h-2 bg-[#B76E79]/20 rounded-full group-hover:bg-[#B76E79] transition-colors" />
                                                                                {item}
                                                                        </a>
                                                                </li>
                                                        ))}
                                                </ul>
                                        </div>

                                        {/* Contact */}
                                        <div>
                                                <h3 className="text-2xl font-serif text-[#B76E79] mb-6">Atelier Hours</h3>
                                                <div className="space-y-5 text-[#6B4E4D]/80">
                                                        <div className="flex items-center gap-4">
                                                                <div className="p-2 bg-[#B76E79]/10 rounded-lg">
                                                                        <FaClock className="w-6 h-6 text-[#B76E79]" />
                                                                </div>
                                                                <div>
                                                                        <p className="font-medium">Mon-Sat</p>
                                                                        <p>10:00 AM - 7:00 PM</p>
                                                                </div>
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                                <div className="p-2 bg-[#B76E79]/10 rounded-lg">
                                                                        <FaMapMarkerAlt className="w-6 h-6 text-[#B76E79]" />
                                                                </div>
                                                                <div>
                                                                        <p>123 Diamond District</p>
                                                                        <p>New York, NY 10036</p>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>

                                        {/* Newsletter */}
                                        <div>
                                                <h3 className="text-2xl font-serif text-[#B76E79] mb-6">Private Updates</h3>
                                                <form className="relative group">
                                                        <input
                                                                type="email"
                                                                placeholder="Your email address"
                                                                className="w-full px-6 py-4 bg-white border-2 border-[#E0D6CC] rounded-xl focus:border-[#B76E79]/40 pr-28 placeholder-[#6B4E4D]/60 text-[#6B4E4D] transition-all"
                                                        />
                                                        <button
                                                                type="submit"
                                                                className="absolute top-1/2 right-2 -translate-y-1/2 px-6 py-3 bg-gradient-to-r from-[#B76E79] to-[#C5A880] text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
                                                        >
                                                                <FaRegEnvelope className="w-5 h-5" />
                                                                {/* <span>Join</span> */}
                                                        </button>
                                                </form>
                                                <p className="mt-4 text-[#6B4E4D]/60 text-sm">
                                                        Receive exclusive collection previews and VIP event invites
                                                </p>
                                        </div>
                                </div>

                                {/* Decorative Divider */}
                                <div className="my-12 flex items-center gap-6">
                                        <div className="flex-1 h-px bg-gradient-to-r from-[#B76E79] to-transparent" />
                                        <FaGem className="text-[#B76E79] w-8 h-8 animate-pulse" />
                                        <div className="flex-1 h-px bg-gradient-to-l from-[#B76E79] to-transparent" />
                                </div>

                                {/* Copyright */}
                                <div className="text-center space-y-2">
                                        <p className="text-[#6B4E4D]/70">
                                                © {new Date().getFullYear()} JewelStore. All rights reserved
                                        </p>
                                        <div className="flex justify-center items-center gap-4 text-[#6B4E4D]/60 text-sm">
                                                <a href="#" className="hover:text-[#B76E79] transition-colors">Privacy Policy</a>
                                                <span className="w-1 h-1 bg-[#B76E79]/40 rounded-full" />
                                                <a href="#" className="hover:text-[#B76E79] transition-colors">Terms of Service</a>
                                                <span className="w-1 h-1 bg-[#B76E79]/40 rounded-full" />
                                                <a href="#" className="hover:text-[#B76E79] transition-colors">Contact</a>
                                        </div>
                                </div>
                        </div>
                </footer>

        );
};

export default Footer;
