import express from 'express';
import {
    submitMarks,
    getStudentMarks,
    calculateValueAdded,
    batchSubmitMarks
} from '../controllers/marksController.js';
import { authenticateToken, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Submit single mark (staff/admin only)
router.post('/submit', requireRole(['staff', 'admin']), submitMarks);

// Batch submit marks (staff/admin only)
router.post('/batch-submit', requireRole(['staff', 'admin']), batchSubmitMarks);

// Get student marks
router.get('/student/:student_id', getStudentMarks);

// Calculate value-added score
router.get('/value-added/:student_id', calculateValueAdded);

export default router;
