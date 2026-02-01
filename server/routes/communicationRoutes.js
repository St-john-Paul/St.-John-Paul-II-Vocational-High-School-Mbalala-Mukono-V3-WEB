import express from 'express';
import {
    sendMessage,
    broadcastToClass,
    getHistory
} from '../controllers/communicationController.js';
import { authenticateToken, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticateToken);
router.use(requireRole(['admin', 'head_teacher', 'staff']));

router.post('/send', sendMessage);
router.post('/broadcast', broadcastToClass);
router.get('/history', getHistory);

export default router;
