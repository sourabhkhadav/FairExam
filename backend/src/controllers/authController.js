import User from '../models/User.js';
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
