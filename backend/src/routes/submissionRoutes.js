import express from 'express';
import { submitExam } from '../controllers/submissionController.js';

const router = express.Router();

router.post('/', submitExam);

export default router;
