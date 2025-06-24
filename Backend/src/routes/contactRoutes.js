import express from "express";
import { createContactMessage, getAllContactMessages, getContactMessageById, deleteContactMessage } from "../controllers/contactController.js";
import { protect, admin } from "../middleware/authMiddleware.js"; // Assuming authentication middleware

const router = express.Router();

// Routes
router.post("/", createContactMessage);
router.get("/", protect, admin, getAllContactMessages);
router.get("/:id", protect, admin, getContactMessageById);
router.delete("/:id", protect, admin, deleteContactMessage);

export default router;
