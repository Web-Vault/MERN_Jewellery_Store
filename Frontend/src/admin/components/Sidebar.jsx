import { Link, useLocation } from "react-router-dom";
import { FiHome, FiUsers, FiShoppingBag, FiPackage, FiStar, FiTag, FiMail } from "react-icons/fi";

export default function Sidebar() {
  const location = useLocation();

  // Sidebar items
  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FiHome /> },
    { name: "Users", path: "/admin/users", icon: <FiUsers /> },
    { name: "Products", path: "/admin/products", icon: <FiShoppingBag /> },
    { name: "Orders", path: "/admin/orders", icon: <FiPackage /> },
    { name: "Reviews", path: "/admin/reviews", icon: <FiStar /> },
    { name: "Discounts", path: "/admin/discounts", icon: <FiTag /> },
    { name: "Contacts", path: "/admin/contacts", icon: <FiMail /> },
    // { name: "Collections", path: "/admin/collections", icon: <FiGrid /> },
  ];

  return (
    <div className="w-64 h-screen fixed bg-rose-50 border-r border-rose-100 shadow-sm">
      {/* Logo */}
      <div className="p-4 flex items-center justify-center border-b border-rose-100">
        <div className="text-2xl font-serif font-bold text-rose-800 tracking-wider">
          Jewel<span className="text-amber-800">Store</span>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
              location.pathname === item.path
                ? "bg-rose-100 text-rose-800 font-medium"
                : "text-amber-900 hover:bg-rose-50"
            }`}
          >
            <span className="mr-3 text-lg opacity-80">{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Footer (Admin Info) */}
      <div className="absolute bottom-0 w-full p-4 border-t border-rose-100 bg-rose-50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-amber-800 flex items-center justify-center text-white font-bold">
            JS
          </div>
          <div>
            <p className="font-medium text-amber-900">Admin</p>
            <p className="text-xs text-amber-800 opacity-70">JewelStore Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
}