import mongoose from 'mongoose';

const violationSchema = new mongoose.Schema({
    candidateId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Candidate',
        required: true
    },
    candidateName: {
        type: String,
        required: true
    },
    examId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Exam',
        required: true
    },
    examName: {
        type: String,
        required: true
    },
    violationType: {
        type: String,
        enum: ['face', 'sound', 'fullscreen', 'tab_switch'],
        required: true
    },
    violationCount: {
        faceDetection: { type: Number, default: 0 },
        soundDetection: { type: Number, default: 0 },
        fullscreenExit: { type: Number, default: 0 },
        tabSwitch: { type: Number, default: 0 }
    },
    screenshotUrl: String,
    severity: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Low'
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Violation', violationSchema);
