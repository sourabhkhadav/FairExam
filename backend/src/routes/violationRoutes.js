import express from 'express';
import { uploadViolationScreenshot, getViolationsByExam, getViolationsByCandidate } from '../controllers/violationController.js';

const router = express.Router();

router.post('/upload-screenshot', uploadViolationScreenshot);
router.get('/exam/:examId', getViolationsByExam);
router.get('/candidate/:candidateId', getViolationsByCandidate);

export default router;
