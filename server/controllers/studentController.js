import bcrypt from 'bcryptjs';
import { User, Student } from '../models/index.js';
import { Op } from 'sequelize';

export const getAllStudents = async (req, res) => {
    try {
        const { class_level } = req.query;
        const whereClause = class_level ? { class_level } : {};

        const students = await Student.findAll({
            where: whereClause,
            order: [['createdAt', 'DESC']]
        });
        res.json(students);
    } catch (error) {
        console.error('Fetch Students Error:', error);
        res.status(500).json({ message: 'Error fetching students' });
    }
};

export const createStudent = async (req, res) => {
    try {
        const { full_name, class_level, stream, parent_name, parent_phone } = req.body;

        // Auto-Generate Registration Number
        const currentYear = new Date().getFullYear();
        const isVocational = class_level.toLowerCase().includes('vocational');

        // Prefix: SJPII/SEC/2026/ or SJPII/VOC/2026/
        const prefix = isVocational ? `SJPII/VOC/${currentYear}/` : `SJPII/SEC/${currentYear}/`;

        // Find count of students with this prefix to determine sequence
        const count = await Student.count({
            where: {
                reg_number: {
                    [Op.like]: `${prefix}%`
                }
            }
        });

        // Sequence is count + 1
        const sequence = (count + 1).toString().padStart(3, '0');
        let reg_number = `${prefix}${sequence}`;

        // Double check for collision (rare race condition handling)
        const check = await Student.findOne({ where: { reg_number } });
        if (check) {
            const nextSeq = (count + 2).toString().padStart(3, '0');
            reg_number = `${prefix}${nextSeq}`;
        }

        // Generate Username: firstname.lastname
        const nameParts = full_name.toLowerCase().split(' ');
        let baseUsername = `${nameParts[0]}.${nameParts[nameParts.length - 1]}`;
        let username = baseUsername;
        let counter = 1;

        while (await User.findOne({ where: { username } })) {
            username = `${baseUsername}${counter}`;
            counter++;
        }

        // Create User Account (Default password: stud123)
        const defaultPassword = "stud123";
        const passwordHash = await bcrypt.hash(defaultPassword, 10);

        const newUser = await User.create({
            username: username,
            password_hash: passwordHash,
            role: 'student'
        });

        // Create Student Profile
        const newStudent = await Student.create({
            user_id: newUser.id,
            userId: newUser.id,
            full_name,
            reg_number,
            class_level,
            stream,
            parent_name,
            parent_phone
        });

        res.status(201).json({ message: 'Student registered successfully', student: newStudent });

    } catch (error) {
        console.error('Create Student Error:', error);
        res.status(500).json({ message: 'Server error creating student' });
    }
};

// Update Student
export const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { full_name, class_level, stream, parent_name, parent_phone } = req.body;

        const student = await Student.findByPk(id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        await student.update({ full_name, class_level, stream, parent_name, parent_phone });
        res.json({ message: 'Student updated successfully', student });
    } catch (error) {
        console.error('Update Student Error:', error);
        res.status(500).json({ message: 'Error updating student' });
    }
};

// Delete Student
export const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findByPk(id);

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Also delete associated user account
        if (student.userId) {
            await User.destroy({ where: { id: student.userId } });
        }
        await student.destroy();

        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        console.error('Delete Student Error:', error);
        res.status(500).json({ message: 'Error deleting student' });
    }
};

