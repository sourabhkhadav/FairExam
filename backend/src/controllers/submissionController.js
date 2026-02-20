import asyncHandler from '../middleware/asyncHandler.js';
import Submission from '../models/Submission.js';
import Exam from '../models/Exam.js';
import Candidate from '../models/Candidate.js';

// @desc    Submit exam and auto-grade
// @route   POST /api/submissions
// @access  Public (with candidate token)
export const submitExam = asyncHandler(async (req, res) => {
    const { examId, candidateId, answers, timeTaken } = req.body;

    console.log('Submission received:', { examId, candidateId, answersCount: answers?.length, timeTaken });

    if (!examId || !candidateId || !answers) {
        res.status(400);
        throw new Error('Missing required fields: examId, candidateId, or answers');
    }

    const exam = await Exam.findById(examId);
    if (!exam) {
        res.status(404);
        throw new Error('Exam not found');
    }

    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
        res.status(404);
        throw new Error('Candidate not found');
    }

    console.log(`Exam: ${exam.title}, Total Marks: ${exam.totalMarks}, Questions: ${exam.questions.length}`);

    // Auto-grade the exam
    let score = 0;
    const gradedAnswers = answers.map(answer => {
        const questionIndex = parseInt(answer.questionId) - 1;
        const question = exam.questions[questionIndex];
        
        const isCorrect = question && question.correct === answer.selectedOption;
        if (isCorrect) {
            score += question.marks || 0;
        }
        
        return {
            questionId: answer.questionId,
            selectedOption: answer.selectedOption,
            isCorrect
        };
    });

    console.log(`Candidate: ${candidate.name}, Score: ${score}/${exam.totalMarks}`);

    const submission = await Submission.create({
        examId,
        candidateId,
        answers: gradedAnswers,
        score,
        totalMarks: exam.totalMarks,
        timeTaken: timeTaken || 0
    });

    console.log('✅ Submission saved:', submission._id);

    res.status(201).json({
        success: true,
        data: {
            submissionId: submission._id,
            score,
            totalMarks: exam.totalMarks,
            percentage: submission.percentage
        }
    });
});
