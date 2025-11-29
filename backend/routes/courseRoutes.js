// ============================================
// FILE: backend/routes/courseRoutes.js
// API endpoints for courses
// ============================================

const express = require('express');
const router = express.Router();
const {
  createCourse,
  getAllCourses,
  getMyCourses
} = require('../controllers/coursecontroller');
const { protect, isTeacher } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getAllCourses);

// Private routes (require authentication)
router.post('/create', protect, isTeacher, createCourse);
router.get('/my-courses', protect, getMyCourses);

module.exports = router;