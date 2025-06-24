// Path: frontend/src/admin/pages/products/CategoryManagement.jsx
import { useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function CategoryManagement() {

        const navigate = useNavigate();

  // Mock data - replace with API calls
  const [categories, setCategories] = useState([
    { id: "cat_1", name: "Rings", description: "Various ring collections" },
    { id: "cat_2", name: "Necklaces", description: "Necklace designs" },
    { id: "cat_3", name: "Bracelets", description: "Handcrafted bracelets" },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      if (editingId) {
        // Update existing category
        setCategories(
          categories.map((cat) =>
            cat.id === editingId ? { ...formData, id: editingId } : cat
          )
        );
      } else {
        // Add new category
        const newCategory = {
          ...formData,
          id: `cat_${categories.length + 1}`,
        };
        setCategories([...categories, newCategory]);
      }

      resetForm();
      setIsSubmitting(false);
    }, 500);
  };

  const resetForm = () => {
    setFormData({ name: "", description: "" });
    setEditingId(null);
  };

  const handleEdit = (category) => {
    setFormData({
      name: category.name,
      description: category.description,
    });
    setEditingId(category.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((cat) => cat.id !== categoryId));
    }
  };

  return (
    <div className="p-6 bg-rose-25 ml-64">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-bold text-rose-800">
          Category Management
        </h1>
        <p className="text-amber-900/80">Organize your jewelry collections</p>
      </div>

      {/* Header with back button */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/admin/products")}
          className="flex items-center gap-2 text-amber-900 hover:text-rose-800 transition-colors"
        >
          <FiArrowLeft className="text-lg" />
          <span>Back to Products</span>
        </button>
      </div>

      {/* Add/Edit Form Card */}
      <div className="bg-white rounded-xl shadow-sm border border-rose-100 p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-amber-900">
            {editingId ? (
              <span className="flex items-center gap-2">
                <FiEdit2 className="text-rose-700" />
                Editing Category
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <FiPlus className="text-rose-700" />
                Add New Category
              </span>
            )}
          </h2>
          {editingId && (
            <button
              onClick={resetForm}
              className="text-amber-900 hover:text-rose-800 flex items-center gap-1 text-sm"
            >
              <FiX /> Cancel Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-amber-900 text-sm font-medium mb-1">
                Category Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-rose-200 focus:ring-2 focus:ring-rose-300 focus:border-transparent"
                placeholder="e.g., Wedding Rings"
                required
              />
            </div>

            <div>
              <label className="block text-amber-900 text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                type="text"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-rose-200 focus:ring-2 focus:ring-rose-300 focus:border-transparent"
                placeholder="Brief description of this category"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-rose-100">
            <button
              type="submit"
              className="px-6 py-2 bg-rose-700 text-white rounded-lg hover:bg-rose-800 flex items-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Processing..."
                : editingId
                ? "Update Category"
                : "Add Category"}
            </button>
          </div>
        </form>
      </div>

      {/* Categories Table Card */}
      <div className="bg-white rounded-xl shadow-sm border border-rose-100 overflow-hidden">
        <div className="p-4 border-b border-rose-100 bg-rose-50">
          <h2 className="text-lg font-semibold text-amber-900">
            Existing Categories ({categories.length})
          </h2>
        </div>

        {categories.length === 0 ? (
          <div className="p-8 text-center text-amber-900/70">
            No categories found. Add your first category above.
          </div>
        ) : (
          <table className="min-w-full divide-y divide-rose-100">
            <thead className="bg-rose-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-amber-900 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-rose-50">
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-rose-50/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-rose-800">
                      {category.name}
                    </div>
                    <div className="text-xs text-amber-900/60">
                      ID: {category.id}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-amber-900 max-w-xs">
                    {category.description || (
                      <span className="text-amber-900/40">No description</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="text-amber-600 hover:text-amber-800 p-1"
                      title="Edit"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="text-rose-600 hover:text-rose-800 p-1"
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
