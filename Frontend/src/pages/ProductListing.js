import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import axios from "axios";
import { Search, Check, Heart, ShoppingCart, PackageOpen } from 'lucide-react'

const ProductListing = () => {
        const [products, setProducts] = useState([]);
        const [categories, setCategories] = useState([]); // Fetch categories dynamically
        const [searchQuery, setSearchQuery] = useState("");
        const [selectedCategories, setSelectedCategories] = useState([]);
        const [priceRange, setPriceRange] = useState(20000);
        const [message, setMessage] = useState(""); // State for feedback messages
        const [loading, setLoading] = useState(true); // Add loading state

        useEffect(() => {
                const fetchProducts = async () => {
                        try {
                                setLoading(true);
                                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);
                                setProducts(response.data);
                        } catch (error) {
                                console.error("Error fetching products:", error);
                                setMessage("Failed to load products. Please try again later.");
                        } finally {
                                setLoading(false);
                        }
                };

                const fetchCategories = async () => {
                        try {
                                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/categories/admin/categories`);
                                // Ensure we have the correct category structure
                                const formattedCategories = response.data.categories.map(cat => ({
                                        _id: cat._id,
                                        name: cat.name || cat.categoryName, // Handle both possible field names
                                        description: cat.description || cat.categoryDescription
                                }));
                                setCategories(formattedCategories);
                        } catch (error) {
                                console.error("Error fetching categories:", error);
                                setMessage("Failed to load categories. Please try again later.");
                        }
                };

                fetchProducts();
                fetchCategories();
        }, []);

        const handleCategoryChange = (categoryId) => {
                setSelectedCategories(prev => 
                        prev.includes(categoryId)
                                ? prev.filter(id => id !== categoryId)
                                : [...prev, categoryId]
                );
        };

        const handleAddToCart = async (id) => {
                const token = localStorage.getItem("userToken");
                if (!token) {
                        setMessage("⚠️ Please log in to add items to the cart.");
                        return;
                }

                try {
                        const response = await axios.post(
                                `${process.env.REACT_APP_API_URL}/api/cart/add`,
                                { productId: id },
                                {
                                        headers: {
                                                Authorization: `Bearer ${token}`,
                                                "Content-Type": "application/json"
                                        }
                                }
                        );

                        if (response.data) {
                                setMessage("✅ Item added to cart successfully!");
                        }
                } catch (error) {
                        console.error("Error adding to cart:", error);
                        setMessage(error.response?.data?.message || "❌ Error adding to cart");
                }

                setTimeout(() => setMessage(""), 3000);
        };

        const handleAddToWishlist = async (id) => {
                const token = localStorage.getItem("userToken");
                if (!token) {
                        setMessage("⚠️ Please log in to add items to your wishlist.");
                        return;
                }

                try {
                        const response = await axios.post(
                                `${process.env.REACT_APP_API_URL}/api/wishlist/add/${id}`,
                                {},
                                {
                                        headers: {
                                                Authorization: `Bearer ${token}`,
                                                "Content-Type": "application/json"
                                        }
                                }
                        );

                        if (response.data) {
                                setMessage("❤️ Added to wishlist!");
                        }
                } catch (error) {
                        console.error("Error adding to wishlist:", error);
                        setMessage(error.response?.data?.message || "❌ Failed to add to wishlist");
                }

                setTimeout(() => setMessage(""), 3000);
        };

        const filteredProducts = products.filter((product) => {
                const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesCategory = selectedCategories.length === 0 || 
                        selectedCategories.includes(product.category?._id) || 
                        selectedCategories.includes(product.category);
                const matchesPrice = product.price <= priceRange;
                return matchesSearch && matchesCategory && matchesPrice;
        });

        const hideMessage = () => {
                setTimeout(() => {
                        setMessage("");
                }, 3000);
        };

        return (
                <div className="min-h-screen bg-[#FAF6F0] flex flex-col lg:flex-row">

                        {/* Floating Decorative Elements */}
                        <div className="fixed top-10 left-10 w-24 h-24 bg-[#B76E79]/10 rounded-full blur-xl"></div>
                        <div className="fixed bottom-16 right-16 w-32 h-32 bg-[#C5A880]/10 rounded-full blur-xl"></div>

                        {/* Sidebar */}
                        <aside className="lg:w-80 xl:w-96 p-6 lg:p-8 bg-white/90 backdrop-blur-sm lg:h-screenlg:sticky lg:top-0">
                                <div className="space-y-8">
                                        {/* Header */}
                                        <div className="border-b border-[#E0D6CC] mt-[110px] pb-6">
                                                <h2 className="text-2xl font-serif text-[#6B4E4D] mb-2">Refine Selection</h2>
                                                <p className="text-[#6B4E4D]/80">Find your perfect piece</p>
                                        </div>

                                        {/* Search */}
                                        <div className="space-y-6">
                                                <div>
                                                        <label className="block text-sm font-medium text-[#6B4E4D] mb-2">Search</label>
                                                        <div className="relative">
                                                                <input
                                                                        type="text"
                                                                        placeholder="Search jewelry..."
                                                                        className="w-full px-4 py-3 bg-[#FAF6F0] border border-[#E0D6CC] rounded-lg focus:ring-2 focus:ring-[#B76E79] focus:border-transparent"
                                                                        value={searchQuery}
                                                                        onChange={(e) => setSearchQuery(e.target.value)}
                                                                />
                                                                <Search className="absolute right-4 top-3.5 w-5 h-5 text-[#B76E79]" />
                                                        </div>
                                                </div>

                                                {/* Categories */}
                                                <div>
                                                        <h3 className="text-lg font-serif text-[#6B4E4D] mb-4">Categories</h3>
                                                        {loading ? (
                                                                <p className="text-[#6B4E4D]/60">Loading categories...</p>
                                                        ) : categories.length === 0 ? (
                                                                <p className="text-[#6B4E4D]/60">No categories found</p>
                                                        ) : (
                                                                <ul className="space-y-3">
                                                                        {categories.map((category) => (
                                                                                <li key={category._id} className="flex items-center">
                                                                                        <input
                                                                                                type="checkbox"
                                                                                                id={category._id}
                                                                                                className="peer hidden"
                                                                                                checked={selectedCategories.includes(category._id)}
                                                                                                onChange={() => handleCategoryChange(category._id)}
                                                                                        />
                                                                                        <label
                                                                                                htmlFor={category._id}
                                                                                                className="flex items-center w-full p-3 rounded-lg bg-[#FAF6F0] border border-[#E0D6CC] peer-checked:border-[#B76E79] peer-checked:bg-[#B76E79]/10 transition-colors cursor-pointer"
                                                                                        >
                                                                                                <span className="w-5 h-5 border-2 border-[#E0D6CC] rounded-sm mr-3 peer-checked:bg-[#B76E79] peer-checked:border-[#B76E79] flex items-center justify-center">
                                                                                                        <Check className="w-3 h-3 text-white hidden peer-checked:block" />
                                                                                                </span>
                                                                                                <span className="text-[#6B4E4D]">{category.name}</span>
                                                                                        </label>
                                                                                </li>
                                                                        ))}
                                                                </ul>
                                                        )}
                                                </div>

                                                {/* Price Range */}
                                                <div>
                                                        <h3 className="text-lg font-serif text-[#6B4E4D] mb-4">Price Range</h3>
                                                        <div className="space-y-4">
                                                                <input
                                                                        type="range"
                                                                        className="w-full range accent-[#B76E79]"
                                                                        min="0"
                                                                        max="50000"
                                                                        value={priceRange}
                                                                        onChange={(e) => setPriceRange(e.target.value)}
                                                                />
                                                                <div className="flex justify-between text-[#6B4E4D]/80">
                                                                        <span>₹0</span>           
                                                                        <span>₹{priceRange}</span> {/* Display dynamic value */}
                                                                </div>
                                                        </div>
                                                </div>
                                                
                                        </div>
                                </div>
                        </aside>

                        {/* Main Content */}
                        <main className="flex-1 p-6 mt-[110px] lg:p-8">
                                <div className="max-w-7xl mx-auto">
                                        {/* Header */}
                                        <div className="mb-8">
                                                <h1 className="text-3xl lg:text-4xl font-serif text-[#6B4E4D] mb-2">Curated Collection</h1>
                                                <p className="text-[#6B4E4D]/80">{filteredProducts.length} exquisite pieces found</p>
                                        </div>

                                        {message && <p> {message} </p>}

                                        {/* Products Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {filteredProducts.map((product) => (
                                                        <div key={product._id} className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                                                                {/* Image Container */}
                                                                <div className="relative aspect-square overflow-hidden rounded-t-xl">
                                                                        <img
                                                                                src={product.images[0]} 
                                                                                alt={product.name}
                                                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                                        />

                                                                        {/* Overlay */}
                                                                        <div className="absolute inset-0 bg-gradient-to-t from-[#6B4E4D]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                                                                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 transition-transform">
                                                                                        <div className="flex gap-2">
                                                                                                <Link
                                                                                                        to={`/product/${product._id}`}
                                                                                                        className="flex-1 py-2 text-center bg-white/90 backdrop-blur-sm text-[#B76E79] rounded-md hover:bg-[#B76E79] hover:text-white transition"
                                                                                                >
                                                                                                        View Details
                                                                                                </Link>
                                                                                                <button
                                                                                                        onClick={() => handleAddToCart(product._id)}
                                                                                                        className="p-2 bg-white/90 backdrop-blur-sm text-[#B76E79] rounded-md hover:bg-[#B76E79] hover:text-white transition"
                                                                                                >
                                                                                                        <ShoppingCart className="w-5 h-5" />
                                                                                                </button>
                                                                                        </div>
                                                                                </div>
                                                                        </div>
                                                                </div>

                                                                {/* Product Info */}
                                                                <div className="p-4">
                                                                        <h3 className="font-serif text-lg text-[#6B4E4D]">{product.name}</h3>
                                                                        <div className="mt-2 flex justify-between items-center">
                                                                                <p className="text-[#B76E79] font-medium">₹{product.price}</p>
                                                                                <button onClick={() => handleAddToWishlist(product._id)} className="p-1 text-[#6B4E4D] hover:text-[#B76E79]">
                                                                                        <Heart className="w-5 h-5" />
                                                                                </button>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                ))}
                                        </div>

                                        {/* Empty State */}
                                        {filteredProducts.length === 0 && (
                                                <div className="text-center py-12 space-y-4">
                                                        <PackageOpen className="w-12 h-12 text-[#B76E79] mx-auto" />
                                                        <p className="text-[#6B4E4D]/80">No products match your criteria</p>
                                                        <button
                                                                onClick={() => {
                                                                        setSearchQuery('');
                                                                        setSelectedCategories([]);
                                                                        setPriceRange(20000);
                                                                }}
                                                                className="text-[#B76E79] hover:text-[#C5A880] transition"
                                                        >
                                                                Clear Filters
                                                        </button>
                                                </div>
                                        )}
                                </div>
                        </main>
                </div>
        );
};

export default ProductListing;
