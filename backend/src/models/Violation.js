import mongoose from 'mongoose';

const violationSchema = new mongoose.Schema({
    candidateId: {
        type: String,
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
    screenshotUrl: {
        type: String,
        required: true
    },
    violationCount: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Violation', violationSchema);
