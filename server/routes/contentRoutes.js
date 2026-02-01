import express from 'express';
import {
    LeadershipMember, GalleryImage, Testimonial, Subscriber,
    CalendarEvent, TimetableEntry, Document, InquirySubmission, SiteSetting, FAQ, PageSection
} from '../models/index.js';
import { authenticateToken, requireRole } from '../middleware/authMiddleware.js';
import { downloadImage } from '../utils/downloader.js';
import * as videoController from '../controllers/videoController.js';

import multer from 'multer';
import path from 'path';

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// ============================================
// LEADERSHIP MEMBERS
// ============================================
router.get('/leadership', async (req, res) => {
    try {
        const { category } = req.query;
        const where = category ? { category } : {};
        const members = await LeadershipMember.findAll({ where, order: [['display_order', 'ASC']] });
        res.json(members);
    } catch (e) { res.status(500).json({ message: e.message }); }
});

// Multer for multiple files
const uploadLeadership = upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'cv', maxCount: 1 }]);

router.post('/leadership', authenticateToken, requireRole(['admin']), uploadLeadership, async (req, res) => {
    try {
        const data = req.body;
        // Handle File Uploads
        if (req.files) {
            if (req.files['photo']) data.photo_url = '/uploads/' + req.files['photo'][0].filename;
            if (req.files['cv']) data.cv_url = '/uploads/' + req.files['cv'][0].filename;
        }

        // Handle URL Uploads (if no file uploaded)
        if (!data.photo_url && data.photo_url_input) {
            try {
                data.photo_url = await downloadImage(data.photo_url_input);
            } catch (err) {
                return res.status(400).json({ message: 'Failed to download image from URL' });
            }
        }

        const member = await LeadershipMember.create(data);
        res.status(201).json(member);
    } catch (e) { res.status(500).json({ message: e.message }); }
});

router.put('/leadership/:id', authenticateToken, requireRole(['admin']), uploadLeadership, async (req, res) => {
    try {
        const member = await LeadershipMember.findByPk(req.params.id);
        if (!member) return res.status(404).json({ message: 'Not found' });

        const data = req.body;
        if (req.files) {
            if (req.files['photo']) data.photo_url = '/uploads/' + req.files['photo'][0].filename;
            if (req.files['cv']) data.cv_url = '/uploads/' + req.files['cv'][0].filename;
        }

        // Handle URL Update
        if (!req.files?.['photo'] && data.photo_url_input) {
            try {
                data.photo_url = await downloadImage(data.photo_url_input);
            } catch (err) {
                return res.status(400).json({ message: 'Failed to download image from URL' });
            }
        }

        await member.update(data);
        res.json(member);
    } catch (e) { res.status(500).json({ message: e.message }); }
});

router.delete('/leadership/:id', authenticateToken, requireRole(['admin']), async (req, res) => {
    try {
        const member = await LeadershipMember.findByPk(req.params.id);
        if (!member) return res.status(404).json({ message: 'Not found' });
        await member.destroy();
        res.json({ message: 'Deleted successfully' });
    } catch (e) { res.status(500).json({ message: e.message }); }
});

// ============================================
// GALLERY IMAGES
// ============================================
router.get('/gallery', async (req, res) => {
    try {
        const { category } = req.query;
        const where = category && category !== 'All' ? { category } : {};
        const images = await GalleryImage.findAll({ where, order: [['display_order', 'ASC']] });
        res.json(images);
    } catch (e) { res.status(500).json({ message: e.message }); }
});

router.post('/gallery', authenticateToken, requireRole(['admin']), upload.single('image'), async (req, res) => {
    try {
        const data = req.body;
        if (req.file) {
            data.image_url = '/uploads/' + req.file.filename;
        } else if (data.image_url_input) {
            try {
                data.image_url = await downloadImage(data.image_url_input);
            } catch (err) {
                return res.status(400).json({ message: 'Failed to download image from URL' });
            }
        }
        const image = await GalleryImage.create(data);
        res.status(201).json(image);
    } catch (e) { res.status(500).json({ message: e.message }); }
});

router.put('/gallery/:id', authenticateToken, requireRole(['admin']), upload.single('image'), async (req, res) => {
    try {
        const image = await GalleryImage.findByPk(req.params.id);
        if (!image) return res.status(404).json({ message: 'Not found' });

        const data = req.body;
        if (req.file) {
            data.image_url = '/uploads/' + req.file.filename;
        } else if (data.image_url_input) {
            try {
                data.image_url = await downloadImage(data.image_url_input);
            } catch (err) {
                return res.status(400).json({ message: 'Failed to download image from URL' });
            }
        }

        await image.update(data);
        res.json(image);
    } catch (e) { res.status(500).json({ message: e.message }); }
});

router.delete('/gallery/:id', authenticateToken, requireRole(['admin']), async (req, res) => {
    try {
        const image = await GalleryImage.findByPk(req.params.id);
        if (!image) return res.status(404).json({ message: 'Not found' });
        await image.destroy();
        res.json({ message: 'Deleted successfully' });
    } catch (e) { res.status(500).json({ message: e.message }); }
});

// ============================================
// TESTIMONIALS
// ============================================
router.get('/testimonials', async (req, res) => {
    try {
        const testimonials = await Testimonial.findAll({
            where: { is_visible: true },
            order: [['createdAt', 'DESC']]
        });
        res.json(testimonials);
    } catch (e) { res.status(500).json({ message: e.message }); }
});

router.get('/testimonials/all', authenticateToken, requireRole(['admin']), async (req, res) => {
    try {
        const testimonials = await Testimonial.findAll({ order: [['createdAt', 'DESC']] });
        res.json(testimonials);
    } catch (e) { res.status(500).json({ message: e.message }); }
});

router.post('/testimonials', authenticateToken, requireRole(['admin']), upload.single('author_photo'), async (req, res) => {
    try {
        const data = req.body;
        if (req.file) {
            data.author_photo = '/uploads/' + req.file.filename;
        } else if (data.author_photo_url_input) {
            try {
                data.author_photo = await downloadImage(data.author_photo_url_input);
            } catch (err) {
                return res.status(400).json({ message: 'Failed to download image from URL' });
            }
        }
        const testimonial = await Testimonial.create(data);
        res.status(201).json(testimonial);
    } catch (e) { res.status(500).json({ message: e.message }); }
});

router.put('/testimonials/:id', authenticateToken, requireRole(['admin']), upload.single('author_photo'), async (req, res) => {
    try {
        const testimonial = await Testimonial.findByPk(req.params.id);
        if (!testimonial) return res.status(404).json({ message: 'Not found' });

        const data = req.body;
        if (req.file) {
            data.author_photo = '/uploads/' + req.file.filename;
        } else if (data.author_photo_url_input) {
            try {
                data.author_photo = await downloadImage(data.author_photo_url_input);
            } catch (err) {
                return res.status(400).json({ message: 'Failed to download image from URL' });
            }
        }

        await testimonial.update(data);
        res.json(testimonial);
    } catch (e) { res.status(500).json({ message: e.message }); }
});

router.delete('/testimonials/:id', authenticateToken, requireRole(['admin']), async (req, res) => {
    try {
        const testimonial = await Testimonial.findByPk(req.params.id);
        if (!testimonial) return res.status(404).json({ message: 'Not found' });
        await testimonial.destroy();
        res.json({ message: 'Deleted successfully' });
    } catch (e) { res.status(500).json({ message: e.message }); }
});

// ============================================
// NEWSLETTER SUBSCRIBERS
// ============================================
router.post('/newsletter/subscribe', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: 'Email required' });

        const existing = await Subscriber.findOne({ where: { email } });
        if (existing) return res.status(400).json({ message: 'Already subscribed' });

        await Subscriber.create({ email });
        res.status(201).json({ message: 'Subscribed successfully!' });
    } catch (e) { res.status(500).json({ message: e.message }); }
});

router.get('/newsletter/subscribers', authenticateToken, requireRole(['admin']), async (req, res) => {
    try {
        const subscribers = await Subscriber.findAll({ order: [['subscribed_at', 'DESC']] });
        res.json(subscribers);
    } catch (e) { res.status(500).json({ message: e.message }); }
});

// ============================================
// CALENDAR EVENTS
// ============================================
router.get('/calendar', async (req, res) => {
    try {
        const events = await CalendarEvent.findAll({ order: [['event_date', 'ASC']] });
        res.json(events);
    } catch (e) { res.status(500).json({ message: e.message }); }
});

router.post('/calendar', authenticateToken, requireRole(['admin']), async (req, res) => {
    try {
        const event = await CalendarEvent.create(req.body);
        res.status(201).json(event);
    } catch (e) { res.status(500).json({ message: e.message }); }
});

router.put('/calendar/:id', authenticateToken, requireRole(['admin']), async (req, res) => {
    try {
        const event = await CalendarEvent.findByPk(req.params.id);
        if (!event) return res.status(404).json({ message: 'Not found' });
        await event.update(req.body);
        res.json(event);
    } catch (e) { res.status(500).json({ message: e.message }); }
});

router.delete('/calendar/:id', authenticateToken, requireRole(['admin']), async (req, res) => {
    try {
        const event = await CalendarEvent.findByPk(req.params.id);
        if (!event) return res.status(404).json({ message: 'Not found' });
        await event.destroy();
        res.json({ message: 'Deleted successfully' });
    } catch (e) { res.status(500).json({ message: e.message }); }
});

// ============================================
// TIMETABLE / DAILY ROUTINE
// ============================================
router.get('/timetable', async (req, res) => {
    try {
        const { type, class_level } = req.query;
        const where = {};
        if (type) where.type = type;
        if (class_level) where.class_level = class_level;

        const entries = await TimetableEntry.findAll({
            where,
            order: [['display_order', 'ASC'], ['start_time', 'ASC']]
        });
        res.json(entries);
    } catch (e) { res.status(500).json({ message: e.message }); }
});

router.post('/timetable', authenticateToken, requireRole(['admin']), async (req, res) => {
    try {
        const entry = await TimetableEntry.create(req.body);
        res.status(201).json(entry);
    } catch (e) { res.status(500).json({ message: e.message }); }
});

router.put('/timetable/:id', authenticateToken, requireRole(['admin']), async (req, res) => {
    try {
        const entry = await TimetableEntry.findByPk(req.params.id);
        if (!entry) return res.status(404).json({ message: 'Not found' });
        await entry.update(req.body);
        res.json(entry);
    } catch (e) { res.status(500).json({ message: e.message }); }
});

router.delete('/timetable/:id', authenticateToken, requireRole(['admin']), async (req, res) => {
    try {
        const entry = await TimetableEntry.findByPk(req.params.id);
        if (!entry) return res.status(404).json({ message: 'Not found' });
        await entry.destroy();
        res.json({ message: 'Deleted successfully' });
    } catch (e) { res.status(500).json({ message: e.message }); }
});

// ============================================
// DOCUMENTS
// ============================================
router.get('/documents', async (req, res) => {
    try {
        const { category } = req.query;
        const where = { is_visible: true };
        if (category) where.category = category;
        const docs = await Document.findAll({ where, order: [['createdAt', 'DESC']] });
        res.json(docs);
    } catch (e) { res.status(500).json({ message: e.message }); }
});

router.get('/documents/all', authenticateToken, requireRole(['admin']), async (req, res) => {
    try {
        const docs = await Document.findAll({ order: [['createdAt', 'DESC']] });
        res.json(docs);
    } catch (e) { res.status(500).json({ message: e.message }); }
});

router.post('/documents', authenticateToken, requireRole(['admin']), async (req, res) => {
    try {
        const doc = await Document.create(req.body);
        res.status(201).json(doc);
    } catch (e) { res.status(500).json({ message: e.message }); }
});

router.put('/documents/:id', authenticateToken, requireRole(['admin']), upload.single('file'), async (req, res) => {
    try {
        const doc = await Document.findByPk(req.params.id);
        if (!doc) return res.status(404).json({ message: 'Not found' });

        const data = req.body;
        // If file uploaded, update file_url
        if (req.file) {
            data.file_url = '/uploads/' + req.file.filename;
        }
        // If URL provided manually (and no file)
        else if (data.file_url_input) {
            data.file_url = data.file_url_input;
        }

        await doc.update(data);
        res.json(doc);
    } catch (e) { res.status(500).json({ message: e.message }); }
});

router.delete('/documents/:id', authenticateToken, requireRole(['admin']), async (req, res) => {
    try {
        const doc = await Document.findByPk(req.params.id);
        if (!doc) return res.status(404).json({ message: 'Not found' });
        await doc.destroy();
        res.json({ message: 'Deleted successfully' });
    } catch (e) { res.status(500).json({ message: e.message }); }
});

// ============================================
// ADMISSION INQUIRIES
// ============================================
router.post('/inquiries', async (req, res) => {
    try {
        const inquiry = await InquirySubmission.create(req.body);
        res.status(201).json({ message: 'Inquiry submitted successfully!', inquiry });
    } catch (e) { res.status(500).json({ message: e.message }); }
});

router.get('/inquiries', authenticateToken, requireRole(['admin']), async (req, res) => {
    try {
        const inquiries = await InquirySubmission.findAll({ order: [['createdAt', 'DESC']] });
        res.json(inquiries);
    } catch (e) { res.status(500).json({ message: e.message }); }
});

router.put('/inquiries/:id', authenticateToken, requireRole(['admin']), async (req, res) => {
    try {
        const inquiry = await InquirySubmission.findByPk(req.params.id);
        if (!inquiry) return res.status(404).json({ message: 'Not found' });
        await inquiry.update(req.body);
        res.json(inquiry);
    } catch (e) { res.status(500).json({ message: e.message }); }
});

// ============================================
// SITE SETTINGS
// ============================================
router.get('/settings', async (req, res) => {
    try {
        const settings = await SiteSetting.findAll();
        const obj = {};
        settings.forEach(s => { obj[s.setting_key] = s.setting_value; });
        res.json(obj);
    } catch (e) { res.status(500).json({ message: e.message }); }
});

// Multer for multiple files
// Note: We might be reusing upload middleware, but let's be specific for settings if needed or reuse 'upload'
// Since settings is a generic key-value store, handling file uploads requires parsing multipart form data
// and then storing the file path as the value for a specific key (e.g. 'home_video_path')

router.post('/settings', authenticateToken, requireRole(['admin']), upload.any(), async (req, res) => {
    try {
        const settings = {};

        // Handle normal fields (might come as flattened keys or nested object depending on frontend)
        // If coming from FormData, they will be flat keys like 'school_name', 'email' etc.
        // Or if using JSON.stringify inside a field like previous code, we need to parse it.
        // Let's support both flat fields from FormData for simplicity with files.

        if (req.body.settings) {
            // Legacy JSON string support if any
            try {
                Object.assign(settings, JSON.parse(req.body.settings));
            } catch (e) { }
        }

        // Merge direct body keys (excluding 'settings' key itself if parsed above)
        for (const key in req.body) {
            if (key !== 'settings') settings[key] = req.body[key];
        }

        // Handle File Uploads
        if (req.files && req.files.length > 0) {
            req.files.forEach(file => {
                // If the input name is 'home_video_file', we save it as 'home_video_path' setting
                // Or just use the input name as the setting key
                settings[file.fieldname] = '/uploads/' + file.filename;
            });
        }

        // Save all settings
        for (const key of Object.keys(settings)) {
            await SiteSetting.upsert({ setting_key: key, setting_value: settings[key] });
        }

        res.json({ message: 'Settings saved', settings });
    } catch (e) { res.status(500).json({ message: e.message }); }
});

// ============================================
// FAQS
// ============================================
router.get('/faqs', async (req, res) => {
    try {
        const faqs = await FAQ.findAll({
            where: { is_visible: true },
            order: [['display_order', 'ASC'], ['createdAt', 'DESC']]
        });
        res.json(faqs);
    } catch (e) { res.status(500).json({ message: e.message }); }
});

router.get('/faqs/all', authenticateToken, requireRole(['admin']), async (req, res) => {
    try {
        const faqs = await FAQ.findAll({ order: [['display_order', 'ASC'], ['createdAt', 'DESC']] });
        res.json(faqs);
    } catch (e) { res.status(500).json({ message: e.message }); }
});

router.post('/faqs', authenticateToken, requireRole(['admin']), async (req, res) => {
    try {
        const faq = await FAQ.create(req.body);
        res.status(201).json(faq);
    } catch (e) { res.status(500).json({ message: e.message }); }
});

router.put('/faqs/:id', authenticateToken, requireRole(['admin']), async (req, res) => {
    try {
        const faq = await FAQ.findByPk(req.params.id);
        if (!faq) return res.status(404).json({ message: 'Not found' });
        await faq.update(req.body);
        res.json(faq);
    } catch (e) { res.status(500).json({ message: e.message }); }
});

router.delete('/faqs/:id', authenticateToken, requireRole(['admin']), async (req, res) => {
    try {
        const faq = await FAQ.findByPk(req.params.id);
        if (!faq) return res.status(404).json({ message: 'Not found' });
        await faq.destroy();
        res.json({ message: 'Deleted successfully' });
    } catch (e) { res.status(500).json({ message: e.message }); }
});

// ============================================
// PAGE SECTIONS
// ============================================
router.get('/sections', async (req, res) => {
    try {
        const sections = await PageSection.findAll({
            order: [['section_key', 'ASC'], ['display_order', 'ASC']]
        });
        const grouped = {};
        sections.forEach(s => {
            if (!grouped[s.section_key]) {
                // If it's a unique section like 'home_about', store object directly (or handle as array if multiple)
                // For simplicity, let's keep it as a map of keys to arrays for safety, or just list.
                // Actually returning the flat list is easier for frontend filtering.
            }
        });
        res.json(sections);
    } catch (e) { res.status(500).json({ message: e.message }); }
});

router.put('/sections/:id', authenticateToken, requireRole(['admin']), upload.single('image'), async (req, res) => {
    try {
        const section = await PageSection.findByPk(req.params.id);
        if (!section) return res.status(404).json({ message: 'Not found' });

        const data = req.body;
        // Handle File Layout
        if (req.file) {
            data.image_url = '/uploads/' + req.file.filename;
        } else if (data.image_url_input) {
            try {
                data.image_url = await downloadImage(data.image_url_input);
            } catch (err) {
                console.error('Section image download failed:', err);
                // Fallback to raw URL if download fails (optional, but requested robust handling)
                data.image_url = data.image_url_input;
            }
        }

        await section.update(data);
        res.json(section);
    } catch (e) { res.status(500).json({ message: e.message }); }
});

// Admin list (same as public roughly, but maybe filtered)
router.get('/sections/all', authenticateToken, requireRole(['admin']), async (req, res) => {
    try {
        const sections = await PageSection.findAll({ order: [['section_key', 'ASC']] });
        res.json(sections);
    } catch (e) { res.status(500).json({ message: e.message }); }
});

// ============================================
// VIDEOS
// ============================================
router.get('/videos', videoController.getVideos);
router.get('/videos/:id', videoController.getVideoById);

// Multer for video file upload + thumbnail
const uploadVideo = upload.fields([{ name: 'video', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]);

router.post('/videos', authenticateToken, requireRole(['admin']), uploadVideo, videoController.createVideo);
router.put('/videos/:id', authenticateToken, requireRole(['admin']), uploadVideo, videoController.updateVideo);
router.delete('/videos/:id', authenticateToken, requireRole(['admin']), videoController.deleteVideo);

export default router;
