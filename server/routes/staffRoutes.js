import express from 'express';
import { getAllStaff, createStaff, updateStaff, deleteStaff, getMe, updateMe } from '../controllers/staffController.js';
import { authenticateToken, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticateToken);

// Staff Self-Management (Accessible to Staff & Admin)
router.get('/me', getMe);
router.put('/me', updateMe);

// Admin Management Routes (Admin Only)
router.use(requireRole(['admin']));

router.get('/', getAllStaff);
router.post('/', createStaff);
router.put('/:id', updateStaff);
router.delete('/:id', deleteStaff);

export default router;

