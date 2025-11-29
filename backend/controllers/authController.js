// ============================================
// FILE: backend/controllers/authController.js
// Handles user registration, login, and profile
// ============================================

const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d' // Token expires in 30 days
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { username, email, password, role, age, languages } = req.body;

    // Validation
    if (!username || !email || !password || !role) {
      return res.status(400).json({ 
        message: 'Please provide username, email, password, and role' 
      });
    }

    // Check if role is valid
    if (!['learner', 'teacher', 'both'].includes(role)) {
      return res.status(400).json({ 
        message: 'Role must be learner, teacher, or both' 
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (userExists) {
      return res.status(400).json({ 
        message: 'User with this email or username already exists' 
      });
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password, // Will be hashed automatically by User model
      role,
      age,
      languages: languages || [],
      isNewTeacher: (role === 'teacher' || role === 'both') // Flag new teachers
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profileCompleted: user.profileCompleted,
        token: generateToken(user._id),
        message: 'User registered successfully! Please complete your profile.'
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: 'Server error during registration', 
      error: error.message 
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Please provide email and password' 
      });
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check profile completion and remind user
    const profileStatus = user.checkProfileCompletion();
    
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      profileCompleted: profileStatus,
      profilePicture: user.profilePicture,
      points: user.points,
      badges: user.badges,
      token: generateToken(user._id),
      message: profileStatus 
        ? 'Login successful!' 
        : 'Login successful! Please complete your profile.'
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Server error during login', 
      error: error.message 
    });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check profile completion
    const profileStatus = user.checkProfileCompletion();

    res.json({
      user,
      profileCompleted: profileStatus,
      needsProfileCompletion: !profileStatus
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields
    user.username = req.body.username || user.username;
    user.bio = req.body.bio || user.bio;
    user.age = req.body.age || user.age;
    user.languages = req.body.languages || user.languages;
    user.profilePicture = req.body.profilePicture || user.profilePicture;

    // Update skills based on role
    if (user.role === 'teacher' || user.role === 'both') {
      user.skillsToTeach = req.body.skillsToTeach || user.skillsToTeach;
    }

    if (user.role === 'learner' || user.role === 'both') {
      user.skillsToLearn = req.body.skillsToLearn || user.skillsToLearn;
    }

    // Check if profile is now complete
    user.checkProfileCompletion();

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role,
      bio: updatedUser.bio,
      age: updatedUser.age,
      languages: updatedUser.languages,
      profilePicture: updatedUser.profilePicture,
      skillsToTeach: updatedUser.skillsToTeach,
      skillsToLearn: updatedUser.skillsToLearn,
      profileCompleted: updatedUser.profileCompleted,
      message: 'Profile updated successfully!'
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// @desc    Change user role
// @route   PUT /api/auth/change-role
// @access  Private
const changeRole = async (req, res) => {
  try {
    const { newRole } = req.body;

    if (!['learner', 'teacher', 'both'].includes(newRole)) {
      return res.status(400).json({ 
        message: 'Invalid role. Must be learner, teacher, or both' 
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.role = newRole;

    // If changing to teacher, mark as new teacher
    if ((newRole === 'teacher' || newRole === 'both') && user.role === 'learner') {
      user.isNewTeacher = true;
    }

    await user.save();

    res.json({
      message: 'Role changed successfully!',
      newRole: user.role,
      _id: user._id,
      username: user.username
    });
  } catch (error) {
    console.error('Change role error:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  changeRole
};