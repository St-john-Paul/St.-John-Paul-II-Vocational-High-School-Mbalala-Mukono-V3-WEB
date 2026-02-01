import { Student, Fee, Class, Mark, TimetableEntry, CalendarEvent, Document, Post, Subject } from '../models/index.js';

export const getMyProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const student = await Student.findOne({
            where: { userId }
        });

        if (!student) return res.status(404).json({ message: 'Profile not found' });

        res.json(student);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile' });
    }
};

export const getMyFees = async (req, res) => {
    try {
        const userId = req.user.id;
        const student = await Student.findOne({ where: { userId } });
        if (!student) return res.status(404).json({ message: 'Student record not found' });

        const fees = await Fee.findAll({
            where: { student_id: student.id },
            order: [['date', 'DESC']]
        });

        res.json({
            balance: student.fee_balance,
            history: fees
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching fee history' });
    }
};

export const getMyMarks = async (req, res) => {
    try {
        const userId = req.user.id;
        const student = await Student.findOne({ where: { userId } });
        if (!student) return res.status(404).json({ message: 'Student record not found' });

        const marks = await Mark.findAll({
            where: { student_id: student.id },
            include: [{ model: Subject, attributes: ['name', 'code'] }],
            order: [['year', 'DESC'], ['term', 'DESC']]
        });

        res.json(marks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching marks' });
    }
};

export const getMyTimetable = async (req, res) => {
    try {
        const userId = req.user.id;
        const student = await Student.findOne({ where: { userId } });
        if (!student) return res.status(404).json({ message: 'Student record not found' });

        // Fetch timetable for student's class
        const timetable = await TimetableEntry.findAll({
            where: {
                type: 'class',
                class_level: student.class_level
            },
            order: [['day', 'ASC'], ['start_time', 'ASC']]
        });

        res.json(timetable);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching timetable' });
    }
};

export const getSchoolEvents = async (req, res) => {
    try {
        const events = await CalendarEvent.findAll({
            order: [['event_date', 'ASC']]
        });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events' });
    }
};

export const getPublicDocuments = async (req, res) => {
    try {
        const docs = await Document.findAll({
            order: [['createdAt', 'DESC']]
        });
        res.json(docs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching documents' });
    }
};

export const getNews = async (req, res) => {
    try {
        const news = await Post.findAll({
            order: [['createdAt', 'DESC']],
            limit: 10
        });
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching news' });
    }
};
