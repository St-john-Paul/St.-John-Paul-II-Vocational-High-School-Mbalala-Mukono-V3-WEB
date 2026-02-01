import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, Student } from '../models/index.js';

export const login = async (req, res) => {
    try {
        const { password } = req.body;
        let { username } = req.body;

        // Normalize input
        if (!username) return res.status(400).json({ message: 'Username is required' });
        username = username.trim();

        // 1. Try finding by exact username
        let user = await User.findOne({ where: { username } });

        // 2. Try finding by lowercase username (for firstname.lastname case insensitivity)
        if (!user) {
            user = await User.findOne({ where: { username: username.toLowerCase() } });
        }

        // 3. Try finding by Student Registration Number
        if (!user) {
            // Check exact Match
            let student = await Student.findOne({ where: { reg_number: username } });

            // Check uppercase Match (common useful fallback for reg numbers)
            if (!student) {
                student = await Student.findOne({ where: { reg_number: username.toUpperCase() } });
            }

            if (student) {
                user = await User.findByPk(student.userId);
            }
        }

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate Token
        const token = jwt.sign(
            { id: user.id, role: user.role, username: user.username },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
};

export const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user.id; // From middleware

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect current password' });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password_hash = hashedPassword;
        await user.save();

        res.json({ message: 'Password updated successfully' });

    } catch (error) {
        console.error('Password Change Error:', error);
        res.status(500).json({ message: 'Server error updating password' });
    }
};
