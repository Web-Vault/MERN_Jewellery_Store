// Path: frontend/src/admin/pages/orders/OrderDetails.jsx
import { FiArrowLeft, FiPackage, FiUser, FiDollarSign } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function OrderDetails() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data - replace with API call using orderId
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/admin/orders/${orderId}`
        );
        setOrder(data);
      } catch (err) {
        setError("Order not found or server error");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) return <p>Loading order details...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-6 bg-rose-25 ml-64">
      {/* Header with back button */}
      <div className="mb-6">
        <Link
          to="/admin/orders"
          className="flex items-center gap-2 text-amber-900 hover:text-rose-800"
        >
          <FiArrowLeft /> Back to Orders
        </Link>
      </div>
      {/* Order Summary */}
      <div className="space-y-6 mb-8">
        {/* Order Header Card */}
        <div className="bg-gradient-to-r from-rose-50 to-amber-50 rounded-xl shadow-sm border border-rose-100 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-serif font-bold text-rose-800 flex items-center gap-3">
                <FiPackage className="text-rose-700" />
                <span>Order #{order._id}</span>
              </h1>
              <p className="text-amber-900/80 mt-1">
                Placed on
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
            <div
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                order.orderStatus === "Confirmed"
                  ? "bg-green-100 text-green-800"
                  : order.orderStatus === "pending"
                  ? "bg-amber-100 text-amber-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {order.status.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Customer & Payment Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Customer Card */}
          <div className="bg-white rounded-xl shadow-sm border border-rose-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-rose-100 p-3 rounded-full">
                <FiUser className="text-rose-700 text-xl" />
              </div>
              <h3 className="text-lg font-medium text-rose-800">
                Customer Details
              </h3>
            </div>
            <div className="space-y-2 pl-2">
              <p className="text-amber-900 font-medium">{order.user.name}</p>
              <p className="text-sm text-amber-900/80">{order.user.email}</p>
            </div>
          </div>

          {/* Payment Card */}
          <div className="bg-white rounded-xl shadow-sm border border-rose-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <FiDollarSign className="text-amber-700 text-xl" />
              </div>
              <h3 className="text-lg font-medium text-rose-800">
                Payment Information
              </h3>
            </div>
            <div className="space-y-4 pl-2">
              <div className="flex justify-between">
                <span className="text-amber-900/80">Subtotal</span>
                <span className="text-amber-900">{order.totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-900/80">Shipping</span>
                <span className="text-amber-900">Free</span>
              </div>
              <div className="flex justify-between border-t border-rose-100 pt-2">
                <span className="text-amber-900 font-medium">Total</span>
                <span className="text-rose-800 font-bold text-lg">
                  {order.totalAmount}
                </span>
              </div>
              <div className="pt-3 mt-3 border-t border-rose-100">
                <p className="text-xs font-medium text-amber-900/60">
                  PAYMENT DETAILS
                </p>
                <p className="text-sm text-amber-900/80 mt-1">
                  Payment ID: {order.paymentId}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Ordered Products */}
        <h2 className="text-lg font-semibold text-amber-900 mb-4">
          Products Ordered
        </h2>
        <div className="bg-rose-50 rounded-lg border border-rose-100 overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-rose-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((product) => (
                <tr
                  key={product._id}
                  className="border-b border-rose-100 hover:bg-rose-50/50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded border border-rose-100"
                      />
                      <span className="text-amber-900">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-amber-900">{product.price}</td>
                  <td className="px-6 py-4 text-amber-900">
                    {product.quantity}
                  </td>
                  <td className="px-6 py-4 text-rose-800 font-medium">
                    {product.quantity > 1
                      ? `$${(
                          parseFloat(product.price.replace("$", "")) *
                          product.quantity
                        ).toFixed(2)}`
                      : product.price}
                  </td>
                </tr>
              ))}
              <tr className="bg-rose-50">
                <td
                  colSpan="3"
                  className="px-6 py-4 text-right font-medium text-amber-900"
                >
                  Order Total
                </td>
                <td className="px-6 py-4 text-rose-800 font-bold">
                  {order.totalAmount}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
