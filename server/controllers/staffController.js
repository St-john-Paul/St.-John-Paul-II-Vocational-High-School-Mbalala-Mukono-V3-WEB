import bcrypt from 'bcryptjs';
import { User, Staff } from '../models/index.js';

export const getAllStaff = async (req, res) => {
    try {
        const staff = await Staff.findAll({
            include: [{ model: User, attributes: ['username', 'role'] }],
            order: [['createdAt', 'DESC']]
        });
        res.json(staff);
    } catch (error) {
        console.error('Fetch Staff Error:', error);
        res.status(500).json({ message: 'Error fetching staff' });
    }
};

export const createStaff = async (req, res) => {
    try {
        const { full_name, username, role, phone_number, email } = req.body;

        // Check duplicate
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        // Default password
        const passwordHash = await bcrypt.hash('staff123', 10);

        const newUser = await User.create({
            username,
            password_hash: passwordHash,
            role: 'staff' // In a complex system, this could be dynamic based on admin rights
        });

        const newStaff = await Staff.create({
            userId: newUser.id,
            full_name,
            role, // Job Title
            phone_number,
            email
        });

        res.status(201).json({ message: 'Staff member registered successfully', staff: newStaff });
    } catch (error) {
        console.error('Create Staff Error:', error);
        res.status(500).json({ message: 'Server error creating staff' });
    }
};

// Update Staff
export const updateStaff = async (req, res) => {
    try {
        const { id } = req.params;
        const { full_name, role, phone_number, email } = req.body;

        const staff = await Staff.findByPk(id);
        if (!staff) {
            return res.status(404).json({ message: 'Staff member not found' });
        }

        await staff.update({ full_name, role, phone_number, email });
        res.json({ message: 'Staff updated successfully', staff });
    } catch (error) {
        console.error('Update Staff Error:', error);
        res.status(500).json({ message: 'Error updating staff' });
    }
};

// Delete Staff
export const deleteStaff = async (req, res) => {
    try {
        const { id } = req.params;
        const staff = await Staff.findByPk(id);

        if (!staff) {
            return res.status(404).json({ message: 'Staff member not found' });
        }

        // Also delete associated user account
        if (staff.userId) {
            await User.destroy({ where: { id: staff.userId } });
        }
        await staff.destroy();

        res.json({ message: 'Staff member deleted successfully' });
    } catch (error) {
        console.error('Delete Staff Error:', error);
        res.status(500).json({ message: 'Error deleting staff' });
    }
};

// --- Self Management (For Staff Portal) ---

export const getMe = async (req, res) => {
    try {
        // req.user.id is from the token (User ID)
        const staff = await Staff.findOne({
            where: { userId: req.user.id },
            include: ['StaffAllocations'] // Sequelize will auto-pluralize or we check association name
        });

        // Wait, default association alias might be StaffAllocations or staffAllocations
        // Let's verify index.js: Staff.hasMany(StaffAllocation) -> default alias is StaffAllocations

        if (!staff) return res.status(404).json({ message: 'Profile not found' });
        res.json(staff);
    } catch (error) {
        console.error('Get Me Error:', error);
        res.status(500).json({ message: 'Error fetching profile' });
    }
};

export const updateMe = async (req, res) => {
    try {
        const staff = await Staff.findOne({ where: { userId: req.user.id } });
        if (!staff) return res.status(404).json({ message: 'Profile not found' });

        const { phone_number, email } = req.body;
        // Staff can only update phone and email, not their name or role
        await staff.update({ phone_number, email });
        res.json({ message: 'Profile updated', staff });
    } catch (error) {
        console.error('Update Me Error:', error);
        res.status(500).json({ message: 'Error updating profile' });
    }
};

