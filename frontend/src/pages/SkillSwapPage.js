// ============================================
// FILE: frontend/src/pages/SkillSwapPage.js
// Find and match with skill swap partners
// ============================================

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, RefreshCw, Users, ArrowRightLeft, Send, CheckCircle, XCircle } from 'lucide-react';
import axios from 'axios';
import './SkillSwapPage.css';

const SkillSwapPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [mySkillToTeach, setMySkillToTeach] = useState('');
  const [mySkillToLearn, setMySkillToLearn] = useState('');
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Sample matches (later we'll fetch from backend)
  const sampleMatches = [
    {
      id: 1,
      name: 'Sarah Johnson',
      username: 'sarah_codes',
      avatar: 'https://i.pravatar.cc/150?img=45',
      skillToTeach: 'Python',
      skillToLearn: 'Guitar',
      matchPercentage: 100,
      experience: 'Expert',
      bio: 'Full-stack developer passionate about teaching Python',
      rating: 4.9,
      location: 'San Francisco, USA'
    },
    {
      id: 2,
      name: 'Mike Chen',
      username: 'mike_art',
      avatar: 'https://i.pravatar.cc/150?img=33',
      skillToTeach: 'Digital Art',
      skillToLearn: 'Guitar',
      matchPercentage: 95,
      experience: 'Intermediate',
      bio: 'Digital artist looking to learn music',
      rating: 4.7,
      location: 'Los Angeles, USA'
    },
    {
      id: 3,
      name: 'Alex Turner',
      username: 'alex_webdev',
      avatar: 'https://i.pravatar.cc/150?img=68',
      skillToTeach: 'Web Development',
      skillToLearn: 'Music Production',
      matchPercentage: 80,
      experience: 'Expert',
      bio: 'Web developer wanting to explore music',
      rating: 4.9,
      location: 'Toronto, Canada'
    }
  ];

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    const userData = JSON.parse(storedUser);
    
    if (userData.role !== 'both') {
      alert('Skill Swap is only available for users with role "Both"!');
      navigate('/dashboard');
      return;
    }
    
    setUser(userData);

    // Set default skills from user profile
    if (userData.skillsToTeach && userData.skillsToTeach.length > 0) {
      setMySkillToTeach(userData.skillsToTeach[0].skillName);
    }
    if (userData.skillsToLearn && userData.skillsToLearn.length > 0) {
      setMySkillToLearn(userData.skillsToLearn[0].skillName);
    }
  }, [navigate]);

  const findMatches = () => {
    if (!mySkillToTeach || !mySkillToLearn) {
      setMessage({ type: 'error', text: 'Please select both skills!' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    // Simulate API call
    setTimeout(() => {
      // Filter matches based on skills
      const filteredMatches = sampleMatches.filter(match => {
        return match.skillToTeach.toLowerCase().includes(mySkillToLearn.toLowerCase()) ||
               match.skillToLearn.toLowerCase().includes(mySkillToTeach.toLowerCase());
      });
      
      setMatches(filteredMatches);
      setLoading(false);

      if (filteredMatches.length === 0) {
        setMessage({ type: 'info', text: 'No matches found. Try different skills!' });
      } else {
        setMessage({ type: 'success', text: `Found ${filteredMatches.length} potential matches!` });
      }
    }, 1000);
  };

  const sendSwapRequest = (matchId) => {
    alert(`Swap request sent! (This will connect to backend soon)`);
  };

  if (!user) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="skillswap-page">
      <div className="container">
        {/* Header */}
        <div className="swap-header">
          <h1>Find Your Perfect Skill Swap Partner</h1>
          <p>Exchange skills with others - teach what you know, learn what you want!</p>
        </div>

        {/* Skill Selection */}
        <div className="skill-selector-card">
          <h2>
            <ArrowRightLeft size={24} />
            What do you want to swap?
          </h2>
          
          <div className="swap-inputs">
            <div className="swap-input-group">
              <label>I can teach:</label>
              <select
                value={mySkillToTeach}
                onChange={(e) => setMySkillToTeach(e.target.value)}
              >
                <option value="">Select a skill...</option>
                {user.skillsToTeach?.map((skill, index) => (
                  <option key={index} value={skill.skillName}>
                    {skill.skillName} ({skill.category})
                  </option>
                ))}
              </select>
            </div>

            <div className="swap-arrow">
              <ArrowRightLeft size={32} />
            </div>

            <div className="swap-input-group">
              <label>I want to learn:</label>
              <select
                value={mySkillToLearn}
                onChange={(e) => setMySkillToLearn(e.target.value)}
              >
                <option value="">Select a skill...</option>
                {user.skillsToLearn?.map((skill, index) => (
                  <option key={index} value={skill.skillName}>
                    {skill.skillName} ({skill.category})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button 
            className="find-matches-btn"
            onClick={findMatches}
            disabled={loading}
          >
            {loading ? (
              <>
                <RefreshCw size={20} className="spinning" />
                Finding Matches...
              </>
            ) : (
              <>
                <Search size={20} />
                Find Matches
              </>
            )}
          </button>

          {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}
        </div>

        {/* Matches */}
        {matches.length > 0 && (
          <div className="matches-section">
            <h2>
              <Users size={24} />
              {matches.length} Potential Matches Found
            </h2>

            <div className="matches-grid">
              {matches.map(match => (
                <div key={match.id} className="match-card">
                  <div className="match-header">
                    <img src={match.avatar} alt={match.name} className="match-avatar" />
                    <div className="match-info">
                      <h3>{match.name}</h3>
                      <p className="username">@{match.username}</p>
                      <div className="match-rating">
                        ⭐ {match.rating} • {match.location}
                      </div>
                    </div>
                    <div className="match-percentage">
                      <div className="percentage-circle">
                        {match.matchPercentage}%
                      </div>
                      <span>Match</span>
                    </div>
                  </div>

                  <p className="match-bio">{match.bio}</p>

                  <div className="swap-details">
                    <div className="swap-detail-item">
                      <CheckCircle size={18} color="#10b981" />
                      <div>
                        <strong>They teach:</strong>
                        <span>{match.skillToTeach} ({match.experience})</span>
                      </div>
                    </div>
                    <div className="swap-detail-item">
                      <CheckCircle size={18} color="#667eea" />
                      <div>
                        <strong>They want to learn:</strong>
                        <span>{match.skillToLearn}</span>
                      </div>
                    </div>
                  </div>

                  {match.matchPercentage === 100 && (
                    <div className="perfect-match-badge">
                      🎉 Perfect Match!
                    </div>
                  )}

                  <button 
                    className="send-request-btn"
                    onClick={() => sendSwapRequest(match.id)}
                  >
                    <Send size={18} />
                    Send Swap Request
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Skills Added Yet */}
        {(!user.skillsToTeach || user.skillsToTeach.length === 0 || 
          !user.skillsToLearn || user.skillsToLearn.length === 0) && (
          <div className="no-skills-message">
            <XCircle size={64} color="#f59e0b" />
            <h3>Complete Your Profile First!</h3>
            <p>
              You need to add skills you can teach and skills you want to learn 
              before finding swap partners.
            </p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/profile')}
            >
              Complete Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillSwapPage;