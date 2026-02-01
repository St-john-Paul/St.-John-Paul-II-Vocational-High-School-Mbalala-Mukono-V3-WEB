import { Fee, Student } from '../models/index.js';

export const recordPayment = async (req, res) => {
    try {
        const { student_id, amount, type, reference } = req.body;

        // Find student to update balance
        const student = await Student.findByPk(student_id);
        if (!student) return res.status(404).json({ message: 'Student not found' });

        // Record Payment
        const payment = await Fee.create({
            student_id,
            amount: parseFloat(amount),
            type,
            reference
        });

        // Update Balance (Assuming negative balance means credit, positive means debt)
        // Here we assume fee_balance is DEBT. Payment REDUCES debt.
        student.fee_balance = Math.max(0, student.fee_balance - parseFloat(amount));
        await student.save();

        res.status(201).json({ message: 'Payment recorded', payment, new_balance: student.fee_balance });

    } catch (error) {
        console.error('Payment Error:', error);
        res.status(500).json({ message: 'Error recording payment' });
    }
};

export const getAllPayments = async (req, res) => {
    try {
        const payments = await Fee.findAll({
            include: [{ model: Student, attributes: ['full_name', 'reg_number'] }],
            order: [['date', 'DESC']],
            limit: 50
        });
        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getStudentPayments = async (req, res) => {
    try {
        const { student_id } = req.params;
        const payments = await Fee.findAll({
            where: { student_id },
            order: [['date', 'DESC']]
        });
        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching payments' });
    }
};

export const deletePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const payment = await Fee.findByPk(id);

        if (!payment) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        // Get student and add back the amount to balance (reverse the payment)
        const student = await Student.findByPk(payment.student_id);
        if (student) {
            student.fee_balance = student.fee_balance + parseFloat(payment.amount);
            await student.save();
        }

        await payment.destroy();
        res.json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        console.error('Delete Error:', error);
        res.status(500).json({ message: 'Error deleting transaction' });
    }
};

export const updatePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, type, reference } = req.body;

        const payment = await Fee.findByPk(id);
        if (!payment) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        // Calculate difference to update student balance
        const oldAmount = payment.amount;
        const newAmount = parseFloat(amount);
        const difference = newAmount - oldAmount;

        // Update student balance
        const student = await Student.findByPk(payment.student_id);
        if (student) {
            student.fee_balance = student.fee_balance - difference;
            await student.save();
        }

        // Update payment
        payment.amount = newAmount;
        payment.type = type;
        payment.reference = reference;
        await payment.save();

        res.json({ message: 'Transaction updated successfully', payment });
    } catch (error) {
        console.error('Update Error:', error);
        res.status(500).json({ message: 'Error updating transaction' });
    }
};

export const simulateMobileMoneyPayment = async (req, res) => {
    try {
        const { student_id, amount, phone } = req.body;
        // Re-use record logic
        const student = await Student.findByPk(student_id);
        if (!student) return res.status(404).json({ message: 'Student not found' });

        const payment = await Fee.create({
            student_id,
            amount,
            type: 'Tuition', // Default for simulation
            reference: `MOMO-${Date.now()}-${phone.slice(-4)}`
        });

        student.fee_balance = Math.max(0, student.fee_balance - parseFloat(amount));
        await student.save();

        res.json({ message: 'Mobile Money Payment Received', payment });
    } catch (error) {
        res.status(500).json({ message: 'Simulation failed' });
    }
};

export const generateInvoices = async (req, res) => {
    try {
        const { class_level, amount } = req.body;
        const students = await Student.findAll({ where: { class_level } });

        let count = 0;
        for (const student of students) {
            student.fee_balance = (parseFloat(student.fee_balance) || 0) + parseFloat(amount);
            await student.save();
            count++;
        }
        res.json({ message: `Generated invoices for ${count} students in ${class_level}` });
    } catch (error) {
        res.status(500).json({ message: 'Error generating invoices' });
    }
};

export const getFinanceStats = async (req, res) => {
    try {
        const fees = await Fee.findAll();
        const by_type = {};
        fees.forEach(f => {
            by_type[f.type] = (by_type[f.type] || 0) + parseFloat(f.amount);
        });
        res.json({ by_type });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stats' });
    }
};
