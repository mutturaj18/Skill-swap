// ============================================
// FILE: backend/routes/authRoutes.js
// API endpoints for authentication
// ============================================

const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  changeRole
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Public routes (no login required)
router.post('/register', registerUser);
router.post('/login', loginUser);

// Private routes (login required)
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.put('/change-role', protect, changeRole);

module.exports = router;