// ============================================
// FILE: frontend/src/pages/CourseUploadPage.js
// Create and upload courses (for teachers)
// ============================================

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Plus, Trash2, Image, Video, Save, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { API_URL } from '../config';
import './CourseUploadPage.css';

const CourseUploadPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category: 'Music',
    skillName: '',
    thumbnail: '',
    language: 'English',
    level: 'Beginner',
    estimatedCompletionTime: 30,
    videos: [
      { title: '', description: '', videoUrl: '', duration: 0, order: 1 }
    ]
  });

  const categories = ['Music', 'Coding', 'Art', 'Sports', 'Language', 'Cooking', 'Photography', 'Dance', 'Other'];
  const levels = ['Beginner', 'Intermediate', 'Advanced', 'All Levels'];
  const languages = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Hindi', 'Other'];

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    const userData = JSON.parse(storedUser);
    
    // Check if user is teacher or both
    if (userData.role !== 'teacher' && userData.role !== 'both') {
      alert('Only teachers can create courses!');
      navigate('/dashboard');
      return;
    }
    
    setUser(userData);
  }, [navigate]);

  const handleInputChange = (e) => {
    setCourseData({
      ...courseData,
      [e.target.name]: e.target.value
    });
  };

  const handleVideoChange = (index, field, value) => {
    const updatedVideos = [...courseData.videos];
    updatedVideos[index][field] = value;
    setCourseData({
      ...courseData,
      videos: updatedVideos
    });
  };

  const addVideo = () => {
    setCourseData({
      ...courseData,
      videos: [
        ...courseData.videos,
        { 
          title: '', 
          description: '', 
          videoUrl: '', 
          duration: 0, 
          order: courseData.videos.length + 1 
        }
      ]
    });
  };

  const removeVideo = (index) => {
    if (courseData.videos.length === 1) {
      alert('Course must have at least one video!');
      return;
    }
    const updatedVideos = courseData.videos.filter((_, i) => i !== index);
    // Update order numbers
    updatedVideos.forEach((video, i) => {
      video.order = i + 1;
    });
    setCourseData({
      ...courseData,
      videos: updatedVideos
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validation
    if (!courseData.title || !courseData.description || !courseData.skillName) {
      setError('Please fill in all required fields!');
      setLoading(false);
      return;
    }

    // Check if at least one video has a URL
    const hasValidVideo = courseData.videos.some(video => video.videoUrl.trim() !== '');
    if (!hasValidVideo) {
      setError('Please add at least one video URL!');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      
      const response = await axios.post(
        `${API_URL}/courses/create`,
        {
          ...courseData,
          teacherName: user.username
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setSuccess('Course created successfully! 🎉');
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create course. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="course-upload-page">
      <div className="container">
        <div className="upload-header">
          <h1>Create New Course</h1>
          <p>Share your knowledge with thousands of learners</p>
        </div>

        {error && (
          <div className="error-message">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="success-message">
            <AlertCircle size={20} />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="upload-form">
          {/* Basic Information */}
          <div className="form-section">
            <h2>📝 Basic Information</h2>
            
            <div className="form-group">
              <label>Course Title *</label>
              <input
                type="text"
                name="title"
                placeholder="e.g., Guitar Basics for Beginners"
                value={courseData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                name="description"
                rows="5"
                placeholder="Describe what students will learn in this course..."
                value={courseData.description}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Category *</label>
                <select
                  name="category"
                  value={courseData.category}
                  onChange={handleInputChange}
                  required
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Skill Name *</label>
                <input
                  type="text"
                  name="skillName"
                  placeholder="e.g., Guitar"
                  value={courseData.skillName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Level *</label>
                <select
                  name="level"
                  value={courseData.level}
                  onChange={handleInputChange}
                  required
                >
                  {levels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Language *</label>
                <select
                  name="language"
                  value={courseData.language}
                  onChange={handleInputChange}
                  required
                >
                  {languages.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Estimated Completion Time (days)</label>
              <input
                type="number"
                name="estimatedCompletionTime"
                value={courseData.estimatedCompletionTime}
                onChange={handleInputChange}
                min="1"
                max="365"
              />
            </div>

            <div className="form-group">
              <label>
                <Image size={18} />
                Thumbnail Image URL
              </label>
              <input
                type="url"
                name="thumbnail"
                placeholder="https://example.com/image.jpg"
                value={courseData.thumbnail}
                onChange={handleInputChange}
              />
              {courseData.thumbnail && (
                <div className="thumbnail-preview">
                  <img src={courseData.thumbnail} alt="Preview" />
                </div>
              )}
            </div>
          </div>

          {/* Videos Section */}
          <div className="form-section">
            <div className="section-header">
              <h2>
                <Video size={24} />
                Course Videos
              </h2>
              <button type="button" className="add-video-btn" onClick={addVideo}>
                <Plus size={18} />
                Add Video
              </button>
            </div>

            {courseData.videos.map((video, index) => (
              <div key={index} className="video-item">
                <div className="video-header">
                  <h3>Video {index + 1}</h3>
                  {courseData.videos.length > 1 && (
                    <button
                      type="button"
                      className="remove-video-btn"
                      onClick={() => removeVideo(index)}
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>

                <div className="form-group">
                  <label>Video Title *</label>
                  <input
                    type="text"
                    placeholder="e.g., Introduction to Guitar Basics"
                    value={video.title}
                    onChange={(e) => handleVideoChange(index, 'title', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Video URL * (YouTube, Vimeo, or direct link)</label>
                  <input
                    type="url"
                    placeholder="https://youtube.com/watch?v=..."
                    value={video.videoUrl}
                    onChange={(e) => handleVideoChange(index, 'videoUrl', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    rows="3"
                    placeholder="What will students learn in this video?"
                    value={video.description}
                    onChange={(e) => handleVideoChange(index, 'description', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Duration (minutes)</label>
                  <input
                    type="number"
                    placeholder="15"
                    value={video.duration}
                    onChange={(e) => handleVideoChange(index, 'duration', parseInt(e.target.value) || 0)}
                    min="0"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? (
                <>Creating...</>
              ) : (
                <>
                  <Save size={18} />
                  Create Course
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseUploadPage;