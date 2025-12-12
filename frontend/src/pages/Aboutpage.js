// ============================================
// FILE: frontend/src/pages/AboutPage.js
// About page with full content
// ============================================

import React from 'react';
import { BookOpen, Users, Award, TrendingUp, Heart, Target, Zap, Globe } from 'lucide-react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1 className="about-title">About SkillSwap</h1>
          <p className="about-subtitle">
            Empowering learners and teachers worldwide through skill exchange
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <h2 className="section-heading">Our Mission</h2>
            <p className="mission-text">
              SkillSwap was founded on a simple yet powerful idea: <strong>everyone has something valuable to teach, and everyone has something to learn.</strong> We believe that knowledge should be accessible to all, regardless of age, background, or experience level.
            </p>
            <p className="mission-text">
              Our platform breaks down traditional barriers to education by creating a community where skills are exchanged freely. Whether you're a 10-year-old guitar prodigy teaching adults or a retired chef sharing decades of culinary wisdom, SkillSwap is your stage.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="values-section">
        <div className="container">
          <h2 className="section-heading">Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <Heart size={32} />
              </div>
              <h3>Community First</h3>
              <p>We believe in building a supportive, inclusive community where everyone feels valued and respected.</p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <Users size={32} />
              </div>
              <h3>Peer-to-Peer Learning</h3>
              <p>Learning from peers creates authentic connections and makes education more relatable and effective.</p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <Globe size={32} />
              </div>
              <h3>Accessibility</h3>
              <p>Quality education should be accessible to everyone, everywhere, without financial barriers.</p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <Zap size={32} />
              </div>
              <h3>Continuous Growth</h3>
              <p>We encourage lifelong learning and believe there's no age limit to acquiring new skills.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-heading">How SkillSwap Works</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Choose Your Role</h3>
              <p>Sign up as a <strong>Learner</strong> to access courses, a <strong>Teacher</strong> to create and share your knowledge, or <strong>Both</strong> to teach what you know and learn what you don't!</p>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Browse or Create</h3>
              <p>Learners can browse 40+ courses across 11 categories. Teachers can create engaging video courses and reach eager students worldwide.</p>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Skill Swap Magic</h3>
              <p>If you're <strong>Both</strong>, find perfect swap partners! Teach someone guitar while they teach you Python. Exchange skills, not money!</p>
            </div>

            <div className="step-card">
              <div className="step-number">4</div>
              <h3>Earn Rewards</h3>
              <p>Collect badges for completing courses. Teachers earn exclusive coupons from Amazon, Flipkart, and more!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <h2 className="section-heading">SkillSwap by the Numbers</h2>
          <div className="stats-grid">
            <div className="stat-box">
              <BookOpen size={40} />
              <div className="stat-number">40+</div>
              <div className="stat-label">Courses Available</div>
            </div>

            <div className="stat-box">
              <Users size={40} />
              <div className="stat-number">100+</div>
              <div className="stat-label">Active Learners</div>
            </div>

            <div className="stat-box">
              <Award size={40} />
              <div className="stat-number">15+</div>
              <div className="stat-label">Expert Teachers</div>
            </div>

            <div className="stat-box">
              <TrendingUp size={40} />
              <div className="stat-number">11</div>
              <div className="stat-label">Categories</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories We Offer */}
      <section className="categories-offer">
        <div className="container">
          <h2 className="section-heading">Categories We Offer</h2>
          <div className="categories-list">
            <div className="category-item">🎵 Music</div>
            <div className="category-item">💻 Coding</div>
            <div className="category-item">🌍 Languages</div>
            <div className="category-item">📷 Photography</div>
            <div className="category-item">⚽ Sports</div>
            <div className="category-item">✍️ Writing</div>
            <div className="category-item">🎬 Video Editing</div>
            <div className="category-item">💼 Business</div>
            <div className="category-item">💪 Fitness</div>
            <div className="category-item">🎮 Gaming</div>
            <div className="category-item">🎨 Art & Design</div>
          </div>
        </div>
      </section>

      {/* Why Choose SkillSwap */}
      <section className="why-choose">
        <div className="container">
          <h2 className="section-heading">Why Choose SkillSwap?</h2>
          <div className="features-grid">
            <div className="feature-box">
              <h3>✨ No Age Barriers</h3>
              <p>Learn from a 12-year-old coding genius or teach grandma your TikTok skills. Age is just a number here!</p>
            </div>

            <div className="feature-box">
              <h3>💰 Free to Join</h3>
              <p>Create an account, access courses, and start learning immediately. No hidden fees, no subscriptions.</p>
            </div>

            <div className="feature-box">
              <h3>🏆 Gamified Learning</h3>
              <p>Earn badges, collect points, unlock achievements, and get rewarded for your dedication to learning.</p>
            </div>

            <div className="feature-box">
              <h3>🔄 Unique Skill Swap</h3>
              <p>Our exclusive feature lets you trade skills directly with other members. It's education meets collaboration!</p>
            </div>

            <div className="feature-box">
              <h3>🎁 Teacher Rewards</h3>
              <p>Teachers earn discount coupons from top brands like Amazon, Flipkart, GoPro, and more!</p>
            </div>

            <div className="feature-box">
              <h3>🌟 Spotlight New Teachers</h3>
              <p>Just started teaching? We highlight new creators so learners can discover fresh content!</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Story */}
      <section className="story-section">
        <div className="container">
          <div className="story-content">
            <h2 className="section-heading">The SkillSwap Story</h2>
            <p className="story-text">
              SkillSwap was born from a simple observation: traditional education often creates rigid hierarchies where only "qualified experts" can teach. But in reality, a passionate teenager who spends 6 hours daily mastering the guitar can teach just as effectively as a music school graduate.
            </p>
            <p className="story-text">
              We asked ourselves: <em>What if we created a platform where anyone could be both student and teacher?</em> Where a software engineer could learn Spanish from a high school student, while teaching them Python in return?
            </p>
            <p className="story-text">
              That's how SkillSwap was created - to democratize education, celebrate peer learning, and prove that everyone has something valuable to offer.
            </p>
            <p className="story-text">
              Today, SkillSwap is a thriving community of learners and teachers who believe in the power of shared knowledge. We're not just a platform; we're a movement toward more accessible, inclusive, and human-centered education.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-about">
        <div className="container">
          <h2>Ready to Start Your Journey?</h2>
          <p>Join our community of passionate learners and teachers today!</p>
          <div className="cta-buttons">
            <button className="btn btn-primary" onClick={() => window.location.href = '/signup'}>
              Get Started Free
            </button>
            <button className="btn btn-outline" onClick={() => window.location.href = '/'}>
              Browse Courses
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;