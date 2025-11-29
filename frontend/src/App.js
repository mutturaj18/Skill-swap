// ============================================
// FILE: frontend/src/App.js
// Main App with routing
// ============================================

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import CoursesPage from './pages/CoursesPage';
import TeachersPage from './pages/TeachersPage';
import CourseUploadPage from './pages/CourseUploadPage';
import ProfilePage from './pages/ProfilePage';
import SkillSwapPage from './pages/SkillSwapPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/teachers" element={<TeachersPage />} />
          <Route path="/create-course" element={<CourseUploadPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/skill-swap" element={<SkillSwapPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;