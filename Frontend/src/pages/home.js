import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, User, Heart, Eye } from "lucide-react";
import RecommendedProducts from "../components/RecommendedProducts.js";

const Home = () => {


        return (
                <div className="bg-[#FAF6F0]">
                        {/* Hero Section */}
                        <div className="relative overflow-hidden">
                                {/* Geometric Background Pattern */}
                                <div className="absolute inset-0 bg-[#F5EDE1] pattern-diagonal-lines pattern-[#D8B6A4] pattern-opacity-20 pattern-size-16" />

                                <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32 flex flex-col lg:flex-row items-center gap-16">
                                        {/* Text Content */}
                                        <div className="lg:w-1/2 space-y-8 z-10">
                                                <h1 className="text-5xl lg:text-6xl font-serif text-[#6B4E4D] leading-tight">
                                                        Crafted Elegance,<br />
                                                        <span className="text-[#B76E79]">Worn with Grace</span>
                                                </h1>
                                                <p className="text-xl text-[#6B4E4D]/80 max-w-2xl">
                                                        Discover bespoke jewelry pieces that tell your unique story through meticulously crafted details
                                                </p>

                                                {/* Interactive CTAs */}
                                                <div className="flex flex-col sm:flex-row gap-4">
                                                        <Link
                                                                to="/products"
                                                                className="px-8 py-3 bg-gradient-to-r from-[#B76E79] to-[#C5A880] text-white rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                                                        >
                                                                <Sparkles className="w-5 h-5" />
                                                                Explore Collection
                                                        </Link>
                                                        <Link
                                                                to="/contact"
                                                                className="px-8 py-3 border-2 border-[#B76E79] text-[#6B4E4D] rounded-lg hover:bg-[#B76E79]/10 transition-colors"
                                                        >
                                                                Create Your Design
                                                        </Link>
                                                </div>
                                        </div>

                                        {/* Featured Product Showcase */}
                                        <div className="lg:w-1/2 relative">
                                                <div className="relative group perspective-1000">
                                                        <div className="relative z-10 transform group-hover:rotate-y-6 transition-all duration-700">
                                                                <img
                                                                        src="/product_images/hero image.jpg"
                                                                        className="rounded-2xl shadow-2xl"
                                                                        alt="Featured Jewelry"
                                                                />
                                                        </div>
                                                        <div className="absolute top-8 -right-8 w-full h-full bg-[#C5A880]/20 rounded-2xl transform group-hover:translate-x-4 transition-all duration-500" />
                                                </div>
                                        </div>
                                </div>
                        </div>

                        {/* Curated Collections */}
                        <div className="bg-[#faf8f5] py-20">
                                <div className="max-w-7xl mx-auto px-6">
                                        <h2 className="text-3xl font-serif text-[#6B4E4D] text-center mb-16">
                                                Our Curated Collections
                                        </h2>
                                        <div className="flex flex-col md:flex-row gap-12">

                                                <div className="md:w-1/3 space-y-8 sticky top-24 h-fit">
                                                        <h2 className="text-3xl font-serif text-[#6B4E4D]">Collections</h2>
                                                        <nav className="space-y-4 border-l-2 border-[#B76E79]/30 pl-4">
                                                                {['Engagement', 'Bridal', 'Everyday', 'Statement'].map((category) => (
                                                                        <button
                                                                                key={category}
                                                                                className="block text-left text-[#6B4E4D]/80 hover:text-[#B76E79] pl-4 border-l-2 border-transparent hover:border-[#B76E79] transition-all"
                                                                        >
                                                                                {category} Pieces
                                                                        </button>
                                                                ))}
                                                        </nav>
                                                </div>

                                                {/* Grid Layout */}
                                                <RecommendedProducts />
                                        </div>
                                </div>
                        </div>

                        {/* Testimonials Carousel */}
                        <div className="py-24 bg-gradient-to-b from-[#FAF6F0] to-[#F5EDE1]">
                                <div className="max-w-7xl mx-auto px-6">
                                        <div className="flex flex-col lg:flex-row gap-12 items-center">
                                                {/* Testimonial Images */}
                                                {/* <div className="lg:w-1/3 relative">
                                                        <div className="grid grid-cols-2 gap-4">
                                                                {[1, 2, 3, 4].map((i) => (
                                                                        <div key={i} className="aspect-square overflow-hidden rounded-xl">
                                                                                <img
                                                                                        src={`https://source.unsplash.com/600x600/?jewelry-wear${i}`}
                                                                                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                                                                                        alt="Customer wearing jewelry"
                                                                                />
                                                                        </div>
                                                                ))}
                                                        </div>
                                                </div> */}

                                                {/* Testimonials Content */}
                                                <div className="lg:w-full space-y-8">
                                                        <h2 className="text-3xl font-serif text-[#6B4E4D]">Client Stories</h2>
                                                        <div className="space-y-8">
                                                                {[1, 2, 3].map((i) => (
                                                                        <div key={i} className="p-6 bg-white rounded-xl shadow-md border border-[#F5EDE1]">
                                                                                <p className="text-[#6B4E4D]/80 italic">"The craftsmanship exceeded all my expectations..."</p>
                                                                                <div className="mt-4 flex items-center gap-3">
                                                                                        <div className="w-12 h-12 rounded-full bg-[#B76E79]/10 flex items-center justify-center">
                                                                                                <User className="w-6 h-6 text-[#B76E79]" />
                                                                                        </div>
                                                                                        <div>
                                                                                                <h4 className="font-serif text-[#6B4E4D]">Sarah M.</h4>
                                                                                                <p className="text-sm text-[#6B4E4D]/60">Bridal Collection Client</p>
                                                                                        </div>
                                                                                </div>
                                                                        </div>
                                                                ))}
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>

        );

};
export default Home;
