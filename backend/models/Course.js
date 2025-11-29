// ============================================
// FILE: backend/models/Course.js
// This defines how course/video data is stored
// ============================================

const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  // Course Basic Info
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000
  },
  
  // Category and Skill
  category: {
    type: String,
    required: true,
    enum: ['Music', 'Coding', 'Art', 'Sports', 'Language', 'Cooking', 'Photography', 'Dance', 'Other']
  },
  skillName: {
    type: String,
    required: true
  },
  
  // Teacher Info
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  teacherName: String,
  
  // Course Content
  thumbnail: {
    type: String,
    default: 'https://via.placeholder.com/400x250'
  },
  
  videos: [{
    title: String,
    description: String,
    videoUrl: String, // Cloudinary URL
    duration: Number, // in minutes
    order: Number,
    isPublic: {
      type: Boolean,
      default: true
    }
  }],
  
  // Course Settings
  totalDuration: {
    type: Number, // Total course duration in hours
    default: 0
  },
  language: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'All Levels'],
    default: 'All Levels'
  },
  
  // Time allocation (how long to complete)
  estimatedCompletionTime: {
    type: Number, // in days
    default: 30
  },
  
  // Enrollment
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  totalEnrollments: {
    type: Number,
    default: 0
  },
  
  // Rating and Reviews
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
  
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    userName: String,
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Live Sessions
  liveSessionsEnabled: {
    type: Boolean,
    default: false
  },
  
  liveSessions: [{
    title: String,
    description: String,
    scheduledDate: Date,
    duration: Number, // in minutes
    meetingLink: String,
    maxParticipants: Number,
    participants: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    isCompleted: {
      type: Boolean,
      default: false
    }
  }],
  
  // Course Status
  isPublished: {
    type: Boolean,
    default: false
  },
  publishedDate: Date,
  
  // Tags for search
  tags: [String],
  
  // Analytics
  views: {
    type: Number,
    default: 0
  }
  
}, {
  timestamps: true
});

// Method to calculate total duration from videos
courseSchema.methods.calculateTotalDuration = function() {
  const totalMinutes = this.videos.reduce((sum, video) => sum + (video.duration || 0), 0);
  this.totalDuration = Math.round(totalMinutes / 60 * 10) / 10; // Convert to hours, round to 1 decimal
  return this.totalDuration;
};

// Method to update average rating
courseSchema.methods.updateRating = function() {
  if (this.reviews.length === 0) {
    this.rating.average = 0;
    this.rating.totalReviews = 0;
    return;
  }
  
  const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
  this.rating.average = Math.round((sum / this.reviews.length) * 10) / 10;
  this.rating.totalReviews = this.reviews.length;
};

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
