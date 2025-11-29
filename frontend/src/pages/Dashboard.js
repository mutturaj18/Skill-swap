// ============================================
// FILE: frontend/src/pages/Dashboard.js
// Universal dashboard that shows different content based on role
// ============================================

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Upload, Users, Award, Gift, TrendingUp } from 'lucide-react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [myCourses, setMyCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  useEffect(() => {
    const fetchMyCourses = async () => {
      if (!user) return;
      if (user.role !== 'teacher' && user.role !== 'both') return;

      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/courses/my-courses', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setMyCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchMyCourses();
  }, [user]);

  if (!user) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="dashboard">
      <div className="container">
        {/* Welcome Section */}
        <div className="dashboard-header">
          <div>
            <h1>Welcome back, <span className="gradient-text">{user.username}</span>! 🎉</h1>
            <p className="dashboard-subtitle">
              {user.role === 'learner' && 'Ready to learn something new today?'}
              {user.role === 'teacher' && 'Ready to inspire learners today?'}
              {user.role === 'both' && 'Ready to learn and teach today?'}
            </p>
          </div>
          <div className="user-role-badge">
            <span className="badge">{user.role.toUpperCase()}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <BookOpen size={24} color="white" />
            </div>
            <div className="stat-content">
              <div className="stat-value">
                {user.role === 'learner' || user.role === 'both' ? '0' : 'N/A'}
              </div>
              <div className="stat-label">Courses Enrolled</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
              <Upload size={24} color="white" />
            </div>
            <div className="stat-content">
              <div className="stat-value">
                {user.role === 'teacher' || user.role === 'both' ? myCourses.length : 'N/A'}
              </div>
              <div className="stat-label">Courses Created</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
              <Award size={24} color="white" />
            </div>
            <div className="stat-content">
              <div className="stat-value">{user.badges?.length || 0}</div>
              <div className="stat-label">Badges Earned</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
              <TrendingUp size={24} color="white" />
            </div>
            <div className="stat-content">
              <div className="stat-value">{user.points || 0}</div>
              <div className="stat-label">Total Points</div>
            </div>
          </div>
        </div>

        {/* Role-Specific Content */}
        {user.role === 'learner' && (
          <div className="dashboard-section">
            <h2>Continue Learning</h2>
            <div className="empty-state">
              <BookOpen size={48} />
              <p>You haven't enrolled in any courses yet.</p>
              <button className="btn btn-primary" onClick={() => navigate('/')}>
                Browse Courses
              </button>
            </div>
          </div>
        )}

        {user.role === 'teacher' && (
          <div className="dashboard-section">
            <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0 }}>Your Courses</h2>
              <button className="btn btn-primary" onClick={() => navigate('/create-course')}>
                <Upload size={18} />
                Create New Course
              </button>
            </div>
            
            {loadingCourses ? (
              <div className="loading"><div className="spinner"></div></div>
            ) : myCourses.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {myCourses.map(course => (
                  <div key={course._id} style={{
                    background: 'white',
                    border: '2px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    transition: 'transform 0.3s ease',
                    cursor: 'pointer'
                  }}>
                    {course.thumbnail && (
                      <img 
                        src={course.thumbnail} 
                        alt={course.title}
                        style={{
                          width: '100%',
                          height: '150px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                          marginBottom: '1rem'
                        }}
                      />
                    )}
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>{course.title}</h3>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1rem', lineHeight: '1.5' }}>
                      {course.description.substring(0, 100)}...
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
                      <span style={{ fontSize: '0.85rem', color: '#667eea', fontWeight: '600' }}>
                        {course.videos?.length || 0} Videos
                      </span>
                      <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                        {course.enrolledStudents?.length || 0} Students
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <Upload size={48} />
                <p>You haven't created any courses yet.</p>
                <button className="btn btn-primary" onClick={() => navigate('/create-course')}>
                  Create Your First Course
                </button>
              </div>
            )}
          </div>
        )}

        {user.role === 'both' && (
          <>
            <div className="dashboard-section">
              <h2>Skill Swap Matches</h2>
              <div className="empty-state">
                <Users size={48} />
                <p>No active skill swaps yet.</p>
                <button className="btn btn-primary">
                  Find Swap Partners
                </button>
              </div>
            </div>

            <div className="dashboard-section">
              <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ margin: 0 }}>Your Courses</h2>
                <button className="btn btn-primary" onClick={() => navigate('/create-course')}>
                  <Upload size={18} />
                  Create New Course
                </button>
              </div>
              
              {loadingCourses ? (
                <div className="loading"><div className="spinner"></div></div>
              ) : myCourses.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                  {myCourses.map(course => (
                    <div key={course._id} style={{
                      background: 'white',
                      border: '2px solid #e2e8f0',
                      borderRadius: '12px',
                      padding: '1.5rem'
                    }}>
                      {course.thumbnail && (
                        <img 
                          src={course.thumbnail} 
                          alt={course.title}
                          style={{
                            width: '100%',
                            height: '150px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            marginBottom: '1rem'
                          }}
                        />
                      )}
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>{course.title}</h3>
                      <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1rem' }}>
                        {course.description.substring(0, 100)}...
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
                        <span style={{ fontSize: '0.85rem', color: '#667eea', fontWeight: '600' }}>
                          {course.videos?.length || 0} Videos
                        </span>
                        <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                          {course.enrolledStudents?.length || 0} Students
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <Upload size={48} />
                  <p>You haven't created any courses yet.</p>
                  <button className="btn btn-primary" onClick={() => navigate('/create-course')}>
                    Create Your First Course
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* Rewards Section */}
        {(user.role === 'teacher' || user.role === 'both') && (
          <div className="dashboard-section">
            <h2>Your Rewards</h2>
            <div className="rewards-grid">
              <div className="reward-card">
                <Gift size={32} color="#667eea" />
                <h3>{user.coupons?.length || 0} Coupons</h3>
                <p>Amazon, Flipkart, and more</p>
              </div>
              <div className="reward-card">
                <Award size={32} color="#f59e0b" />
                <h3>{user.badges?.length || 0} Badges</h3>
                <p>Achievement unlocked</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;