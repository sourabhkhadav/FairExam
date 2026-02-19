import { v2 as cloudinary } from 'cloudinary';
import Violation from '../models/Violation.js';
import Exam from '../models/Exam.js';

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

// Get all violations with stats for examiner
export const getAllViolations = async (req, res) => {
    try {
        const violations = await Violation.find()
            .sort({ timestamp: -1 })
            .limit(100);
        
        const totalViolations = await Violation.countDocuments();
        const highSeverity = violations.filter(v => v.violationCount >= 5).length;
        const underReview = violations.filter(v => v.violationCount >= 3 && v.violationCount < 5).length;
        
        const formattedViolations = violations.map(v => ({
            id: v._id,
            name: v.candidateName,
            exam: v.examName,
            type: v.violationCount >= 5 ? 'Multiple Face Detected' : v.violationCount >= 3 ? 'Tab Switch' : 'Unusual Noise Detected',
            time: new Date(v.timestamp).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }),
            severity: v.violationCount >= 5 ? 'High' : v.violationCount >= 3 ? 'Medium' : 'Low',
            screenshotUrl: v.screenshotUrl
        }));
        
        res.status(200).json({ 
            success: true, 
            data: {
                violations: formattedViolations,
                stats: {
                    totalViolations,
                    highSeverity,
                    underReview
                }
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
