// Path: frontend/src/admin/pages/users/UserCart.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FiEdit,
  FiTrash2,
  FiChevronLeft,
} from "react-icons/fi";
import { Link, useParams } from "react-router-dom";

export default function UserCart() {
  const { userId } = useParams();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true); // Set loading to true before API call
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/admin/users/${userId}/cart`, // Correct path
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCartItems(data.items);
        setError(""); // Clear previous errors
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch cart.");
      } finally {
        setLoading(false); // Ensure loading stops
      }
    };

    fetchCart();
  }, [userId, token]);

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-rose-25 ml-64">
      {/* Header with back button */}
      <div className="mb-6">
        <Link
          to={`/admin/users`}
          className="flex items-center gap-2 text-amber-900 hover:text-rose-800"
        >
          <FiChevronLeft /> Back to Users
        </Link>
      </div>

      {/* User Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-rose-100 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-amber-900/80">User ID</p>
            <p className="font-medium text-rose-800">{userId}</p>
          </div>
          {/* <div>
            <p className="text-sm text-amber-900/80">Name</p>
            <p className="font-medium text-rose-800">{user.name}</p>
          </div> */}
          <div>
            <p className="text-sm text-amber-900/80">Items in Cart</p>
            <p className="font-medium text-rose-800">{cartItems.length}</p>
          </div>
          {/* <div>
            <p className="text-sm text-amber-900/80">Total Amount</p>
            <p className="font-medium text-rose-800">{user.totalAmount}</p>
          </div> */}
        </div>
      </div>

      {/* Cart Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-rose-100 overflow-hidden">
        <table className="min-w-full divide-y divide-rose-100">
          <thead className="bg-rose-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                Product ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                Final Price
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-amber-900 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-rose-50">
            {cartItems.map((item) => (
              <tr key={item._id} className="hover:bg-rose-50/50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-rose-800">
                  {item.product._id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">
                  {item.product.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">
                  {item.product.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">
                  {item.quantity}
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">
                  <select 
                    defaultValue={product.quantity}
                    className="border border-rose-200 rounded px-2 py-1 text-sm"
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </td> */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-rose-800">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button className="text-amber-600 hover:text-amber-800">
                    <FiEdit />
                  </button>
                  <button className="text-rose-600 hover:text-rose-800">
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
