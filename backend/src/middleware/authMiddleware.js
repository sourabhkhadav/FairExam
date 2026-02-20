import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/User.js';

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
            } else {
                const user = await User.findById(decoded.id).select('-password');
                if (!user) {
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
        if (!req.user || (roles.length && !roles.includes(req.user.role))) {
            res.status(403);
            throw new Error(`User role ${req.user ? req.user.role : 'none'} is not authorized to access this route`);
        }
        next();
    };
};
