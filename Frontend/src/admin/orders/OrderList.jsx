// Path: frontend/src/admin/pages/orders/OrderList.jsx
import { FiCheck, FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/orders`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setOrders(data);
      } catch (err) {
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleConfirm = async (orderId) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/admin/orders/${orderId}/confirm`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: "completed" } : order
        )
      );
    } catch (error) {
      console.error("Error confirming order:", error);
    }
  };

  return (
    <div className="p-6 bg-rose-25 ml-64">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-bold text-rose-800">
          Order Management
        </h1>
        <p className="text-amber-900/80">View and manage customer orders</p>
      </div>

      {loading ? (
        <p className="text-amber-900/80">Loading orders...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-rose-100 overflow-hidden">
          <table className="min-w-full divide-y divide-rose-100">
            <thead className="bg-rose-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                  Payment ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-amber-900 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-rose-50">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-rose-50/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-rose-800">
                    {order._id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-amber-900">
                      {order.user.name}
                    </div>
                    <div className="text-xs text-amber-900/60">
                      ID: {order.user}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-rose-800 font-medium">
                    {order.totalAmount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">
                    {order.paymentId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        order.orderStatus === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : order.orderStatus === "pending"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <Link
                      to={`/admin/orders/${order._id}`}
                      className="inline-flex items-center text-rose-700 hover:text-rose-900"
                      title="View Details"
                    >
                      <FiEye className="mr-1" /> View
                    </Link>
                    {order.orderStatus === "pending" && (
                      <button
                        onClick={() => handleConfirm(order._id)}
                        className="inline-flex items-center text-green-600 hover:text-green-800"
                        title="Confirm Order"
                      >
                        <FiCheck className="mr-1" /> Confirm
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
