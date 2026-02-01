import { Student, Class } from '../models/index.js';

// Mock database for messages (In production, this would be a real table)
let messageLog = [];

/**
 * Send a single message
 */
export const sendMessage = async (req, res) => {
    try {
        const { recipient_phone, message, type, student_id } = req.body;

        if (!recipient_phone || !message) {
            return res.status(400).json({ message: 'Phone and message are required' });
        }

        // Simulate Sending Delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const msgEntry = {
            id: Date.now(),
            recipient: recipient_phone,
            message,
            type: type || 'SMS', // SMS or WhatsApp
            status: 'Delivered',
            timestamp: new Date(),
            student_id
        };

        // Add to log
        messageLog.unshift(msgEntry);

        // Console Log "Simulator"
        console.log(`\n--- 📨 COMMUNICATION SIMULATOR ---`);
        console.log(`To: ${recipient_phone}`);
        console.log(`Type: ${type}`);
        console.log(`Body: ${message}`);
        console.log(`Status: ✅ Sent Successfully`);
        console.log(`----------------------------------\n`);

        res.json({ success: true, message: 'Message queued for delivery', data: msgEntry });

    } catch (error) {
        console.error('Send Error:', error);
        res.status(500).json({ message: 'Error sending message' });
    }
};

/**
 * Broadcast to a whole class
 */
export const broadcastToClass = async (req, res) => {
    try {
        const { class_level, message, type } = req.body;

        const students = await Student.findAll({
            where: { class_level }
        });

        if (students.length === 0) {
            return res.status(404).json({ message: 'No students found in this class' });
        }

        let sentCount = 0;

        // Process in "batches"
        for (const student of students) {
            if (student.parent_phone) {
                messageLog.unshift({
                    id: Date.now() + Math.random(),
                    recipient: student.parent_phone,
                    message: message.replace('{name}', student.full_name), // Personalize
                    type: type || 'SMS',
                    status: 'Delivered',
                    timestamp: new Date(),
                    student_id: student.id
                });
                sentCount++;
            }
        }

        res.json({
            success: true,
            message: `Broadcast queued for ${sentCount} parents`,
            recipients: sentCount
        });

    } catch (error) {
        console.error('Broadcast Error:', error);
        res.status(500).json({ message: 'Error broadcasting message' });
    }
};

/**
 * Get Message History
 */
export const getHistory = async (req, res) => {
    try {
        // Return latest 50 messages
        res.json(messageLog.slice(0, 50));
    } catch (error) {
        res.status(500).json({ message: 'Error fetching history' });
    }
};

export default {
    sendMessage,
    broadcastToClass,
    getHistory
};
