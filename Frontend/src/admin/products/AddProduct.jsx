// Path: frontend/src/admin/pages/products/AddProduct.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiImage,
  FiDollarSign,
  FiTag,
  FiAlignLeft,
  FiPlus,
} from "react-icons/fi";
import axios from "axios";

export default function AddProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    stock: 0,
    materials: "",
    dimensions: "",
    images: [],
  });
  const [previewImages, setPreviewImages] = useState([]);
  // const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    "Rings",
    "Necklaces",
    "Bracelets",
    "Earrings",
    "Watches",
    "Brooches",
    "Anklets",
    "Cufflinks",
  ];

//   useEffect(() => {
//     axios
//       .get(`${process.env.REACT_APP_API_URL}/api/categories/admin`)
//       .then((response) => {
//           console.log("Categories Data:", response.data); // 🔍 Debugging
//           setCategories(response.data.categories);
//       })
//       .catch((error) => console.error("Error fetching categories:", error));
// }, []);

  // Handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setPreviewImages([
      ...previewImages,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
    setFormData({ ...formData, images: [...formData.images, ...files] });
  };

  // Remove selected image
  const removeImage = (index) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const productData = new FormData();
    productData.append("name", formData.name);
    productData.append("category", "67ebe6b059cfb10700b3d55a");
    productData.append("price", formData.price);
    productData.append("description", formData.description);
    productData.append("stock", formData.stock);
    productData.append("materials", formData.materials);
    productData.append("dimensions", formData.dimensions);

    // Append images
    formData.images.forEach((image) => productData.append("images", image));
    
    const adminToken = localStorage.getItem("adminToken");

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/products`,
        productData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`, // Ensure token is valid
          },
        }
      );

      console.log("Product created:", data);
    } catch (error) {
      console.error(
        "Error creating product:",
        error.response?.data || error.message
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-rose-25 ml-64">
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

      {/* Form Container */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-rose-100 overflow-hidden">
        {/* Form Header */}
        <div className="bg-rose-50 px-6 py-4 border-b border-rose-100">
          <h1 className="text-2xl font-serif font-bold text-rose-800 flex items-center gap-2">
            <FiTag className="text-rose-700" />
            <span>Add New Jewelry Product</span>
          </h1>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div>
              {/* Product Name */}
              <div className="mb-6">
                <label className="block text-amber-900 text-sm font-medium mb-2 flex items-center gap-1">
                  <FiTag className="text-amber-700" />
                  <span>Product Name</span>
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-rose-200 focus:ring-2 focus:ring-rose-300 focus:border-transparent"
                  placeholder="Diamond Solitaire Ring"
                  required
                />
              </div>

              {/* Category */}
              <div className="mb-6">
                <label className="block text-amber-900 text-sm font-medium mb-2 flex items-center gap-1">
                  <FiTag className="text-amber-700" />
                  <span>Category</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-rose-200 focus:ring-2 focus:ring-rose-300 focus:border-transparent"
                  required
                >
                  <option value="">Select a category</option>
                  <option value={"67ebe6b059cfb10700b3d55a"}>67ebe6b059cfb10700b3d55a</option>
                  {categories.map((category) => (
                    <option key={category} value={"67ebe6b059cfb10700b3d55a"}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div className="mb-6">
                <label className="block text-amber-900 text-sm font-medium mb-2 flex items-center gap-1">
                  <FiDollarSign className="text-amber-700" />
                  <span>Price</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-amber-900">
                    $
                  </span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full pl-8 pr-4 py-3 rounded-lg border border-rose-200 focus:ring-2 focus:ring-rose-300 focus:border-transparent"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
              </div>

              {/* Stock */}
              <div className="mb-6">
                <label className="block text-amber-900 text-sm font-medium mb-2">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-rose-200 focus:ring-2 focus:ring-rose-300 focus:border-transparent"
                  min="0"
                  required
                />
              </div>
            </div>

            {/* Right Column */}
            <div>
              {/* Image Upload */}
              <div className="mb-6">
                <label className="block text-amber-900 text-sm font-medium mb-2 flex items-center gap-1">
                  <FiImage className="text-amber-700" />
                  <span>Product Images</span>
                </label>
                <div className="border-2 border-dashed border-rose-200 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    id="product-images"
                    className="hidden"
                    onChange={handleImageChange}
                    multiple
                    accept="image/*"
                  />
                  <label
                    htmlFor="product-images"
                    className="cursor-pointer flex flex-col items-center justify-center py-6"
                  >
                    <FiImage className="text-rose-300 text-3xl mb-2" />
                    <p className="text-amber-900">Click to upload images</p>
                    <p className="text-sm text-amber-900/60 mt-1">
                      Recommended size: 800x800px
                    </p>
                  </label>
                </div>

                {/* Image Previews */}
                {previewImages.length > 0 &&
                  previewImages.map((img, i) => (
                    <div key={i} className="relative">
                      <img
                        src={img}
                        alt="Preview"
                        className="w-16 h-16 object-cover rounded-md border border-rose-100"
                      />
                      <button
                        onClick={() => removeImage(i)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full"
                      >
                        ×
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-amber-900 text-sm font-medium mb-2 flex items-center gap-1">
              <FiAlignLeft className="text-amber-700" />
              <span>Description</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-rose-200 focus:ring-2 focus:ring-rose-300 focus:border-transparent"
              placeholder="Describe the product details, materials, and craftsmanship..."
              required
            />
          </div>

          {/* Additional Details */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-amber-900 text-sm font-medium mb-2">
                Materials
              </label>
              <input
                name="materials"
                value={formData.materials}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-rose-200 focus:ring-2 focus:ring-rose-300 focus:border-transparent"
                placeholder="e.g., 18K gold, 0.5ct diamond"
              />
            </div>
            <div>
              <label className="block text-amber-900 text-sm font-medium mb-2">
                Dimensions
              </label>
              <input
                name="dimensions"
                value={formData.dimensions}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-rose-200 focus:ring-2 focus:ring-rose-300 focus:border-transparent"
                placeholder="e.g., 6mm width, 18cm length"
              />
            </div>
          </div> */}

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-rose-100">
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
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
                  <span>Adding...</span>
                </>
              ) : (
                <>
                  <FiPlus />
                  <span>Add Product</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
