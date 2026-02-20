import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/User.js';
import Candidate from '../models/Candidate.js';

export const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            if (decoded.id === 'demo-user-id') {
                req.user = {
                    id: 'demo-user-id',
                    _id: 'demo-user-id',
                    name: 'Demo User',
                    email: 'demo@fairexam.com',
                    role: 'examiner'
                };
            } else if (decoded.candidateId) {
                // Candidate token
                req.candidate = await Candidate.findById(decoded.candidateId);
                req.examId = decoded.examId;
                if (!req.candidate) {
                    res.status(401);
                    throw new Error('Candidate not found');
                }
            } else {
                // User token
                req.user = await User.findById(decoded.id).select('-password');
                if (!req.user) {
                    res.status(401);
                    throw new Error('User not found');
                }
                req.user = {
                    id: user._id.toString(),
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                };
            }
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

export const authorize = (...roles) => {
    return (req, res, next) => {
        // Skip authorization if no roles specified
        if (!roles.length) {
            return next();
        }
        
        // Check if user exists and has required role
        if (!req.user) {
            res.status(403);
            throw new Error('Access denied - User authentication required');
        }
        
        if (!roles.includes(req.user.role)) {
            res.status(403);
            throw new Error(`User role ${req.user.role} is not authorized to access this route`);
        }
        next();
    };
};
