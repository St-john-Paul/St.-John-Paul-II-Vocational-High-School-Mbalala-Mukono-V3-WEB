import { StaffAllocation, Staff, User, Subject, Class } from '../models/index.js';

// Get Matrix Data
export const getAllocations = async (req, res) => {
    try {
        const allocations = await StaffAllocation.findAll({
            include: [{ model: Staff, attributes: ['full_name', 'id'] }]
        });
        res.json(allocations);
    } catch (error) {
        console.error('Allocations Fetch Error:', error);
        res.status(500).json({ message: 'Error fetching allocations: ' + error.message });
    }
};

// Assign Teacher (Upsert)
export const assignTeacher = async (req, res) => {
    try {
        const { class_level, subject_code, subject_name, staff_id } = req.body;

        // Check if allocation exists for this Class+Subject
        const existing = await StaffAllocation.findOne({
            where: { class_level, subject_code }
        });

        if (existing) {
            // Update existing
            await existing.update({ staff_id, subject_name }); // Update name just in case
            res.json(existing);
        } else {
            // Create new
            const newAlloc = await StaffAllocation.create({
                class_level,
                subject_code,
                subject_name,
                staff_id
            });
            res.status(201).json(newAlloc);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error assigning teacher' });
    }
};

export const removeAllocation = async (req, res) => {
    try {
        const { id } = req.params;
        await StaffAllocation.destroy({ where: { id } });
        res.json({ message: 'Allocation removed' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing allocation' });
    }
};
