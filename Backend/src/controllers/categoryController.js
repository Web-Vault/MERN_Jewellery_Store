import Category from "../models/category.js";

// Create a new category
export const createCategory = async (req, res) => {
        try {
                const { name, description } = req.body;

                // Check if category already exists
                const existingCategory = await Category.findOne({ name });
                if (existingCategory) {
                        return res.status(400).json({ message: "Category already exists" });
                }

                const category = new Category({ name, description });
                await category.save();

                res.status(201).json({ message: "Category created successfully", category });
        } catch (error) {
                res.status(500).json({ message: "Error creating category", error });
        }
};

// Get all categories
export const getCategories = async (req, res) => {
        try {
                console.log("Fetching categories..."); // 🔍 Debugging
                const categories = await Category.find();
                console.log("Categories fetched:", categories); // 🔍 Debugging
                res.status(200).json({ categories });
        } catch (error) {
                console.error("Error fetching categories:", error);
                res.status(500).json({ message: "Server error fetching categories" });
        }
};

// Get a single category by ID
export const getCategoryById = async (req, res) => {
        try {
                const { id } = req.params;
                const category = await Category.findById(id);

                if (!category) {
                        return res.status(404).json({ message: "Category not found" });
                }

                res.status(200).json(category);
        } catch (error) {
                res.status(500).json({ message: "Error fetching category", error });
        }
};

// Update category by ID
export const updateCategory = async (req, res) => {
        try {
                const { id } = req.params;
                const { name, description } = req.body;

                const category = await Category.findById(id);

                if (!category) {
                        return res.status(404).json({ message: "Category not found" });
                }

                category.name = name || category.name;
                category.description = description || category.description;

                await category.save();
                res.status(200).json({ message: "Category updated successfully", category });
        } catch (error) {
                res.status(500).json({ message: "Error updating category", error });
        }
};

// Delete category by ID
export const deleteCategory = async (req, res) => {
        try {
                const { id } = req.params;

                const category = await Category.findById(id);
                if (!category) {
                        return res.status(404).json({ message: "Category not found" });
                }

                await category.deleteOne();
                res.status(200).json({ message: "Category deleted successfully" });
        } catch (error) {
                res.status(500).json({ message: "Error deleting category", error });
        }
};
