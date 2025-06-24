import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.state?.results) {
      setResults(location.state.results);
    }
    if (location.state?.error) {
      setMessage(`❌ ${location.state.error}`);
      setTimeout(() => setMessage(""), 3000);
    }
  }, [location]);

  const handleAddToCart = async (id) => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("userToken");

    if (!userId || !token) {
      setMessage("⚠️ Please log in to add items to the cart.");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, productId: id }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Item added to cart successfully!");
      } else {
        setMessage(`❌ ${data.message || "Error adding to cart"}`);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      setMessage("❌ Server error while adding to cart.");
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
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/wishlist/add/${id}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setMessage("❤️ Added to wishlist!");
      } else {
        setMessage(`❌ ${data.message || "Failed to add to wishlist."}`);
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      setMessage("❌ Server error while adding to wishlist.");
    }

    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="min-h-screen mt-[110px] bg-[#FAF6F0] py-12 px-4 sm:px-6 lg:px-8">
      {/* Floating Decorative Elements */}
      <div className="fixed top-10 left-10 w-24 h-24 bg-[#B76E79]/10 rounded-full blur-xl"></div>
      <div className="fixed bottom-16 right-16 w-32 h-32 bg-[#C5A880]/10 rounded-full blur-xl"></div>

      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-serif text-[#6B4E4D] mb-8">Search Results</h1>

        {message && (
          <div className="text-center text-[#6B4E4D] mb-6 transition-all duration-300">
            {message}
          </div>
        )}

        {results.length === 0 ? (
          <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-xl border border-[#E0D6CC] shadow-sm">
            <div className="text-[#6B4E4D]/70 text-lg">
              No magical items found matching your search...
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((product) => (
              <div
                key={product._id}
                className="group bg-white/90 backdrop-blur-sm rounded-xl border border-[#E0D6CC] shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden rounded-t-xl">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#6B4E4D]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-lg font-serif text-[#6B4E4D] mb-2">
                    {product.name}
                  </h3>
                  <p className="text-[#B76E79] font-medium mb-4">
                    ₹{product.price.toFixed(2)}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleAddToCart(product._id)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-[#B76E79] text-white rounded-lg hover:bg-[#B76E79]/90 transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>
                    <button
                      onClick={() => handleAddToWishlist(product._id)}
                      className="p-2 text-[#6B4E4D] hover:text-[#B76E79] border border-[#E0D6CC] rounded-lg hover:border-[#B76E79] transition-colors"
                    >
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
