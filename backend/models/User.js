// ============================================
// FILE: backend/models/User.js
// This defines how user data is stored in database
// ============================================

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  // Basic Info
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  
  // User Role: 'learner', 'teacher', or 'both'
  role: {
    type: String,
    enum: ['learner', 'teacher', 'both'],
    required: true
  },
  
  // Profile Info
  profilePicture: {
    type: String,
    default: 'https://via.placeholder.com/150'
  },
  bio: {
    type: String,
    maxlength: 500
  },
  age: {
    type: Number,
    min: 5,
    max: 120
  },
  languages: [{
    type: String
  }],
  
  // For Teachers and Both
  skillsToTeach: [{
    skillName: String,
    category: String, // e.g., 'Music', 'Coding', 'Art', 'Sports'
    experience: String, // e.g., 'Beginner', 'Intermediate', 'Expert'
    verified: {
      type: Boolean,
      default: false
    }
  }],
  
  // For Learners and Both
  skillsToLearn: [{
    skillName: String,
    category: String
  }],
  
  // Points and Badges System
  points: {
    type: Number,
    default: 0
  },
  badges: [{
    badgeName: String,
    badgeImage: String,
    earnedDate: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Coupons (only for Teachers and Both)
  coupons: [{
    couponCode: String,
    provider: String, // e.g., 'Amazon', 'Flipkart'
    discount: String,
    expiryDate: Date,
    used: {
      type: Boolean,
      default: false
    }
  }],
  
  // Teacher Rating
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    totalReviews: {
      type: Number,
      default: 0
    }
  },
  
  // Profile Completion
  profileCompleted: {
    type: Boolean,
    default: false
  },
  
  // New Teacher Spotlight
  isNewTeacher: {
    type: Boolean,
    default: false
  },
  joinedDate: {
    type: Date,
    default: Date.now
  },
  
  // Courses created (for Teachers)
  coursesCreated: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  
  // Courses enrolled (for Learners)
  coursesEnrolled: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  
  // Active Swaps (for Both type users)
  activeSwaps: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SwapRequest'
  }]
  
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Hash password before saving
userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare passwords during login
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Check if profile is complete
userSchema.methods.checkProfileCompletion = function() {
  const requiredFields = [
    this.username,
    this.email,
    this.bio,
    this.age,
    this.languages.length > 0
  ];
  
  if (this.role === 'teacher' || this.role === 'both') {
    requiredFields.push(this.skillsToTeach.length > 0);
  }
  
  if (this.role === 'learner' || this.role === 'both') {
    requiredFields.push(this.skillsToLearn.length > 0);
  }
  
  this.profileCompleted = requiredFields.every(field => field);
  return this.profileCompleted;
};

module.exports = mongoose.models.User || mongoose.model('User', userSchema);