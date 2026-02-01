import express from 'express';
import {
    getMyProfile,
    getMyFees,
    getMyMarks,
    getMyTimetable,
    getSchoolEvents,
    getPublicDocuments,
    getNews
} from '../controllers/portalController.js';
import { authenticateToken, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticateToken);
router.use(requireRole(['student']));

router.get('/profile', getMyProfile);
router.get('/fees', getMyFees);
router.get('/marks', getMyMarks);
router.get('/timetable', getMyTimetable);
router.get('/events', getSchoolEvents);
router.get('/documents', getPublicDocuments);
router.get('/news', getNews);

export default router;
