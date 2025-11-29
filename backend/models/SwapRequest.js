// ============================================
// FILE: backend/models/SwapRequest.js
// For users with role "both" to swap skills
// ============================================

const mongoose = require('mongoose');

const swapRequestSchema = new mongoose.Schema({
  // User 1 (Person who initiates the swap)
  user1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  user1Name: String,
  user1SkillToTeach: {
    skillName: String,
    category: String
  },
  user1SkillToLearn: {
    skillName: String,
    category: String
  },
  
  // User 2 (Person who receives the swap request)
  user2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  user2Name: String,
  user2SkillToTeach: {
    skillName: String,
    category: String
  },
  user2SkillToLearn: {
    skillName: String,
    category: String
  },
  
  // Match Info
  matchPercentage: {
    type: Number,
    default: 100 // If perfect match (User1 wants to learn what User2 teaches, and vice versa)
  },
  
  // Status of the swap request
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed', 'cancelled'],
    default: 'pending'
  },
  
  // Time Allocation
  proposedDuration: {
    type: Number, // in weeks
    default: 4
  },
  proposedSchedule: {
    daysPerWeek: Number,
    hoursPerSession: Number,
    preferredTime: String // e.g., "Evenings", "Weekends"
  },
  
  // Progress Tracking (once accepted)
  startDate: Date,
  endDate: Date,
  
  sessionsCompleted: {
    type: Number,
    default: 0
  },
  totalSessions: {
    type: Number,
    default: 0
  },
  
  // Meeting Links for live sessions
  meetingLinks: [{
    sessionNumber: Number,
    scheduledDate: Date,
    link: String,
    completed: {
      type: Boolean,
      default: false
    }
  }],
  
  // Chat/Messages between users
  messages: [{
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    senderName: String,
    message: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Ratings after completion (both users rate each other)
  user1RatingForUser2: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    review: String,
    ratedDate: Date
  },
  
  user2RatingForUser1: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    review: String,
    ratedDate: Date
  },
  
  // Completion Status
  isCompleted: {
    type: Boolean,
    default: false
  },
  completedDate: Date,
  
  // Notes
  notes: String
  
}, {
  timestamps: true
});

// Method to check if swap is a perfect match
swapRequestSchema.methods.isPerfectMatch = function() {
  const user1WantsToLearn = this.user1SkillToLearn.skillName.toLowerCase();
  const user2Teaches = this.user2SkillToTeach.skillName.toLowerCase();
  
  const user2WantsToLearn = this.user2SkillToLearn.skillName.toLowerCase();
  const user1Teaches = this.user1SkillToTeach.skillName.toLowerCase();
  
  return (user1WantsToLearn === user2Teaches && user2WantsToLearn === user1Teaches);
};

// Calculate progress percentage
swapRequestSchema.methods.calculateProgress = function() {
  if (this.totalSessions === 0) return 0;
  return Math.round((this.sessionsCompleted / this.totalSessions) * 100);
};

const SwapRequest = mongoose.model('SwapRequest', swapRequestSchema);

module.exports = SwapRequest;