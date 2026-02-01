import { Student, Staff } from '../models/index.js';

export const getDashboardStats = async (req, res) => {
    try {
        const studentCount = await Student.count();
        const staffCount = await Staff.count();

        // Mock financial data for now
        const totalFees = await Student.sum('fee_balance') || 0;

        res.json({
            students: studentCount,
            staff: staffCount,
            fees: totalFees
        });
    } catch (error) {
        console.error('Stats Error:', error);
        res.status(500).json({ message: 'Error loading dashboard statistics' });
    }
};
