import express from 'express';
import { createPost, getPosts, getPostById, deletePost, updatePost } from '../controllers/cmsController.js';
import { authenticateToken, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

import multer from 'multer';
import path from 'path';

// Configure Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, 'post-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Public routes (Fetch news)
router.get('/', getPosts);
router.get('/:id', getPostById);

// Protected routes (Create/Delete)
router.post('/', authenticateToken, requireRole(['admin', 'staff']), upload.single('image'), createPost);
router.put('/:id', authenticateToken, requireRole(['admin', 'staff']), upload.single('image'), updatePost);
router.delete('/:id', authenticateToken, requireRole(['admin', 'staff']), deletePost);

export default router;
