// ============================================
// FILE: frontend/src/pages/TeachersPage.js
// Browse all teachers
// ============================================

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Star, BookOpen, Award, Users, MapPin, Filter } from 'lucide-react';
import './TeachersPage.css';

const TeachersPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  // Sample teachers data (later we'll fetch from backend)
  const allTeachers = [
    {
      id: 1,
      name: 'Arun joshi',
      username: 'Arun_guitar',
      avatar: 'https://i.pravatar.cc/150?img=12',
      bio: 'Professional guitarist with 15 years of experience. Love teaching beginners!',
      skills: ['Guitar', 'Music Theory', 'Songwriting'],
      category: 'Music',
      rating: 4.8,
      totalStudents: 234,
      coursesCount: 5,
      location: 'Udupi, India',
      badges: 3,
      verified: true
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      username: 'sarah_codes',
      avatar: 'https://i.pravatar.cc/150?img=45',
      bio: 'Full-stack developer and coding instructor. Making programming fun and accessible.',
      skills: ['Python', 'JavaScript', 'Web Development'],
      category: 'Coding',
      rating: 4.9,
      totalStudents: 567,
      coursesCount: 8,
      location: 'San Francisco, USA',
      badges: 5,
      verified: true
    },
    {
      id: 3,
      name: 'Mike Chen',
      username: 'mike_art',
      avatar: 'https://i.pravatar.cc/150?img=33',
      bio: 'Digital artist specializing in illustration and character design.',
      skills: ['Digital Art', 'Illustration', 'Photoshop'],
      category: 'Art',
      rating: 4.7,
      totalStudents: 189,
      coursesCount: 4,
      location: 'Los Angeles, USA',
      badges: 2,
      verified: false
    },
    {
      id: 4,
      name: 'Maria Garcia',
      username: 'maria_spanish',
      avatar: 'https://i.pravatar.cc/150?img=47',
      bio: 'Native Spanish speaker passionate about language education.',
      skills: ['Spanish', 'Language Teaching', 'Grammar'],
      category: 'Language',
      rating: 4.9,
      totalStudents: 423,
      coursesCount: 6,
      location: 'Madrid, Spain',
      badges: 4,
      verified: true
    },
    {
      id: 5,
      name: 'David Lee',
      username: 'david_photo',
      avatar: 'https://i.pravatar.cc/150?img=51',
      bio: 'Professional photographer teaching the art of capturing moments.',
      skills: ['Photography', 'Photo Editing', 'Lightroom'],
      category: 'Photography',
      rating: 4.6,
      totalStudents: 312,
      coursesCount: 7,
      location: 'London, UK',
      badges: 3,
      verified: true
    },
    {
      id: 6,
      name: 'Emma Wilson',
      username: 'emma_yoga',
      avatar: 'https://i.pravatar.cc/150?img=44',
      bio: 'Certified yoga instructor helping people find balance and peace.',
      skills: ['Yoga', 'Meditation', 'Wellness'],
      category: 'Sports',
      rating: 4.8,
      totalStudents: 445,
      coursesCount: 3,
      location: 'Sydney, Australia',
      badges: 2,
      verified: true
    },
    {
      id: 7,
      name: 'Alex Turner',
      username: 'alex_webdev',
      avatar: 'https://i.pravatar.cc/150?img=68',
      bio: 'Web developer teaching modern frameworks and best practices.',
      skills: ['React', 'Node.js', 'Web Development'],
      category: 'Coding',
      rating: 4.9,
      totalStudents: 892,
      coursesCount: 10,
      location: 'Toronto, Canada',
      badges: 6,
      verified: true
    },
    {
      id: 8,
      name: 'Chef Giovanni',
      username: 'chef_gio',
      avatar: 'https://i.pravatar.cc/150?img=59',
      bio: 'Italian chef sharing authentic recipes and cooking techniques.',
      skills: ['Cooking', 'Italian Cuisine', 'Baking'],
      category: 'Cooking',
      rating: 4.7,
      totalStudents: 267,
      coursesCount: 5,
      location: 'Rome, Italy',
      badges: 3,
      verified: false
    },
    {
      id: 9,
      name: 'Lisa Martinez',
      username: 'lisa_dance',
      avatar: 'https://i.pravatar.cc/150?img=43',
      bio: 'Professional dancer and choreographer specializing in hip hop.',
      skills: ['Hip Hop', 'Dance', 'Choreography'],
      category: 'Dance',
      rating: 4.8,
      totalStudents: 334,
      coursesCount: 4,
      location: 'Miami, USA',
      badges: 2,
      verified: true
    }
  ];

  const categories = ['All', 'Music', 'Coding', 'Art', 'Language', 'Photography', 'Sports', 'Cooking', 'Dance'];

  // Filter teachers
  const filteredTeachers = allTeachers.filter(teacher => {
    const matchesCategory = selectedCategory === 'All' || teacher.category === selectedCategory;
    const matchesSearch = 
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
      teacher.bio.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleViewProfile = (teacherId) => {
    // TODO: Navigate to teacher profile page
    alert(`Teacher profile page coming soon! Teacher ID: ${teacherId}`);
  };

  return (
    <div className="teachers-page">
      {/* Header */}
      <div className="teachers-header">
        <div className="container">
          <h1>Meet Our Teachers</h1>
          <p>Learn from passionate experts around the world</p>
          
          {/* Search Bar */}
          <div className="search-section">
            <div className="search-bar-large">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search teachers by name, skill, or expertise..."
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
        {/* Category Filters */}
        <div className={`category-filters ${showFilters ? 'show' : ''}`}>
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="results-header">
          <h2>
            {filteredTeachers.length} {filteredTeachers.length === 1 ? 'Teacher' : 'Teachers'} Found
          </h2>
        </div>

        {/* Teachers Grid */}
        {filteredTeachers.length > 0 ? (
          <div className="teachers-grid">
            {filteredTeachers.map(teacher => (
              <div key={teacher.id} className="teacher-card">
                {/* Avatar Section */}
                <div className="teacher-header">
                  <div className="teacher-avatar">
                    <img src={teacher.avatar} alt={teacher.name} />
                    {teacher.verified && (
                      <div className="verified-badge" title="Verified Teacher">
                        <Award size={16} fill="white" />
                      </div>
                    )}
                  </div>
                  <div className="teacher-info">
                    <h3>{teacher.name}</h3>
                    <p className="username">@{teacher.username}</p>
                    <div className="rating">
                      <Star size={16} fill="currentColor" />
                      <span>{teacher.rating}</span>
                      <span className="rating-count">({teacher.totalStudents} students)</span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="teacher-bio">{teacher.bio}</p>

                {/* Skills */}
                <div className="teacher-skills">
                  {teacher.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>

                {/* Stats */}
                <div className="teacher-stats">
                  <div className="stat-item">
                    <BookOpen size={18} />
                    <span>{teacher.coursesCount} Courses</span>
                  </div>
                  <div className="stat-item">
                    <Users size={18} />
                    <span>{teacher.totalStudents} Students</span>
                  </div>
                  <div className="stat-item">
                    <Award size={18} />
                    <span>{teacher.badges} Badges</span>
                  </div>
                </div>

                {/* Location */}
                <div className="teacher-location">
                  <MapPin size={16} />
                  <span>{teacher.location}</span>
                </div>

                {/* Action Button */}
                <button 
                  className="view-profile-btn"
                  onClick={() => handleViewProfile(teacher.id)}
                >
                  View Profile
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <Search size={64} />
            <h3>No teachers found</h3>
            <p>Try adjusting your search or filters</p>
            <button 
              className="btn btn-primary"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeachersPage;