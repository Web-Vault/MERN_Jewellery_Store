import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  ShoppingCart,
  Package,
  LogOut,
  Menu,
  X,
  SearchIcon,
} from "lucide-react";
import axios from "axios";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("userToken");
      setIsAuthenticated(!!token);
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const offset = 100; // Adjust this value to change when the transformation triggers
      setIsScrolled(window.scrollY > offset);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    window.dispatchEvent(new Event("storage"));
    navigate("/");
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/search`, {
        params: { q: searchQuery }
      });

      if (response.data.success) {
        if (response.data.products.length === 0) {
          setSearchResults([]);
          setError("No products found matching your search criteria");
        } else {
          setSearchResults(response.data.products);
          setError(null);
        }
      } else {
        setError(response.data.message || "Error performing search");
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      setError(error.response?.data?.message || "Error performing search");
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed left-1/2 transform -translate-x-1/2 z-50 flex items-center justify-between px-6 py-3 transition-all duration-500 [transition-property:all] ease-out ${
          isScrolled
            ? "top-6 w-[90%] md:w-[80%] shadow-xl bg-white/70 backdrop-blur-lg border border-[#e0d6cc] scale-100"
            : "top-0 w-full bg-[#fff8f5] border-b-2 border-[#f5e6e0]"
        } ${
          isMobileMenuOpen
            ? "rounded-t-2xl rounded-b-none"
            : isScrolled
            ? "rounded-2xl"
            : "rounded-none"
        }`}
        style={{
          opacity: isScrolled ? 1 : 0.95,
        }}
      >
        {/* Animated Logo Container */}
        <div className="flex items-center space-x-3 relative group">
          <button
            className="md:hidden text-gray-800 hover:text-[#b76e79] transition-transform hover:scale-110"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-7 h-7 animate-spin-in" />
            ) : (
              <Menu className="w-7 h-7 animate-pulse-once" />
            )}
          </button>
          <Link
            to="/"
            className="relative hover:rotate-[2deg] transition-transform duration-300"
          >
            <img
              src="product_images/logo.png"
              alt="JewelStore"
              className={`h-12 md:h-14 transition-all duration-500 ${
                !isScrolled
                  ? "drop-shadow-[0_10px_15px_rgba(183,110,121,0.3)]"
                  : "shadow-none"
              }`}
            />
            {!isScrolled && (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fff8f500_0%,#fff8f5_100%)] mix-blend-soft-light animate-shine" />
            )}
          </Link>
        </div>

        {/* Rest of your navbar content remains the same */}
        <div className="hidden md:flex space-x-8 text-gray-900 font-medium text-lg">
          <Link
            to="/"
            className="relative group transition-all hover:!opacity-100"
          >
            <span className="block transform transition-all duration-500 group-hover:translate-y-[-2px]">
              Home
            </span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#b76e79] origin-left transform scale-x-0 group-hover:scale-x-100 transition-all duration-300" />
            <div className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-10 bg-[#b76e79] blur-md transition-opacity duration-300" />
          </Link>
          <Link
            to="/products"
            className="relative group transition-all hover:!opacity-100"
          >
            <span className="block transform transition-all duration-500 group-hover:translate-y-[-2px]">
              Products
            </span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#b76e79] origin-left transform scale-x-0 group-hover:scale-x-100 transition-all duration-300" />
            <div className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-10 bg-[#b76e79] blur-md transition-opacity duration-300" />
          </Link>
          <Link
            to="/collections"
            className="relative group transition-all hover:!opacity-100"
          >
            <span className="block transform transition-all duration-500 group-hover:translate-y-[-2px]">
              Collections
            </span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#b76e79] origin-left transform scale-x-0 group-hover:scale-x-100 transition-all duration-300" />
            <div className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-10 bg-[#b76e79] blur-md transition-opacity duration-300" />
          </Link>
          <Link
            to="/contact"
            className="relative group transition-all hover:!opacity-100"
          >
            <span className="block transform transition-all duration-500 group-hover:translate-y-[-2px]">
              Contact
            </span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#b76e79] origin-left transform scale-x-0 group-hover:scale-x-100 transition-all duration-300" />
            <div className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-10 bg-[#b76e79] blur-md transition-opacity duration-300" />
          </Link>
        </div>
        {/* User Actions */}
        <div className="flex items-center space-x-5">
          {isAuthenticated ? (
            <>
              <button onClick={() => setIsSearchOpen((prev) => !prev)}>
                <SearchIcon className="w-7 h-7 text-gray-800 hover:text-[#b76e79] transition" />
              </button>
              <Link to="/cart">
                <ShoppingCart className="w-7 h-7 text-gray-800 hover:text-[#b76e79] transition" />
              </Link>
              <Link to="/order-history">
                <Package className="w-7 h-7 text-gray-800 hover:text-[#b76e79] transition" />
              </Link>
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="relative focus:outline-none"
                >
                  <User className="w-7 h-7 text-gray-800 hover:text-[#b76e79] transition" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-44 bg-white shadow-lg rounded-lg py-2 border border-[#e0d6cc]">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/wishlist"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Wishlist
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4 inline-block mr-2" /> Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="relative overflow-hidden px-6 py-2 bg-[#b76e79] text-white rounded-lg shadow-md hover:bg-[#9d5a64] transition-all hover:shadow-lg hover:scale-105"
            >
              <span className="relative z-10">Login</span>
              <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-20 transition-opacity duration-300" />
              <div className="absolute inset-0 animate-shimmer bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%)] bg-[length:250%_250%] opacity-20 mix-blend-soft-light" />
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <div
          className={`absolute top-full left-0 w-full bg-white/70 backdrop-blur-lg shadow-xl px-6 py-3 border border-[#e0d6cc] overflow-hidden transition-all duration-500 ${
            isMobileMenuOpen
              ? "max-h-[300px] py-4 opacity-100 rounded-b-2xl"
              : "max-h-0 opacity-0"
          }`}
        >
          <Link
            to="/"
            className="block py-3 text-lg text-gray-900 hover:ml-5 transition-all pl-0 hover:pl-4 border-l-4 border-transparent hover:border-[#b76e79]"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="block py-3 text-lg text-gray-900 hover:ml-5 transition-all pl-0 hover:pl-4 border-l-4 border-transparent hover:border-[#b76e79]"
          >
            Products
          </Link>
          <Link
            to="/collections"
            className="block py-3 text-lg text-gray-900 hover:ml-5 transition-all pl-0 hover:pl-4 border-l-4 border-transparent hover:border-[#b76e79]"
          >
            collections
          </Link>
          <Link
            to="/contact"
            className="block py-3 text-lg text-gray-900 hover:ml-5 transition-all pl-0 hover:pl-4 border-l-4 border-transparent hover:border-[#b76e79]"
          >
            Contact
          </Link>
        </div>
      </nav>
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
          <div className="bg-[#fff8f5] rounded-lg shadow-xl w-full max-w-2xl mx-4 p-6 border border-[#e0d6cc]">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products (e.g., 'gold ring under 5000')"
                className="w-full px-4 py-3 pr-12 rounded-lg border border-[#e0d6cc] focus:border-[#B76E79] focus:ring-2 focus:ring-[#B76E79]/20 outline-none transition bg-white/80 backdrop-blur-sm"
                autoFocus
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B76E79] hover:text-[#9d5a64] transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-[#B76E79] border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <SearchIcon className="w-5 h-5" />
                )}
              </button>
              
              {error && (
                <div className="mt-2 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
                  {error}
                </div>
              )}
              
              {searchResults.length > 0 && (
                <div className="mt-2 bg-white/90 backdrop-blur-sm border border-[#e0d6cc] rounded-lg shadow-lg max-h-96 overflow-y-auto">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      className="block p-4 hover:bg-[#fff8f5] border-b border-[#e0d6cc] last:border-b-0 transition-colors"
                      onClick={() => {
                        setSearchQuery("");
                        setSearchResults([]);
                        setIsSearchOpen(false);
                      }}
                    >
                      <div className="flex items-center space-x-4">
                        {product.images && product.images[0] && (
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-[#e0d6cc]">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 group-hover:text-[#B76E79] transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-500">{product.category}</p>
                          <p className="text-sm font-medium text-[#B76E79]">₹{product.price.toLocaleString()}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </form>
            <button
              onClick={() => {
                setIsSearchOpen(false);
                setSearchQuery("");
                setError(null);
                setSearchResults([]);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-[#B76E79] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
