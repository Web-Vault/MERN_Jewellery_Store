// Path: frontend/src/admin/pages/products/ProductList.jsx
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ProductList() {
  // Mock data - replace with API calls
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`); // FIXED API URL
        setProducts(data);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  const handleDelete = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  return (
    <div className="p-6 bg-rose-25 ml-64">
      {/* Header with action buttons */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-rose-800">
            Product Management
          </h1>
          <p className="text-amber-900/80">Manage your jewelry collection</p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/admin/products/add"
            className="flex items-center gap-2 bg-rose-700 hover:bg-rose-800 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FiPlus /> Add Product
          </Link>
          <Link
            to="/admin/categories"
            className="flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FiPlus /> Add Category
          </Link>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-rose-100 overflow-hidden">
        <table className="min-w-full divide-y divide-rose-100">
          <thead className="bg-rose-50">
            <tr>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">ID</th> */}
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                Description
              </th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                Reviews
              </th> */}
              <th className="px-6 py-3 text-right text-xs font-medium text-amber-900 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-rose-50">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-rose-50/50">
                {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-rose-800">{product.id}</td> */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-md border border-rose-100"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-amber-900">
                  {product.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">
                  {product.category?.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-rose-800 font-medium">
                  {product.price}
                </td>
                <td className="px-6 py-4 text-sm text-amber-900 max-w-xs truncate">
                  {product.description}
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <FiStar className="text-amber-500" />
                    <span>{product.rating}</span>
                    <span className="text-amber-900/60">
                      ({product.reviews})
                    </span>
                  </div>
                </td> */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <Link
                    to={`/admin/products/edit/${product._id}`}
                    className="text-amber-600 hover:text-amber-800 inline-block"
                  >
                    <FiEdit2 />
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-rose-600 hover:text-rose-800"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
