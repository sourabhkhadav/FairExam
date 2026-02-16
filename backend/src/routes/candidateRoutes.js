import express from 'express';
import { bulkUploadCandidates, getCandidatesByExam, uploadExcelFile, upload, testEndpoint } from '../controllers/candidateController.js';

const router = express.Router();

router.get('/test', testEndpoint);
router.post('/upload', upload.single('file'), uploadExcelFile);
router.post('/bulk', bulkUploadCandidates);
router.get('/:examId', getCandidatesByExam);

export default router;
