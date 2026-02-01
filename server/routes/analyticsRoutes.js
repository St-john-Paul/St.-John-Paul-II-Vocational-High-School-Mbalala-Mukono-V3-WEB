import express from 'express';
import {
    getValueAddedStats,
    getSubjectPerformance,
    getAtRiskStudents
} from '../controllers/analyticsController.js';
import { authenticateToken, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticateToken);
router.use(requireRole(['admin', 'head_teacher'])); // Only admins/head teachers

router.get('/value-added', getValueAddedStats);
router.get('/subjects', getSubjectPerformance);
router.get('/at-risk', getAtRiskStudents);

export default router;
