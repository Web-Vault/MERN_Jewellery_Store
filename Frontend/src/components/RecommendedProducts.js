import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const RecommendedProducts = () => {
    const [products, setProducts] = useState([]);
    const [randomProducts, setRandomProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(""); // For feedback messages

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);
                console.log("API Response:", response.data);

                let productsArray = response.data; // Directly use response if it's already an array
                if (!Array.isArray(productsArray)) {
                    productsArray = Object.values(response.data); // Convert object to array (if needed)
                }

                console.log("Final Products Array:", productsArray);
                setProducts(productsArray);
                pickRandomProducts(productsArray); // Pick random 4 products

            } catch (error) {
                console.error("Error fetching products:", error);
                setProducts([]); // Ensure it's an empty array on failure
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchProducts();
    }, []);

    const pickRandomProducts = (productsList) => {
        if (productsList.length > 4) {
            const shuffled = [...productsList].sort(() => 0.5 - Math.random()); // Shuffle array
            setRandomProducts(shuffled.slice(0, 4)); // Pick first 4 from shuffled list
        } else {
            setRandomProducts(productsList); // If less than 4, use all
        }
    };


    console.log("Final Products State:", products);


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

        // Hide message after 3 seconds
        setTimeout(() => setMessage(""), 3000);
    };

    const handleAddToWishlist = async (id) => {
        const token = localStorage.getItem("userToken");

        if (!token) {
            setMessage("⚠️ Please log in to add items to your wishlist.");
            // hideMessage();
            return;
        }

        // const requestData = { productId: id, productModel: "Product" }; // Ensure correct payload
        // console.log("Sending to wishlist API:", requestData); // Debugging

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/wishlist/add/${id}`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            console.log("Wishlist response:", response.data);
            setMessage("❤️ Added to wishlist!");
        } catch (error) {
            console.error("❌ Wishlist error:", error.response?.data || error.message);
            setMessage(`❌ ${error.response?.data?.message || "Failed to add to wishlist."}`);
        }

        hideMessage();
    };

    console.log(products);

    const hideMessage = () => {
        setTimeout(() => {
            setMessage("");
        }, 3000);
    };

    if (loading) return <p className="text-center text-gray-500">Loading products...</p>;


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 flex-wrap">
            {randomProducts.map((product) => (
                <div
                    key={product.id}
                    className="group relative bg-white rounded-xl shadow-sm flex-wrap hover:shadow-md transition-all duration-300 ease-out"
                >
                    {/* Image Container */}
                    <div className="relative aspect-square overflow-hidden">
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Overlay Content */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#6B4E4D]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                            <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                                <h3 className="text-xl text-white font-serif">{product.name}</h3>
                            </div>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                {/* <h3 className="text-[#6B4E4D] font-serif text-lg">{product.name}</h3> */}
                                <p className="text-[#B76E79] mt-1">{product.price}</p>
                            </div>
                            <button onClick={() => handleAddToCart(product._id)} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <svg className="w-6 h-6 text-[#B76E79]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                        </div>

                        {/* Subtle Divider */}
                        <div className="mt-4 w-full h-px bg-[#e0d6cc]"></div>

                        {/* Hover Actions */}
                        <div className="mt-4 opacity-0 group-hover:opacity-100 translate-y-2 flex group-hover:translate-y-0 transition-all duration-300">
                            <Link to={`/product/${product._id}`} onClick={() => handleAddToCart(product._id)} className="w-full py-2 text-sm text-[#6B4E4D] hover:text-[#B76E79] transition-colors">
                                Quick View
                            </Link>
                            <button onClick={() => handleAddToWishlist(product._id)} className="w-full py-2 text-sm text-[#6B4E4D] hover:text-[#B76E79] transition-colors">
                                Add to Wishlist
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RecommendedProducts;
