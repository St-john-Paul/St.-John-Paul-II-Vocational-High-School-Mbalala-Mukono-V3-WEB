import express from 'express';
import { recordPayment, getStudentPayments, getAllPayments, deletePayment, updatePayment, simulateMobileMoneyPayment, generateInvoices, getFinanceStats } from '../controllers/financeController.js';
import { authenticateToken, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticateToken);

// Admin only routes
router.post('/pay', requireRole(['admin', 'bursar']), recordPayment);
router.get('/', requireRole(['admin', 'bursar']), getAllPayments);
router.delete('/:id', requireRole(['admin', 'bursar']), deletePayment);
router.put('/:id', requireRole(['admin', 'bursar']), updatePayment);

// Student or Admin can view
router.get('/:student_id', getStudentPayments);

router.post('/simulate-momo', simulateMobileMoneyPayment);
router.post('/generate-invoices', generateInvoices);
router.get('/stats', getFinanceStats);

export default router;
