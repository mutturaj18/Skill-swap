// ============================================
// FILE: backend/controllers/courseController.js
// Handles course creation and management
// ============================================

const Course = require('../models/Course');
const User = require('../models/User');

// @desc    Create a new course
// @route   POST /api/courses/create
// @access  Private (Teachers only)
const createCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      skillName,
      thumbnail,
      language,
      level,
      estimatedCompletionTime,
      videos,
      teacherName
    } = req.body;

    // Validation
    if (!title || !description || !category || !skillName) {
      return res.status(400).json({ 
        message: 'Please provide all required fields' 
      });
    }

    // Check if user is teacher or both
    if (req.user.role !== 'teacher' && req.user.role !== 'both') {
      return res.status(403).json({ 
        message: 'Only teachers can create courses' 
      });
    }

    // Create course
    const course = await Course.create({
      title,
      description,
      category,
      skillName,
      thumbnail: thumbnail || 'https://via.placeholder.com/400x250',
      language,
      level,
      estimatedCompletionTime,
      videos: videos || [],
      teacher: req.user._id,
      teacherName: teacherName || req.user.username,
      isPublished: true,
      publishedDate: new Date()
    });

    // Calculate total duration
    course.calculateTotalDuration();
    await course.save();

    // Add course to user's coursesCreated
    await User.findByIdAndUpdate(req.user._id, {
      $push: { coursesCreated: course._id }
    });

    res.status(201).json({
      message: 'Course created successfully!',
      course
    });

  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true })
      .populate('teacher', 'username profilePicture')
      .sort({ createdAt: -1 });

    res.json(courses);
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// @desc    Get teacher's courses
// @route   GET /api/courses/my-courses
// @access  Private
const getMyCourses = async (req, res) => {
  try {
    const courses = await Course.find({ teacher: req.user._id })
      .sort({ createdAt: -1 });

    res.json(courses);
  } catch (error) {
    console.error('Get my courses error:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getMyCourses
};