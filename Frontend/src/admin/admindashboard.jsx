// frontend/src/admin/adminDashboard.jsx
import {
  FiUsers,
  FiShoppingBag,
  FiLayers,
  FiPlus,
  FiMail,
  FiTag,
} from "react-icons/fi";
import { FaGem } from "react-icons/fa";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login"); // Redirect if not logged in
    }
  }, [navigate]);

  // Simple counts (replace with 3 API calls)
  const stats = [
    {
      title: "Total Users",
      value: "3",
      icon: <FiUsers className="text-rose-600" />,
    },
    {
      title: "Active Orders",
      value: "7",
      icon: <FiShoppingBag className="text-amber-600" />,
    },
    {
      title: "Products",
      value: "9",
      icon: <FaGem className="text-rose-500" />,
    },
    {
      title: "Categories",
      value: "3",
      icon: <FiLayers className="text-amber-500" />,
    },
  ];

  const quickActions = [
    {
      title: "Add Product",
      icon: <FiPlus />,
      path: "/admin/products/add",
      color: "bg-rose-100 text-rose-800",
    },
    {
      title: "Create Discount",
      icon: <FiTag />,
      path: "/admin/discounts/add",
      color: "bg-amber-100 text-amber-800",
    },
    {
      title: "View Messages",
      icon: <FiMail />,
      path: "/admin/contacts",
      color: "bg-rose-50 text-rose-700",
    },
  ];

  return (
    <div className="p-6 bg-rose-25 ml-64">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-bold text-rose-800">
          JewelStore Control Panel
        </h1>
        <p className="text-amber-900/70">Quick access to store management</p>
      </div>

      {/* CENTER-STAGE QUICK ACTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {quickActions.map((action, i) => (
          <a
            key={i}
            href={action.path}
            className={`${action.color} p-6 rounded-xl shadow-sm border border-rose-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-all`}
          >
            <div className="text-2xl mb-2">{action.icon}</div>
            <h3 className="font-medium">{action.title}</h3>
          </a>
        ))}
      </div>

      {/* SIMPLE STATS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-lg border border-rose-100 text-center"
          >
            <div className="mx-auto w-10 h-10 flex items-center justify-center rounded-full bg-rose-50 mb-2 text-rose-700">
              {stat.icon}
            </div>
            <p className="text-sm text-amber-900/80">{stat.title}</p>
            <p className="text-xl font-bold text-rose-800 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* RECENT ACTIVITY (Optional) */}
      <div className="bg-white p-6 rounded-xl border border-rose-100">
        <h2 className="text-lg font-semibold text-amber-900 mb-4">
          Recent Activity
        </h2>
        <div className="space-y-3">
          <div className="flex items-start pb-3 border-b border-rose-50">
            <div className="bg-rose-50 p-2 rounded-full mr-3">
              <FiPlus className="text-rose-700" />
            </div>
            <div>
              <p className="text-sm">
                <span className="font-medium">New product</span> added: Diamond
                Solitaire Ring
              </p>
              <p className="text-xs text-amber-900/60 mt-1">2 hours ago</p>
            </div>
          </div>
          {/* Add more activity items */}
        </div>
      </div>
    </div>
  );
}
