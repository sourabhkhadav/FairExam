import express from 'express';
import { uploadViolationScreenshot, getViolationsByExam, getViolationsByCandidate, getAllViolations } from '../controllers/violationController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/upload-screenshot', uploadViolationScreenshot);
router.get('/exam/:examId', getViolationsByExam);
router.get('/candidate/:candidateId', getViolationsByCandidate);

// Protected route for examiner
router.get('/all', protect, authorize('examiner'), getAllViolations);

export default router;
