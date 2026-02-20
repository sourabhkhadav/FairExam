import { v2 as cloudinary } from 'cloudinary';
import Violation from '../models/Violation.js';
import Exam from '../models/Exam.js';

// Record a violation
export const recordViolation = async (req, res) => {
    try {
        const { candidateId, candidateName, examId, examName, violationType, screenshotUrl, violationCount } = req.body;

        let violation = await Violation.findOne({ candidateId, examId });

        if (violation) {
            // Update with provided counts or increment
            if (violationCount) {
                violation.violationCount = violationCount;
            } else {
                if (violationType === 'face') violation.violationCount.faceDetection++;
                if (violationType === 'sound') violation.violationCount.soundDetection++;
                if (violationType === 'fullscreen') violation.violationCount.fullscreenExit++;
                if (violationType === 'tab_switch') violation.violationCount.tabSwitch++;
            }
            
            const total = violation.violationCount.faceDetection + 
                         violation.violationCount.soundDetection + 
                         violation.violationCount.fullscreenExit + 
                         violation.violationCount.tabSwitch;
            
            if (total >= 10) violation.severity = 'High';
            else if (total >= 5) violation.severity = 'Medium';
            else violation.severity = 'Low';
            
            if (screenshotUrl) violation.screenshotUrl = screenshotUrl;
            violation.timestamp = Date.now();
            
            await violation.save();
        } else {
            const newViolationCount = violationCount || {
                faceDetection: violationType === 'face' ? 1 : 0,
                soundDetection: violationType === 'sound' ? 1 : 0,
                fullscreenExit: violationType === 'fullscreen' ? 1 : 0,
                tabSwitch: violationType === 'tab_switch' ? 1 : 0
            };
            
            const total = newViolationCount.faceDetection + 
                         newViolationCount.soundDetection + 
                         newViolationCount.fullscreenExit + 
                         newViolationCount.tabSwitch;
            
            let severity = 'Low';
            if (total >= 10) severity = 'High';
            else if (total >= 5) severity = 'Medium';
            
            violation = await Violation.create({
                candidateId,
                candidateName,
                examId,
                examName,
                violationType: violationType || 'face',
                violationCount: newViolationCount,
                screenshotUrl,
                severity
            });
        }

        res.status(200).json({
            success: true,
            message: 'Violation recorded',
            violation
        });
    } catch (error) {
        console.error('Record violation error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Failed to record violation',
            error: error.message 
        });
    }
};

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
        
        const totalViolations = violations.length;
        const highSeverity = violations.filter(v => v.severity === 'High').length;
        const underReview = violations.filter(v => v.severity === 'Medium').length;
        
        const formattedViolations = violations.map(v => {
            const total = v.violationCount.faceDetection + 
                         v.violationCount.soundDetection + 
                         v.violationCount.fullscreenExit + 
                         v.violationCount.tabSwitch;
            
            let type = 'Multiple Violations';
            if (v.violationCount.faceDetection > 0) type = 'Multiple Face Detected';
            else if (v.violationCount.tabSwitch > 0) type = 'Tab Switch';
            else if (v.violationCount.soundDetection > 0) type = 'Unusual Noise Detected';
            else if (v.violationCount.fullscreenExit > 0) type = 'Fullscreen Exit';
            
            return {
                id: v._id,
                name: v.candidateName,
                exam: v.examName,
                type,
                time: new Date(v.timestamp).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }),
                severity: v.severity,
                screenshotUrl: v.screenshotUrl,
                violationCount: v.violationCount
            };
        });
        
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
