import express from 'express';
import { getAllocations, assignTeacher, removeAllocation } from '../controllers/allocationController.js';
import { authenticateToken, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticateToken);
router.use(requireRole(['admin']));

router.get('/', getAllocations);
router.post('/', assignTeacher);
router.delete('/:id', removeAllocation);

export default router;
