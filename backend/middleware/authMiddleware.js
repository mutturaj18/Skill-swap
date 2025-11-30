// ============================================
// FILE: backend/middleware/authMiddleware.js
// This protects routes - only logged-in users can access
// ============================================

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Verify if user has valid token
const protect = async (req, res, next) => {
  let token;

  // Check if token exists in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header (format: "Bearer TOKEN_HERE")
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token (exclude password)
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }

      next(); // User is authenticated, proceed to next middleware/route
    } catch (error) {
      console.error('Token verification failed:', error);
      return res.status(401).json({ message: 'Not authorized, invalid token' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

// Check if user has specific role
const checkRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Access denied. Required role: ${roles.join(' or ')}. Your role: ${req.user.role}` 
      });
    }

    next();
  };
};

// Check if user is a teacher (or both)
const isTeacher = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  if (req.user.role !== 'teacher' && req.user.role !== 'both') {
    return res.status(403).json({ 
      message: 'Access denied. Only teachers can perform this action.' 
    });
  }

  next();
};

// Check if user is a learner (or both)
const isLearner = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  if (req.user.role !== 'learner' && req.user.role !== 'both') {
    return res.status(403).json({ 
      message: 'Access denied. Only learners can perform this action.' 
    });
  }

  next();
};

// Check if profile is complete (remind user if not)
const checkProfileComplete = (req, res, next) => {
  if (!req.user.profileCompleted) {
    return res.status(400).json({ 
      message: 'Please complete your profile before proceeding.',
      profileCompleted: false
    });
  }
  next();
};

module.exports = { 
  protect, 
  checkRole, 
  isTeacher, 
  isLearner,
  checkProfileComplete 
};