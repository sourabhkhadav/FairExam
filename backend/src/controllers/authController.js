import User from '../models/User.js';
import Candidate from '../models/Candidate.js';
import Exam from '../models/Exam.js';
import jwt from 'jsonwebtoken';

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, candidateId, role } = req.body;

        const userExists = await User.findOne({
            $or: [
                { email },
                { candidateId: candidateId || 'never_match_this_string_if_empty' }
            ]
        });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists with this email or Candidate ID' });
        }

        const user = await User.create({
            name,
            email,
            password,
            candidateId,
            role: role || 'examiner'
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
    try {
        const { email, password, candidateId } = req.body;

        // Hardcoded test credentials
        if (candidateId === 'DEMO123' && password === 'pass123') {
            return res.json({
                _id: 'demo-user-id',
                name: 'Demo User',
                email: 'demo@fairexam.com',
                role: 'student',
                candidateId: 'DEMO123',
                token: generateToken('demo-user-id')
            });
        }

        // Check for user email or candidateId
        const user = await User.findOne({
            $or: [
                { email: email || '' },
                { candidateId: candidateId || '' }
            ]
        }).select('+password');

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                candidateId: user.candidateId,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Candidate login with ID and password
// @route   POST /api/auth/candidate-login
// @access  Public
export const candidateLogin = async (req, res) => {
    try {
        const { candidateId, password } = req.body;

        console.log('🔐 Login attempt:', { candidateId, password });

        if (!candidateId || !password) {
            return res.status(400).json({ message: 'Please provide candidate ID and password' });
        }

        const candidate = await Candidate.findOne({ candidateId });
        console.log('👤 Found candidate:', candidate ? { id: candidate._id, candidateId: candidate.candidateId, hasPassword: !!candidate.password, password: candidate.password } : 'NOT FOUND');

        if (!candidate) {
            return res.status(401).json({ message: 'Invalid credentials - Candidate not found' });
        }

        if (!candidate.password) {
            return res.status(401).json({ message: 'Credentials not generated yet. Please wait for exam to start.' });
        }

        if (candidate.password !== password) {
            console.log('❌ Password mismatch:', { stored: candidate.password, provided: password });
            return res.status(401).json({ message: 'Invalid credentials - Wrong password' });
        }

        const exam = await Exam.findById(candidate.examId);
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }

        const now = new Date();
        const start = new Date(`${exam.startDate}T${exam.startTime}`);
        const end = new Date(`${exam.endDate}T${exam.endTime}`);
        const graceMinutes = exam.graceTime || 15;
        const endWithGrace = new Date(end.getTime() + graceMinutes * 60000);

        if (now < start) {
            return res.status(403).json({ message: 'Exam has not started yet' });
        }

        if (now > endWithGrace) {
            return res.status(403).json({ message: 'Exam has ended' });
        }

        const token = jwt.sign(
            { candidateId: candidate._id, examId: exam._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        console.log('✅ Login successful');

        res.json({
            success: true,
            candidate: {
                id: candidate._id,
                name: candidate.name,
                candidateId: candidate.candidateId,
                examId: exam._id,
                examTitle: exam.title
            },
            exam: {
                id: exam._id,
                title: exam.title,
                duration: exam.duration,
                questions: exam.questions
            },
            token
        });
    } catch (error) {
        console.error('❌ Login error:', error);
        res.status(500).json({ message: error.message });
    }
};
