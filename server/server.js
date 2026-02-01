import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import sequelize from './config/database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions = {
    origin: process.env.NODE_ENV === 'production'
        ? ['https://stjohnpaulvocational.com', 'https://www.stjohnpaulvocational.com', 'https://api.stjohnpaulii.edu.ug', 'https://stjohnpaulvtc-v3.onrender.com']
        : true,
    credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());

// Serving static files
const __dirname = path.resolve();
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

console.log('Serving static files from:', __dirname);
console.log('Uploads directory:', path.join(__dirname, 'uploads'));

// Routes
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import staffRoutes from './routes/staffRoutes.js';
import academicRoutes from './routes/academicRoutes.js';
import financeRoutes from './routes/financeRoutes.js';
import portalRoutes from './routes/portalRoutes.js';
import marksRoutes from './routes/marksRoutes.js';
import cmsRoutes from './routes/cmsRoutes.js';
import contentRoutes from './routes/contentRoutes.js';
import allocationRoutes from './routes/allocationRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import communicationRoutes from './routes/communicationRoutes.js';

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/academics', academicRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/portal', portalRoutes);
app.use('/api/marks', marksRoutes);
app.use('/api/cms', cmsRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/allocations', allocationRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/communication', communicationRoutes);

// Basic API Route
app.get('/api', (req, res) => {
    res.json({ message: 'Welcome to the School Management System API', status: 'active' });
});

// Health check for Render
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// Serve index.html at the root
app.get('/', (req, res) => {
    res.sendFile(path.resolve('index.html'));
});

// Catch-all for missing API routes
app.use('/api', (req, res, next) => {
    if (req.path === '/') return next();
    res.status(404).json({ message: `API route not found: ${req.originalUrl}` });
});

// Serve HTML files from the root
const htmlFiles = [
    'about', 'admissions', 'clubs', 'contact', 'events', 'facilities',
    'faqs', 'fees', 'gallery', 'leadership', 'login', 'logout',
    'mission-vision', 'news', 'programs', 'videos', 'student-life'
];

htmlFiles.forEach(file => {
    app.get(`/${file}`, (req, res) => {
        res.sendFile(path.resolve(`${file}.html`));
    });
});

// Start Server - BIND TO PORT IMMEDIATELY
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Starting database initialization...');

    // Initialize database in the background
    initializeDatabase();
});

// Database initialization logic
const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');

        const { User, Student, Staff } = await import('./models/index.js');
        await sequelize.sync();
        console.log('Database synced.');

        const { seedDefaults } = await import('./seed.js');
        await seedDefaults();
        console.log('Default data seeded.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
