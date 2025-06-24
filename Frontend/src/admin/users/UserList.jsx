import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FiUserPlus,
  FiEdit2,
  FiTrash2,
  FiShoppingCart,
  FiHeart,
} from "react-icons/fi";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("adminToken");

      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setError("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      setUsers(users.filter((user) => user._id !== userId)); // Update UI
    } catch (err) {
      alert("Failed to delete user.");
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-rose-25 ml-64">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-rose-800">
            User Management
          </h1>
          <p className="text-amber-900/80">Manage your store's customers</p>
        </div>
        <Link
          to="/admin/users/add"
          className="flex items-center gap-2 bg-rose-700 hover:bg-rose-800 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <FiUserPlus /> Add New User
        </Link>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-rose-100 overflow-hidden">
        <table className="min-w-full divide-y divide-rose-100">
          <thead className="bg-rose-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                Cart
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                Wishlist
              </th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                Orders
              </th> */}
              <th className="px-6 py-3 text-right text-xs font-medium text-amber-900 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-rose-50">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-rose-50/50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-rose-800">
                  {user._id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    to={`/admin/users/cart/${user._id}`}
                    className="flex items-center gap-1 text-rose-700 hover:text-rose-900"
                  >
                    <FiShoppingCart /> {user.cartItems}
                  </Link>
                </td>

                {/* Wishlist Link */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    to={`/admin/users/${user._id}/wishlist`}
                    className="flex items-center gap-1 text-rose-700 hover:text-rose-900"
                  >
                    <FiHeart /> {user.wishlistItems}
                  </Link>
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">
                  {user.orders}
                </td> */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button>
                    <Link
                      to={`/admin/users/edit/${user._id}`}
                      className="text-amber-600 hover:text-amber-800"
                    >
                      <FiEdit2 />
                    </Link>
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
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
