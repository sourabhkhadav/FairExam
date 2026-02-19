import { v2 as cloudinary } from 'cloudinary';
import Violation from '../models/Violation.js';

export const uploadViolationScreenshot = async (req, res) => {
    try {
        const { image, candidateId, candidateName, examId, examName, violationCount } = req.body;

        if (!image) {
            return res.status(400).json({ message: 'No image provided' });
        }

        cloudinary.config({
            cloud_name: 'dhue3xnpx',
            api_key: '212913295232361',
            api_secret: 'FklRkFnZZzTVSEZAyx348LbRb1c'
        });

        const uploadResult = await cloudinary.uploader.upload(image, {
            folder: 'exam-violations',
            public_id: `${candidateId}_violation_${violationCount}_${Date.now()}`,
            resource_type: 'image'
        });

        const violation = await Violation.create({
            candidateId,
            candidateName,
            examId,
            examName,
            screenshotUrl: uploadResult.secure_url,
            violationCount
        });

        res.status(200).json({
            success: true,
            message: 'Screenshot uploaded successfully',
            url: uploadResult.secure_url,
            violation
        });
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Failed to upload screenshot',
            error: error.message 
        });
    }
};

export const getViolationsByExam = async (req, res) => {
    try {
        const { examId } = req.params;
        const violations = await Violation.find({ examId }).sort({ timestamp: -1 });
        res.status(200).json({ success: true, violations });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getViolationsByCandidate = async (req, res) => {
    try {
        const { candidateId } = req.params;
        const violations = await Violation.find({ candidateId }).sort({ timestamp: -1 });
        res.status(200).json({ success: true, violations });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
