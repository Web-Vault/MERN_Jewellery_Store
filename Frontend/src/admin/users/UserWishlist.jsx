// Path: frontend/src/admin/pages/users/UserWishlist.jsx
import { FiHeart, FiTrash2, FiChevronLeft } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';

export default function UserWishlist() {
  const { userId } = useParams(); // Get user ID from URL
  
  // Mock data - replace with API call
  const user = {
    id: userId || 'usr_01',
    name: 'Emma Johnson',
    wishlistItems: 5,
    totalAmount: '$3,720.00'
  };

  const wishlistProducts = [
    {
      id: 'prod_101',
      name: 'Diamond Solitaire Ring',
      price: '$999.00'
    },
    {
      id: 'prod_205',
      name: 'Rose Gold Bracelet',
      price: '$245.00'
    },
    {
      id: 'prod_302',
      name: 'Pearl Earrings',
      price: '$130.00'
    }
  ];

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
            <p className="font-medium text-rose-800">{user.id}</p>
          </div>
          <div>
            <p className="text-sm text-amber-900/80">Name</p>
            <p className="font-medium text-rose-800">{user.name}</p>
          </div>
          <div>
            <p className="text-sm text-amber-900/80">Wishlist Items</p>
            <p className="font-medium text-rose-800">{user.wishlistItems}</p>
          </div>
          <div>
            <p className="text-sm text-amber-900/80">Total Value</p>
            <p className="font-medium text-rose-800">{user.totalAmount}</p>
          </div>
        </div>
      </div>

      {/* Wishlist Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-rose-100 overflow-hidden">
        <table className="min-w-full divide-y divide-rose-100">
          <thead className="bg-rose-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">Product ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-amber-900 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-rose-50">
            {wishlistProducts.map((product) => (
              <tr key={product.id} className="hover:bg-rose-50/50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-rose-800">{product.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">{product.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
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