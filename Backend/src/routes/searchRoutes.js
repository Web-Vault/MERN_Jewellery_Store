import express from 'express';
import { searchProducts } from '../controllers/searchController.js';

const router = express.Router();

// Search endpoint
router.get('/', searchProducts);

export default router; 