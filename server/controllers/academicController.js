import { Class, Subject } from '../models/index.js';

// Classes
export const getAllClasses = async (req, res) => {
    try {
        const classes = await Class.findAll();
        res.json(classes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching classes' });
    }
};

export const createClass = async (req, res) => {
    try {
        const { name, code, stream } = req.body;
        const newClass = await Class.create({ name, code, stream });
        res.status(201).json(newClass);
    } catch (error) {
        res.status(500).json({ message: 'Error creating class' });
    }
};

// Subjects
export const getAllSubjects = async (req, res) => {
    try {
        const subjects = await Subject.findAll();
        res.json(subjects);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subjects' });
    }
};

export const createSubject = async (req, res) => {
    try {
        const { name, code, is_core, category } = req.body;
        const newSubject = await Subject.create({ name, code, is_core: is_core || false, category: category || 'O-Level' });
        res.status(201).json(newSubject);
    } catch (error) {
        res.status(500).json({ message: 'Error creating subject' });
    }
};

export const updateSubject = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, code, is_core, category } = req.body;
        const subject = await Subject.findByPk(id);
        if (!subject) return res.status(404).json({ message: 'Subject not found' });

        await subject.update({ name, code, is_core: is_core || false, category: category || 'O-Level' });
        res.json(subject);
    } catch (error) {
        res.status(500).json({ message: 'Error updating subject' });
    }
};

export const deleteSubject = async (req, res) => {
    try {
        const { id } = req.params;
        const subject = await Subject.findByPk(id);
        if (!subject) return res.status(404).json({ message: 'Subject not found' });

        await subject.destroy();
        res.json({ message: 'Subject deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting subject' });
    }
};
