// Path: frontend/src/admin/pages/discounts/DiscountList.jsx
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function DiscountList() {
  // Mock data - replace with API calls
  const [discounts, setDiscounts] = useState([
    {
      id: '6808cc130b751d966fa124cf',
      code: 'WELCOME10',
      type: 'percentage',
      value: 10,
      minAmount: 100,
      expiryDate: '2023-08-31',
      status: 'active'
    },
    {
      id: '6808cc130b751d966fa124d0',
      code: 'FLAT50',
      type: 'fixed',
      value: 50,
      minAmount: 500,
      expiryDate: '2023-07-15',
      status: 'active'
    }
  ]);

  const handleDelete = (discountId) => {
    if (window.confirm('Are you sure you want to delete this discount code?')) {
      setDiscounts(discounts.filter(disc => disc.id !== discountId));
    }
  };

  const formatValue = (discount) => {
    return discount.type === 'percentage' 
      ? `${discount.value}%` 
      : `$${discount.value.toFixed(2)}`;
  };

  return (
    <div className="p-6 bg-rose-25 ml-64">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-rose-800">Discount Codes</h1>
          <p className="text-amber-900/80">Manage your promotional offers</p>
        </div>
        <Link
          to="/admin/discounts/add"
          className="flex items-center gap-2 bg-rose-700 hover:bg-rose-800 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <FiPlus /> Add Discount
        </Link>
      </div>

      {/* Discounts Table */}
      <div className="bg-white rounded-xl shadow-sm border border-rose-100 overflow-hidden">
        <table className="min-w-full divide-y divide-rose-100">
          <thead className="bg-rose-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">Value</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">Min. Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">Expiry Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-amber-900 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-rose-50">
            {discounts.map((discount) => (
              <tr key={discount.id} className="hover:bg-rose-50/50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-rose-800">{discount.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-medium text-amber-900 bg-amber-50 rounded">
                  {discount.code}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900 capitalize">
                  {discount.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-rose-800 font-medium">
                  {formatValue(discount)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">
                  ${discount.minAmount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">
                  {new Date(discount.expiryDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    discount.status === 'active' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {discount.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <Link
                    to={`/admin/discounts/edit/${discount.id}`}
                    className="text-amber-600 hover:text-amber-800 inline-block"
                    title="Edit"
                  >
                    <FiEdit2 />
                  </Link>
                  <button
                    onClick={() => handleDelete(discount.id)}
                    className="text-rose-600 hover:text-rose-800"
                    title="Delete"
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