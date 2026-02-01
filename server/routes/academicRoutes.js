import express from 'express';
import { getAllClasses, createClass, getAllSubjects, createSubject, updateSubject, deleteSubject } from '../controllers/academicController.js';
import { authenticateToken, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticateToken);
router.use(requireRole(['admin', 'staff', 'student']));

router.get('/classes', getAllClasses);
router.post('/classes', createClass);

router.get('/subjects', getAllSubjects);
router.post('/subjects', createSubject);
router.put('/subjects/:id', updateSubject);
router.delete('/subjects/:id', deleteSubject);

export default router;
