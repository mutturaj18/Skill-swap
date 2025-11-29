// ============================================
// FILE: frontend/src/pages/ProfilePage.js
// User profile and settings
// ============================================

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, MapPin, Award, Gift, Edit2, Save, X, Plus, Trash2 } from 'lucide-react';
import axios from 'axios';
import './ProfilePage.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [formData, setFormData] = useState({
    username: '',
    bio: '',
    age: '',
    languages: [],
    profilePicture: '',
    skillsToTeach: [],
    skillsToLearn: []
  });

  const [newLanguage, setNewLanguage] = useState('');
  const [newSkillTeach, setNewSkillTeach] = useState({ skillName: '', category: '', experience: 'Beginner' });
  const [newSkillLearn, setNewSkillLearn] = useState({ skillName: '', category: '' });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    const userData = JSON.parse(storedUser);
    setUser(userData);
    
    // Initialize form with user data
    setFormData({
      username: userData.username || '',
      bio: userData.bio || '',
      age: userData.age || '',
      languages: userData.languages || [],
      profilePicture: userData.profilePicture || '',
      skillsToTeach: userData.skillsToTeach || [],
      skillsToLearn: userData.skillsToLearn || []
    });
  }, [navigate]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const addLanguage = () => {
    if (newLanguage.trim() && !formData.languages.includes(newLanguage.trim())) {
      setFormData({
        ...formData,
        languages: [...formData.languages, newLanguage.trim()]
      });
      setNewLanguage('');
    }
  };

  const removeLanguage = (index) => {
    setFormData({
      ...formData,
      languages: formData.languages.filter((_, i) => i !== index)
    });
  };

  const addSkillToTeach = () => {
    if (newSkillTeach.skillName.trim() && newSkillTeach.category.trim()) {
      setFormData({
        ...formData,
        skillsToTeach: [...formData.skillsToTeach, { ...newSkillTeach }]
      });
      setNewSkillTeach({ skillName: '', category: '', experience: 'Beginner' });
    }
  };

  const removeSkillToTeach = (index) => {
    setFormData({
      ...formData,
      skillsToTeach: formData.skillsToTeach.filter((_, i) => i !== index)
    });
  };

  const addSkillToLearn = () => {
    if (newSkillLearn.skillName.trim() && newSkillLearn.category.trim()) {
      setFormData({
        ...formData,
        skillsToLearn: [...formData.skillsToLearn, { ...newSkillLearn }]
      });
      setNewSkillLearn({ skillName: '', category: '' });
    }
  };

  const removeSkillToLearn = (index) => {
    setFormData({
      ...formData,
      skillsToLearn: formData.skillsToLearn.filter((_, i) => i !== index)
    });
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:5000/api/auth/profile',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Update localStorage
      const updatedUser = { ...user, ...response.data };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);

      setMessage({ type: 'success', text: 'Profile updated successfully! 🎉' });
      setIsEditing(false);

    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to update profile' });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="profile-page">
      <div className="container">
        {/* Header */}
        <div className="profile-header">
          <div className="profile-avatar-section">
            <div className="profile-avatar-large">
              <img src={formData.profilePicture || 'https://via.placeholder.com/150'} alt={user.username} />
            </div>
            {isEditing && (
              <div className="form-group">
                <label>Profile Picture URL</label>
                <input
                  type="url"
                  name="profilePicture"
                  value={formData.profilePicture}
                  onChange={handleInputChange}
                  placeholder="https://example.com/photo.jpg"
                />
              </div>
            )}
          </div>

          <div className="profile-info">
            {!isEditing ? (
              <>
                <h1>{user.username}</h1>
                <div className="profile-meta">
                  <span className="role-badge">{user.role.toUpperCase()}</span>
                  <div className="meta-item">
                    <Mail size={16} />
                    <span>{user.email}</span>
                  </div>
                </div>
                <p className="profile-bio">{formData.bio || 'No bio yet. Add one to tell others about yourself!'}</p>
              </>
            ) : (
              <>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Bio</label>
                  <textarea
                    name="bio"
                    rows="4"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Tell others about yourself..."
                  />
                </div>
                <div className="form-group">
                  <label>Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    min="5"
                    max="120"
                  />
                </div>
              </>
            )}
          </div>

          <div className="profile-actions">
            {!isEditing ? (
              <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                <Edit2 size={18} />
                Edit Profile
              </button>
            ) : (
              <div className="edit-actions">
                <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                  <X size={18} />
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSave} disabled={loading}>
                  <Save size={18} />
                  {loading ? 'Saving...' : 'Save'}
                </button>
              </div>
            )}
          </div>
        </div>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        {/* Stats */}
        <div className="profile-stats">
          <div className="stat-box">
            <div className="stat-value">{user.points || 0}</div>
            <div className="stat-label">Points</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{user.badges?.length || 0}</div>
            <div className="stat-label">Badges</div>
          </div>
          {(user.role === 'teacher' || user.role === 'both') && (
            <div className="stat-box">
              <div className="stat-value">{user.coupons?.length || 0}</div>
              <div className="stat-label">Coupons</div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="profile-content">
          {/* Languages */}
          <div className="profile-section">
            <h2>Languages</h2>
            {!isEditing ? (
              <div className="tags-list">
                {formData.languages.length > 0 ? (
                  formData.languages.map((lang, index) => (
                    <span key={index} className="tag">{lang}</span>
                  ))
                ) : (
                  <p className="empty-state">No languages added yet</p>
                )}
              </div>
            ) : (
              <>
                <div className="add-item-form">
                  <input
                    type="text"
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                    placeholder="e.g., English"
                    onKeyPress={(e) => e.key === 'Enter' && addLanguage()}
                  />
                  <button type="button" onClick={addLanguage}>
                    <Plus size={18} />
                    Add
                  </button>
                </div>
                <div className="tags-list editable">
                  {formData.languages.map((lang, index) => (
                    <span key={index} className="tag editable">
                      {lang}
                      <button onClick={() => removeLanguage(index)}>
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Skills to Teach (for teachers and both) */}
          {(user.role === 'teacher' || user.role === 'both') && (
            <div className="profile-section">
              <h2>Skills I Teach</h2>
              {!isEditing ? (
                <div className="skills-list">
                  {formData.skillsToTeach.length > 0 ? (
                    formData.skillsToTeach.map((skill, index) => (
                      <div key={index} className="skill-card">
                        <h4>{skill.skillName}</h4>
                        <p>Category: {skill.category}</p>
                        <p>Experience: {skill.experience}</p>
                      </div>
                    ))
                  ) : (
                    <p className="empty-state">No teaching skills added yet</p>
                  )}
                </div>
              ) : (
                <>
                  <div className="add-skill-form">
                    <input
                      type="text"
                      value={newSkillTeach.skillName}
                      onChange={(e) => setNewSkillTeach({ ...newSkillTeach, skillName: e.target.value })}
                      placeholder="Skill name (e.g., Guitar)"
                    />
                    <input
                      type="text"
                      value={newSkillTeach.category}
                      onChange={(e) => setNewSkillTeach({ ...newSkillTeach, category: e.target.value })}
                      placeholder="Category (e.g., Music)"
                    />
                    <select
                      value={newSkillTeach.experience}
                      onChange={(e) => setNewSkillTeach({ ...newSkillTeach, experience: e.target.value })}
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Expert">Expert</option>
                    </select>
                    <button type="button" onClick={addSkillToTeach}>
                      <Plus size={18} />
                      Add
                    </button>
                  </div>
                  <div className="skills-list editable">
                    {formData.skillsToTeach.map((skill, index) => (
                      <div key={index} className="skill-card editable">
                        <h4>{skill.skillName}</h4>
                        <p>Category: {skill.category}</p>
                        <p>Experience: {skill.experience}</p>
                        <button className="remove-btn" onClick={() => removeSkillToTeach(index)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Skills to Learn (for learners and both) */}
          {(user.role === 'learner' || user.role === 'both') && (
            <div className="profile-section">
              <h2>Skills I Want to Learn</h2>
              {!isEditing ? (
                <div className="skills-list">
                  {formData.skillsToLearn.length > 0 ? (
                    formData.skillsToLearn.map((skill, index) => (
                      <div key={index} className="skill-card">
                        <h4>{skill.skillName}</h4>
                        <p>Category: {skill.category}</p>
                      </div>
                    ))
                  ) : (
                    <p className="empty-state">No learning goals added yet</p>
                  )}
                </div>
              ) : (
                <>
                  <div className="add-skill-form">
                    <input
                      type="text"
                      value={newSkillLearn.skillName}
                      onChange={(e) => setNewSkillLearn({ ...newSkillLearn, skillName: e.target.value })}
                      placeholder="Skill name (e.g., Python)"
                    />
                    <input
                      type="text"
                      value={newSkillLearn.category}
                      onChange={(e) => setNewSkillLearn({ ...newSkillLearn, category: e.target.value })}
                      placeholder="Category (e.g., Coding)"
                    />
                    <button type="button" onClick={addSkillToLearn}>
                      <Plus size={18} />
                      Add
                    </button>
                  </div>
                  <div className="skills-list editable">
                    {formData.skillsToLearn.map((skill, index) => (
                      <div key={index} className="skill-card editable">
                        <h4>{skill.skillName}</h4>
                        <p>Category: {skill.category}</p>
                        <button className="remove-btn" onClick={() => removeSkillToLearn(index)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Badges */}
          <div className="profile-section">
            <h2>
              <Award size={24} />
              My Badges
            </h2>
            <div className="badges-grid">
              {user.badges && user.badges.length > 0 ? (
                user.badges.map((badge, index) => (
                  <div key={index} className="badge-item">
                    <img src={badge.badgeImage || 'https://via.placeholder.com/80'} alt={badge.badgeName} />
                    <p>{badge.badgeName}</p>
                  </div>
                ))
              ) : (
                <p className="empty-state">No badges earned yet. Complete courses to earn badges!</p>
              )}
            </div>
          </div>

          {/* Coupons (for teachers) */}
          {(user.role === 'teacher' || user.role === 'both') && (
            <div className="profile-section">
              <h2>
                <Gift size={24} />
                My Coupons
              </h2>
              <div className="coupons-grid">
                {user.coupons && user.coupons.length > 0 ? (
                  user.coupons.map((coupon, index) => (
                    <div key={index} className={`coupon-card ${coupon.used ? 'used' : ''}`}>
                      <h4>{coupon.provider}</h4>
                      <p className="coupon-code">{coupon.couponCode}</p>
                      <p>{coupon.discount}</p>
                      <p className="expiry">Expires: {new Date(coupon.expiryDate).toLocaleDateString()}</p>
                      {coupon.used && <span className="used-badge">Used</span>}
                    </div>
                  ))
                ) : (
                  <p className="empty-state">No coupons yet. Keep teaching to earn rewards!</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;