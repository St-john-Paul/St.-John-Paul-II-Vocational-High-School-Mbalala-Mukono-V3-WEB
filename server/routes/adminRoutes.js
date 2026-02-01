import express from 'express';
import { getDashboardStats } from '../controllers/adminController.js';
import { authenticateToken, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect all routes in this file
router.use(authenticateToken);
router.use(requireRole(['admin', 'staff']));

router.get('/stats', getDashboardStats);

export default router;
