// ============================================
// FILE: frontend/src/pages/CoursesPage.js
// Full courses browsing page
// ============================================

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Star, Users, Clock, Filter, BookOpen, TrendingUp } from 'lucide-react';
import './CoursesPage.css';

const CoursesPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [sortBy, setSortBy] = useState('popular'); // popular, rating, newest
  const [showFilters, setShowFilters] = useState(false);

  // Sample course data (later we'll fetch from backend)
  const allCourses = [
    {
      id: 1,
      title: 'Guitar Basics for Beginners',
      teacher: 'John Smith',
      category: 'Music',
      rating: 4.8,
      students: 234,
      duration: '4 weeks',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400',
      level: 'Beginner',
      price: 'Free',
      description: 'Learn guitar from scratch with easy-to-follow lessons'
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
      level: 'Intermediate',
      price: 'Free',
      description: 'Master Python programming with real-world projects'
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
      level: 'All Levels',
      price: 'Free',
      description: 'Create stunning digital artwork with professional techniques'
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
      level: 'Beginner',
      price: 'Free',
      description: 'Learn Spanish from native speaker with interactive lessons'
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
      level: 'Beginner',
      price: 'Free',
      description: 'Master the art of photography with hands-on practice'
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
      level: 'All Levels',
      price: 'Free',
      description: 'Find inner peace and physical wellness through yoga'
    },
    {
      id: 7,
      title: 'Web Development Bootcamp',
      teacher: 'Alex Turner',
      category: 'Coding',
      rating: 4.9,
      students: 892,
      duration: '10 weeks',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400',
      level: 'Beginner',
      price: 'Free',
      description: 'Build modern websites from scratch with HTML, CSS, JS'
    },
    {
      id: 8,
      title: 'Cooking Italian Cuisine',
      teacher: 'Chef Giovanni',
      category: 'Cooking',
      rating: 4.7,
      students: 267,
      duration: '6 weeks',
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400',
      level: 'Beginner',
      price: 'Free',
      description: 'Master authentic Italian recipes and cooking techniques'
    },
    {
      id: 9,
      title: 'Dance Hip Hop Fundamentals',
      teacher: 'Lisa Martinez',
      category: 'Dance',
      rating: 4.8,
      students: 334,
      duration: '5 weeks',
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400',
      level: 'Beginner',
      price: 'Free',
      description: 'Learn hip hop dance moves and choreography'
    }
  ];

  const categories = ['All', 'Music', 'Coding', 'Art', 'Language', 'Photography', 'Sports', 'Cooking', 'Dance'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced', 'All Levels'];

  // Filter courses
  const filteredCourses = allCourses
    .filter(course => {
      const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
      const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
      const matchesSearch = 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.teacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesLevel && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'popular') return b.students - a.students;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return b.id - a.id;
      return 0;
    });

  const handleEnroll = (courseId) => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
      return;
    }
    // TODO: Add enrollment logic with backend
    alert('Enrollment feature coming soon! This will connect to backend.');
  };

  return (
    <div className="courses-page">
      {/* Header */}
      <div className="courses-header">
        <div className="container">
          <h1>Explore Courses</h1>
          <p>Discover thousands of courses taught by passionate teachers</p>
          
          {/* Search Bar */}
          <div className="search-section">
            <div className="search-bar-large">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search for courses, skills, or teachers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              className="filter-toggle-btn"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={20} />
              Filters
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="courses-content">
          {/* Sidebar Filters */}
          <aside className={`filters-sidebar ${showFilters ? 'show' : ''}`}>
            <div className="filter-section">
              <h3>Category</h3>
              <div className="filter-options">
                {categories.map(category => (
                  <button
                    key={category}
                    className={`filter-option ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h3>Level</h3>
              <div className="filter-options">
                {levels.map(level => (
                  <button
                    key={level}
                    className={`filter-option ${selectedLevel === level ? 'active' : ''}`}
                    onClick={() => setSelectedLevel(level)}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Courses Grid */}
          <main className="courses-main">
            {/* Sort and Count */}
            <div className="courses-toolbar">
              <div className="courses-count">
                <strong>{filteredCourses.length}</strong> courses found
              </div>
              <div className="sort-options">
                <label>Sort by:</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>

            {/* Courses Grid */}
            {filteredCourses.length > 0 ? (
              <div className="courses-grid">
                {filteredCourses.map(course => (
                  <div key={course.id} className="course-card">
                    <div className="course-image">
                      <img src={course.image} alt={course.title} />
                      <div className="course-badge">{course.level}</div>
                      <div className="course-price">{course.price}</div>
                    </div>
                    
                    <div className="course-content">
                      <div className="course-category">{course.category}</div>
                      <h3 className="course-title">{course.title}</h3>
                      <p className="course-description">{course.description}</p>
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

                      <button 
                        className="enroll-btn"
                        onClick={() => handleEnroll(course.id)}
                      >
                        <BookOpen size={18} />
                        Enroll Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <Search size={64} />
                <h3>No courses found</h3>
                <p>Try adjusting your filters or search query</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setSelectedLevel('All');
                  }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;