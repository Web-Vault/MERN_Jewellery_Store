import express from "express";
import { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } from "../controllers/categoryController.js";
import { protect, admin } from "../middleware/authMiddleware.js"; // Assuming authentication middleware

const router = express.Router();

// Routes
router.post("/", protect, admin, createCategory);
router.get("/admin/categories", getCategories); // ✅ Ensure this exists
router.get("/:id", getCategoryById);
router.put("/:id", protect, admin, updateCategory);
router.delete("/:id", protect, admin, deleteCategory);

export default router;
