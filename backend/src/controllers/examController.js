import asyncHandler from '../middleware/asyncHandler.js';
import Exam from '../models/Exam.js';
import Candidate from '../models/Candidate.js';
import Violation from '../models/Violation.js';
import xlsx from 'xlsx';
import fs from 'fs';

// @desc    Get dashboard stats
// @route   GET /api/exams/dashboard/stats
// @access  Private (Examiner)
export const getDashboardStats = asyncHandler(async (req, res) => {
    const examinerId = req.user.id === 'demo-user-id' ? '507f1f77bcf86cd799439011' : req.user.id;
    
    const totalExams = await Exam.countDocuments({ examiner: examinerId });
    const activeExams = await Exam.countDocuments({ examiner: examinerId, status: 'published' });
    const recentExams = await Exam.find({ examiner: examinerId })
        .sort({ createdAt: -1 })
        .limit(10)
        .select('title startDate startTime status createdAt');
    
    // Get student count for each exam
    const examsWithStudents = await Promise.all(
        recentExams.map(async (exam) => {
            const studentCount = await Candidate.countDocuments({ examId: exam._id });
            return {
                _id: exam._id,
                name: exam.title,
                date: exam.startDate || new Date(exam.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                students: studentCount,
                status: exam.status === 'published' ? 'Scheduled' : 'Draft'
            };
        })
    );

    res.status(200).json({
        success: true,
        data: {
            totalExams,
            activeExams,
            recentExams: examsWithStudents
        }
    });
});

// @desc    Create new exam
// @route   POST /api/exams
// @access  Private (Examiner)
export const createExam = asyncHandler(async (req, res) => {
    if (req.user.id === 'demo-user-id') {
        req.body.examiner = '507f1f77bcf86cd799439011';
    } else {
        req.body.examiner = req.user.id;
    }

    const exam = await Exam.create(req.body);

    res.status(201).json({
        success: true,
        data: exam
    });
});

// @desc    Get all exams for logged in examiner
// @route   GET /api/exams
// @access  Private (Examiner)
export const getExams = asyncHandler(async (req, res) => {
    const examinerId = req.user.id === 'demo-user-id' ? '507f1f77bcf86cd799439011' : req.user.id;
    const exams = await Exam.find({ examiner: examinerId });

    res.status(200).json({
        success: true,
        count: exams.length,
        data: exams
    });
});

// @desc    Get single exam (public - for students)
// @route   GET /api/exams/public/:id
// @access  Public
export const getPublicExam = asyncHandler(async (req, res) => {
    const exam = await Exam.findById(req.params.id).select('title violationLimits duration');

    if (!exam) {
        res.status(404);
        throw new Error('Exam not found');
    }

    res.status(200).json({
        success: true,
        data: exam
    });
});

// @desc    Get single exam
// @route   GET /api/exams/:id
// @access  Private (Examiner)
export const getExam = asyncHandler(async (req, res) => {
    const exam = await Exam.findById(req.params.id);

    if (!exam) {
        res.status(404);
        throw new Error('Exam not found');
    }

    // Make sure user is exam owner
    if (exam.examiner.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Not authorized to access this exam');
    }

    res.status(200).json({
        success: true,
        data: exam
    });
});

// @desc    Update exam
// @route   PUT /api/exams/:id
// @access  Private (Examiner)
export const updateExam = asyncHandler(async (req, res) => {
    let exam = await Exam.findById(req.params.id);

    if (!exam) {
        res.status(404);
        throw new Error('Exam not found');
    }

    const examinerId = req.user.id === 'demo-user-id' ? '507f1f77bcf86cd799439011' : req.user.id;
    if (exam.examiner.toString() !== examinerId) {
        res.status(401);
        throw new Error('Not authorized to update this exam');
    }

    exam = await Exam.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: exam
    });
});

// @desc    Delete exam
// @route   DELETE /api/exams/:id
// @access  Private (Examiner)
export const deleteExam = asyncHandler(async (req, res) => {
    const exam = await Exam.findById(req.params.id);

    if (!exam) {
        res.status(404);
        throw new Error('Exam not found');
    }

    // Make sure user is exam owner
    if (exam.examiner.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Not authorized to delete this exam');
    }

    await Exam.deleteOne({ _id: req.params.id });

    res.status(200).json({
        success: true,
        data: {}
    });
});

// @desc    Import questions from Excel
// @route   POST /api/exams/import-questions
// @access  Private (Examiner)
export const importQuestions = asyncHandler(async (req, res) => {
    if (!req.file) {
        res.status(400);
        throw new Error('Please upload an Excel file');
    }

    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    // Map data to Question format
    // Expected columns: Question Text, Option A, Option B, Option C, Option D, Correct Answer (A/B/C/D or 1/2/3/4), Marks, Difficulty, Tags (comma separated)
    const questions = data.map((row, index) => {
        const options = [
            row['Option A'] || row['OptionA'] || '',
            row['Option B'] || row['OptionB'] || '',
            row['Option C'] || row['OptionC'] || '',
            row['Option D'] || row['OptionD'] || ''
        ];

        // Parse correct answer
        let correctIdx = 0;
        const correctVal = row['Correct Answer'] || row['CorrectAnswer'];
        
        if (typeof correctVal === 'number') {
            correctIdx = correctVal - 1; // Assuming 1-based index in excel
        } else if (typeof correctVal === 'string') {
            const lower = correctVal.trim().toLowerCase();
            if (lower === 'a') correctIdx = 0;
            else if (lower === 'b') correctIdx = 1;
            else if (lower === 'c') correctIdx = 2;
            else if (lower === 'd') correctIdx = 3;
            else {
                 // Try to match text
                 const idx = options.findIndex(opt => opt.toLowerCase() === lower);
                 if (idx !== -1) correctIdx = idx;
            }
        }

        // Clamp index
        if (correctIdx < 0) correctIdx = 0;
        if (correctIdx > 3) correctIdx = 3;

        return {
            id: Date.now() + index, // Temporary ID for frontend
            sectionId: row['Section ID'] || row['SectionID'] || 0,
            type: 'MCQ',
            text: row['Question Text'] || row['QuestionText'] || row['Question'] || 'New Question',
            options,
            correct: correctIdx,
            marks: parseInt(row['Marks'] || 2),
            difficulty: row['Difficulty'] || 'Medium',
            tags: row['Tags'] ? row['Tags'].split(',').map(t => t.trim()) : []
        };
    });

    res.status(200).json({
        success: true,
        count: questions.length,
        data: questions
    });
});

// @desc    Get exams for results publishing
// @route   GET /api/exams/results/publishing
// @access  Private (Examiner)
export const getExamsForResults = asyncHandler(async (req, res) => {
    const examinerId = req.user.id === 'demo-user-id' ? '507f1f77bcf86cd799439011' : req.user.id;
    
    const exams = await Exam.find({ examiner: examinerId, status: 'published' })
        .sort({ createdAt: -1 })
        .select('title startDate status createdAt totalMarks');
    
    const examsWithStats = await Promise.all(
        exams.map(async (exam) => {
            const studentCount = await Candidate.countDocuments({ examId: exam._id });
            return {
                id: exam._id,
                name: exam.title,
                date: exam.startDate || new Date(exam.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                participants: studentCount,
                avgScore: '75%',
                status: 'Draft',
                isCalculated: true
            };
        })
    );

    res.status(200).json({
        success: true,
        data: examsWithStats
    });
});
