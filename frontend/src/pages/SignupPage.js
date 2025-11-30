// ============================================
// FILE: frontend/src/pages/SignupPage.js
// Signup/Registration page
// ============================================

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { API_URL } from '../config';
import './AuthPages.css';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'learner',
    age: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long!');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        age: formData.age ? parseInt(formData.age) : undefined,
        languages: ['English']
      });
      
      // Save token
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
      
      // Redirect to dashboard and force refresh
window.location.href = '/dashboard';
      
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Left Side - Image/Illustration */}
        <div className="auth-image signup-image">
          <div className="auth-image-content">
            <h2>Join SkillSwap!</h2>
            <p>Start learning and teaching skills today</p>
            <div className="features-list">
              <div className="feature-item">
                <CheckCircle size={20} />
                <span>Learn from experts</span>
              </div>
              <div className="feature-item">
                <CheckCircle size={20} />
                <span>Teach what you know</span>
              </div>
              <div className="feature-item">
                <CheckCircle size={20} />
                <span>Earn badges & coupons</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="auth-form-container">
          <div className="auth-form">
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">Join thousands of learners and teachers</p>

            {error && (
              <div className="error-message">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Username Input */}
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <div className="input-with-icon">
                  <User className="input-icon" size={20} />
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="johndoe"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    minLength={3}
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-with-icon">
                  <Mail className="input-icon" size={20} />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-with-icon">
                  <Lock className="input-icon" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder="At least 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Input */}
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="input-with-icon">
                  <Lock className="input-icon" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Re-enter password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Role Selection */}
              <div className="form-group">
                <label>I want to:</label>
                <div className="role-selector">
                  <label className="role-option">
                    <input
                      type="radio"
                      name="role"
                      value="learner"
                      checked={formData.role === 'learner'}
                      onChange={handleChange}
                    />
                    <span className="role-card">
                      <strong>Learn</strong>
                      <small>Watch courses & earn badges</small>
                    </span>
                  </label>

                  <label className="role-option">
                    <input
                      type="radio"
                      name="role"
                      value="teacher"
                      checked={formData.role === 'teacher'}
                      onChange={handleChange}
                    />
                    <span className="role-card">
                      <strong>Teach</strong>
                      <small>Create courses & earn coupons</small>
                    </span>
                  </label>

                  <label className="role-option">
                    <input
                      type="radio"
                      name="role"
                      value="both"
                      checked={formData.role === 'both'}
                      onChange={handleChange}
                    />
                    <span className="role-card">
                      <strong>Both</strong>
                      <small>Learn & teach skills</small>
                    </span>
                  </label>
                </div>
              </div>

              {/* Age Input (Optional) */}
              <div className="form-group">
                <label htmlFor="age">Age (Optional)</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  placeholder="Your age"
                  value={formData.age}
                  onChange={handleChange}
                  min="5"
                  max="120"
                />
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary-full" disabled={loading}>
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>

            {/* Login Link */}
            <p className="auth-switch">
              Already have an account?{' '}
              <Link to="/login" className="auth-link">Login here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;