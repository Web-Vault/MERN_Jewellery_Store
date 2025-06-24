import { useState, useEffect } from 'react';
import { Heart, ShoppingCart, ChevronRight } from 'react-feather';
import { Sparkles } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const CollectionsPage = () => {
  const [collections, setCollections] = useState([]);
  const [activeCollection, setActiveCollection] = useState(0);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/collections`);
        setCollections(data);
      } catch (error) {
        console.error("Error fetching collections:", error);
        setMessage("Failed to load collections. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  const showMessage = (msg, type = 'info') => {
    setMessage({ text: msg, type });
    setTimeout(() => setMessage(""), 3000);
  };

  const addToCart = async (product) => {
    if (!product || !product._id) {
      showMessage("Invalid product data", "error");
      return;
    }

    const token = localStorage.getItem("userToken");
    if (!token) {
      showMessage("Please login to add items to cart", "error");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/cart/add`,
        { productId: product._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      showMessage("Added to cart successfully!", "success");
    } catch (error) {
      console.error("Error adding to cart:", error);
      showMessage(error.response?.data?.message || "Failed to add to cart", "error");
    }
  };

  const addToWishList = async (product) => {
    if (!product || !product._id) {
      showMessage("Invalid product data", "error");
      return;
    }

    const token = localStorage.getItem("userToken");
    if (!token) {
      showMessage("Please login to add items to wishlist", "error");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/wishlist/add/${product._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      showMessage("Added to wishlist successfully!", "success");
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      showMessage(error.response?.data?.message || "Failed to add to wishlist", "error");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5EFE8] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B76E79] mx-auto"></div>
          <p className="mt-4 text-[#6B4E4D]">Loading collections...</p>
        </div>
      </div>
    );
  }

  if (collections.length === 0) {
    return (
      <div className="min-h-screen bg-[#F5EFE8] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#6B4E4D] text-xl">No collections found</p>
        </div>
      </div>
    );
  }

  // Calculate card width based on position
  const getCardWidth = (index) => {
    if (index === 0) return "lg:col-span-6"; // First card (50%)
    if ((index + 1) % 5 === 0) return "lg:col-span-6"; // Every 5th card (50%)
    return "lg:col-span-3"; // Default (25%)
  };

  return (
    <div className="min-h-screen bg-[#F5EFE8]">
      {/* Message Display */}
      {message && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
          message.type === 'error' ? 'bg-red-100 text-red-800' :
          message.type === 'success' ? 'bg-green-100 text-green-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          {message.text}
        </div>
      )}

      {/* Hero Section */}
      <section className="relative mt-[80px]  h-[50vh] flex items-center justify-center bg-[#6B4E4D] overflow-hidden animate-fade-in">
        <div className="absolute inset-0 opacity-20">
          <img src="https://picsum.photos/1920/1080?pattern" className="w-full h-full object-cover" alt="" />
        </div>
        <div className="relative text-center z-10 max-w-4xl px-4">
          <h1 className="text-5xl md:text-6xl font-serif text-[#F5EFE8] mb-6 animate-slide-up">
            Curated Luxury
          </h1>
          <p className="text-xl text-[#E0D6CC] font-light max-w-2xl mx-auto animate-fade-in delay-200">
            Discover exclusive jewelry collections crafted for distinction
          </p>
        </div>
      </section>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Sidebar & Banner Section */}
        <div className="flex flex-col lg:flex-row gap-8 mb-16">
          {/* Sidebar */}
          <aside className="lg:w-80 bg-white/90 backdrop-blur-lg rounded-xl shadow-lg border border-[#E0D6CC] h-fit lg:sticky lg:top-24 animate-slide-up">
            <div className="p-6">
              <h3 className="text-2xl font-serif text-[#6B4E4D] mb-6">Collections</h3>
              <nav className="space-y-3">
                {collections.map((collection, index) => (
                  <button
                    key={collection._id}
                    onClick={() => setActiveCollection(index)}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between transition-all
                      ${activeCollection === index
                        ? 'bg-[#B76E79]/10 text-[#B76E79]'
                        : 'hover:bg-[#F5EFE8] text-[#6B4E4D]'}`}
                  >
                    <span>{collection.collectionName}</span>
                    <ChevronRight className="w-5 h-5 transform transition-transform group-hover:translate-x-1" />
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Collection Banner */}
          <div className="flex-1 bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in">
            <div className="relative aspect-[3/1]">
              <img
                src={collections[activeCollection].collectionBannerImage}
                className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
                alt=""
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#6B4E4D]/90 to-transparent flex items-center p-12">
                <div className="max-w-2xl space-y-4">
                  <h2 className="text-4xl font-serif text-[#F5EFE8] mb-4 animate-slide-up">
                    {collections[activeCollection].collectionName}
                  </h2>
                  <p className="text-lg text-[#E0D6CC] animate-fade-in delay-300">
                    {collections[activeCollection].collectionDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {collections[activeCollection].collectionProducts.map((product, index) => (
            <div
              key={product._id}
              className={`group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all h-[400px] ${getCardWidth(index)}`}
            >
              <Link to={`/product/${product._id}`} className="block h-full">
                <div className="h-full w-full overflow-hidden">
                  <img
                    src={product.productImage}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    alt={product.productName}
                  />
                </div>
              </Link>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#6B4E4D]/90 via-[#6B4E4D]/40 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-300 w-full">
                  <div className="border-t-2 border-[#C5A880]/30 pt-4">
                    <Link to={`/product/${product._id}`} className="block">
                      <h3 className="text-xl font-medium text-[#F5EFE8] mb-2 hover:text-[#C5A880] transition-colors">
                        {product.productName}
                      </h3>
                    </Link>
                    <div className="flex items-center justify-between">
                      <span className="text-lg text-[#C5A880]">
                        ₹{product.productPrice}
                      </span>
                      <div className="flex gap-2">
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addToCart(product);
                          }} 
                          className="p-2 bg-[#B76E79]/90 text-white rounded-lg hover:bg-[#9d5a64] transition"
                        >
                          <ShoppingCart className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addToWishList(product);
                          }} 
                          className="p-2 bg-[#B76E79]/90 text-white rounded-lg hover:bg-[#9d5a64] transition"
                        >
                          <Heart className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animated Accent Section */}
      <div className="py-6 bg-[#6B4E4D]">
        <div className="flex gap-12 overflow-hidden whitespace-nowrap">
          {Array(8).fill().map((_, i) => (
            <div key={i} className="flex items-center gap-4 text-[#C5A880]">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span className="font-serif">Luxury Craftsmanship</span>
            </div>
          ))}
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
        .animate-slide-up { animation: slide-up 0.8s ease-out; }
        .animate-pulse { animation: pulse 2s ease-in-out infinite; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
      `}</style>
    </div>
  );
};

export default CollectionsPage;