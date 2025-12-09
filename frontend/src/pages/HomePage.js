// ============================================
// FILE: frontend/src/pages/HomePage.js
// Main homepage with hero and courses
// ============================================

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Star, Users, Clock, BookOpen } from 'lucide-react';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Sample course data (later we'll fetch from backend)
  const courses = [
    {
      id: 1,
      title: 'Guitar Basics for Beginners',
      teacher: 'John Smith',
      category: 'Music',
      rating: 4.8,
      students: 234,
      duration: '4 weeks',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400',
      level: 'Beginner'
    },
    {
      id: 2,
      title: 'Python Programming Masterclass',
      teacher: 'Sarah Johnson',
      category: 'Coding',
      rating: 4.9,
      students: 567,
      duration: '8 weeks',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400',
      level: 'Intermediate'
    },
    {
      id: 3,
      title: 'Digital Art & Illustration',
      teacher: 'Mike Chen',
      category: 'Art',
      rating: 4.7,
      students: 189,
      duration: '6 weeks',
      image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400',
      level: 'All Levels'
    },
    {
      id: 4,
      title: 'Spanish Language Basics',
      teacher: 'Maria Garcia',
      category: 'Language',
      rating: 4.9,
      students: 423,
      duration: '12 weeks',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400',
      level: 'Beginner'
    },
    {
      id: 5,
      title: 'Photography Essentials',
      teacher: 'David Lee',
      category: 'Photography',
      rating: 4.6,
      students: 312,
      duration: '5 weeks',
      image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400',
      level: 'Beginner'
    },
    {
      id: 6,
      title: 'Yoga & Meditation',
      teacher: 'Emma Wilson',
      category: 'Sports',
      rating: 4.8,
      students: 445,
      duration: '4 weeks',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
      level: 'All Levels'
    }
  ];

  const categories = ['All', 'Music', 'Coding', 'Art', 'Language', 'Photography', 'Sports', 'Cooking', 'Dance'];

  // Filter courses
  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.teacher.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Learn Any Skill, <br />
              <span className="gradient-text">Teach What You Know</span>
            </h1>
            <p className="hero-subtitle">
              Join thousands of learners and teachers exchanging skills. 
              From guitar to coding, find your perfect skill swap partner!
            </p>
            
            {/* Search Bar */}
            <div className="search-bar">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search for skills, courses, or teachers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button className="search-btn">Search</button>
            </div>

            {/* Stats */}
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">10K+</div>
                <div className="stat-label">Active Learners</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">5K+</div>
                <div className="stat-label">Teachers</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">Skills</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Explore by Category</h2>
          <div className="categories-grid">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="courses-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Popular Courses</h2>
            <p className="section-subtitle">
              {filteredCourses.length} courses available
            </p>
          </div>

          <div className="courses-grid">
            {filteredCourses.map((course) => (
              <div key={course.id} className="course-card">
                <div className="course-image">
                  <img src={course.image} alt={course.title} />
                  <div className="course-badge">{course.level}</div>
                </div>
                
                <div className="course-content">
                  <div className="course-category">{course.category}</div>
                  <h3 className="course-title">{course.title}</h3>
                  <p className="course-teacher">by {course.teacher}</p>
                  
                  <div className="course-meta">
                    <div className="meta-item">
                      <Star size={16} fill="currentColor" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="meta-item">
                      <Users size={16} />
                      <span>{course.students}</span>
                    </div>
                    <div className="meta-item">
                      <Clock size={16} />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  <button className="enroll-btn">
                    <BookOpen size={18} />
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="no-results">
              <p>No courses found. Try a different search or category!</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Start Your Learning Journey?</h2>
            <p className="cta-subtitle">
              Join our community of passionate learners and teachers today!
            </p>
            <div className="cta-buttons">
              <button className="btn btn-primary" onClick={() => navigate('/signup')}>
                Get Started Free
              </button>
              <button className="btn btn-outline" onClick={() => navigate('/signup')}>
                Become a Teacher
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;