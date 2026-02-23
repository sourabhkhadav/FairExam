import express from 'express';
import { submitExam, sendExamResults } from '../controllers/submissionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', submitExam);
router.post('/send-results/:examId', protect, sendExamResults);

export default router;
