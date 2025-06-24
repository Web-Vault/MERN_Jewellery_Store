// Path: frontend/src/admin/pages/reviews/ReviewList.jsx
import { FiStar, FiCheck, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ReviewList() {
  // Mock data - replace with API calls
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/reviews`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);
  const handleApprove = async (reviewId) => {
    try {
      await axios.put(`/api/reviews/${reviewId}/approve`);
      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review._id === reviewId ? { ...review, status: "approved" } : review
        )
      );
    } catch (error) {
      console.error("Error approving review:", error);
    }
  };

  // ✅ Reject a review
  const handleReject = async (reviewId) => {
    try {
      await axios.put(`/api/reviews/${reviewId}/reject`);
      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review._id === reviewId ? { ...review, status: "rejected" } : review
        )
      );
    } catch (error) {
      console.error("Error rejecting review:", error);
    }
  };

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-6 bg-rose-25 ml-64">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-bold text-rose-800">
          Reviews Management
        </h1>
        <p className="text-amber-900/80">Approve or reject customer reviews</p>
      </div>

      {/* Reviews Table */}
      <div className="bg-white rounded-xl shadow-sm border border-rose-100 overflow-hidden">
        <table className="min-w-full divide-y divide-rose-100">
          <thead className="bg-rose-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                Order
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                Review
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
            {reviews.map((review) => (
              <tr key={review._id} className="hover:bg-rose-50/50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-rose-800">
                  {review._id}
                </td>

                {/* Order Link */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">
                  <Link
                    to={`/admin/orders/${review.order}`}
                    className="text-rose-700 hover:text-rose-900 hover:underline"
                  >
                    {review.order}
                  </Link>
                </td>

                {/* User Link */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">
                  <Link
                    to={`/admin/users/${review.user._id}`}
                    className="text-rose-700 hover:text-rose-900 hover:underline"
                  >
                    <div>{review.user.name}</div>
                    <div className="text-xs text-amber-900/60">
                      ID: {review.userId}
                    </div>
                  </Link>
                </td>

                {/* Product Link */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">
                  <Link
                    to={`/admin/products/edit/${review.product._id}`}
                    className="text-rose-700 hover:text-rose-900 hover:underline"
                  >
                    <div> {review.product.name}</div>
                    <div className="text-xs text-amber-900/60">
                      ID: {review.product}
                    </div>
                  </Link>
                </td>

                {/* Rating */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className={i < review.rating ? "text-amber-500 fill-current" : "text-amber-300"} />
                    ))}
                  </div>
                </td>

                {/* Review Text */}
                <td className="px-6 py-4 text-sm text-amber-900 max-w-xs">
                  <div className="line-clamp-2">{review.comment}</div>
                  <div className="text-xs text-amber-900/60 mt-1">
                    {new Date(review.date).toLocaleDateString()}
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      review.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : review.status === "rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {review.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  {review.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleApprove(review._id)}
                        className="text-green-600 hover:text-green-800 p-1"
                        title="Approve"
                      >
                        <FiCheck />
                      </button>
                      <button
                        onClick={() => handleReject(review._id)}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Reject"
                      >
                        <FiX />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
