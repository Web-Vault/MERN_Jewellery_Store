// Path: frontend/src/admin/pages/users/AddUser.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCheck } from "react-icons/fi";

export default function AddUser() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    role: "customer",
  });

  const [errors, setError] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    setIsSubmitting(true);

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/users`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("User created successfully!");
      navigate("/admin/users");
    } catch (err) {
      console.error("Error creating user:", err.response?.data); // Debugging line
      setError(err.response?.data?.message || "Failed to create user");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-rose-25 ml-64">
      <div className="mb-6">
        <button
          onClick={() => navigate("/admin/users")}
          className="flex items-center gap-2 text-amber-900 hover:text-rose-800 transition-colors"
        >
          <FiArrowLeft className="text-lg" />
          <span>Back to User List</span>
        </button>
      </div>

      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-rose-100 overflow-hidden">
        {/* Form Header */}
        <div className="bg-rose-50 px-6 py-4 border-b border-rose-100">
          <h1 className="text-2xl font-serif font-bold text-rose-800 flex items-center gap-2">
            <FiUser className="text-rose-700" />
            <span>Create New User</span>
          </h1>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Name Field */}
          <div className="mb-6">
            <label className="block text-amber-900 text-sm font-medium mb-2 flex items-center gap-1">
              <FiUser className="text-amber-700" />
              <span>Full Name</span>
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.name ? "border-red-300" : "border-rose-200"
              } focus:ring-2 focus:ring-rose-300 focus:border-transparent`}
              placeholder="Enter full name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-6">
            <label className="block text-amber-900 text-sm font-medium mb-2 flex items-center gap-1">
              <FiMail className="text-amber-700" />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.email ? "border-red-300" : "border-rose-200"
              } focus:ring-2 focus:ring-rose-300 focus:border-transparent`}
              placeholder="user@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-amber-900 text-sm font-medium mb-2 flex items-center gap-1">
              <FiLock className="text-amber-700" />
              <span>Password</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.password ? "border-red-300" : "border-rose-200"
              } focus:ring-2 focus:ring-rose-300 focus:border-transparent`}
              placeholder="Minimum 8 characters"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-8">
            <label className="block text-amber-900 text-sm font-medium mb-2 flex items-center gap-1">
              <FiCheck className="text-amber-700" />
              <span>Address</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.address ? "border-red-300" : "border-rose-200"
              } focus:ring-2 focus:ring-rose-300 focus:border-transparent`}
              placeholder="Address"
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">{errors.address}</p>
            )}
          </div>

          <div className="mb-8">
            <label className="block text-amber-900 text-sm font-medium mb-2 flex items-center gap-1">
              <FiCheck className="text-amber-700" />
              <span>Contact Number</span>
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.phone ? "border-red-300" : "border-rose-200"
              } focus:ring-2 focus:ring-rose-300 focus:border-transparent`}
              placeholder="Phone"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          <div className="mb-8">
            <label className="block text-amber-900 text-sm font-medium mb-2 flex items-center gap-1">
              <FiCheck className="text-amber-700" />
              <span>Role</span>
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.phone ? "border-red-300" : "border-rose-200"
              } focus:ring-2 focus:ring-rose-300 focus:border-transparent`}
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-rose-100">
            <button
              type="button"
              onClick={() => navigate("/admin/users")}
              className="px-6 py-3 border border-rose-200 text-amber-900 rounded-lg hover:bg-rose-50 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-rose-700 text-white rounded-lg hover:bg-rose-800 transition-colors flex items-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <FiUser />
                  <span>Create User</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
