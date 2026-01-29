/**
 * MA3 - EPIC MAIN MENU
 * The most beautiful matatu game menu ever created
 */

import React, { useState, useEffect } from 'react';
import './MainMenu.css';

const MainMenu = ({ onStartGame, onOpenGarage, onOpenLeaderboard }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredButton, setHoveredButton] = useState(null);
  const [time, setTime] = useState(new Date());

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Update time
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const menuButtons = [
    {
      id: 'start',
      icon: '▶️',
      label: 'START GAME',
      sublabel: 'Hit the streets of Nairobi',
      action: onStartGame,
      color: '#FFD700'
    },
    {
      id: 'garage',
      icon: '🚗',
      label: 'GARAGE',
      sublabel: 'Customize your nganya',
      action: onOpenGarage,
      color: '#00D4FF'
    },
    {
      id: 'leaderboard',
      icon: '🏆',
      label: 'LEADERBOARD',
      sublabel: 'Top drivers in Kenya',
      action: onOpenLeaderboard,
      color: '#FF10F0'
    },
    {
      id: 'stats',
      icon: '📊',
      label: 'MY STATS',
      sublabel: 'View your empire',
      action: () => alert('Stats coming soon!'),
      color: '#00FF88'
    }
  ];

  const stats = [
    { label: 'TOTAL PLAYERS', value: '12,847' },
    { label: 'ONLINE NOW', value: '247' },
    { label: 'ROUTES', value: '12' }
  ];

  return (
    <div className="main-menu">
      {/* Animated background */}
      <div className="menu-background">
        <div 
          className="skyline"
          style={{
            transform: `translateX(${mousePos.x * 0.5}px)`
          }}
        />
        <div className="road-lines" />
        <div className="particles-container">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
                opacity: Math.random() * 0.5 + 0.3
              }}
            />
          ))}
        </div>
      </div>

      {/* Main content */}
      <div 
        className="menu-content"
        style={{
          transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`
        }}
      >
        {/* Logo */}
        <div className="logo-section">
          <div className="logo-container">
            <h1 className="logo-text">MA3</h1>
            <div className="logo-glow" />
          </div>
          <p className="logo-subtitle">KENYAN MATATU EXPERIENCE</p>
          <div className="logo-divider" />
        </div>

        {/* Featured Matatu */}
        <div className="featured-matatu">
          <div className="matatu-showcase">
            <div className="matatu-icon">🚐</div>
            <div className="underglow-effect" />
          </div>
          <div className="matatu-info">
            <span className="matatu-label">READY TO ROLL</span>
            <span className="matatu-name">MATRIX NGANYA</span>
            <span className="matatu-route">CBD → Ngong Road</span>
          </div>
        </div>

        {/* Menu Buttons */}
        <div className="menu-buttons">
          {menuButtons.map((btn) => (
            <button
              key={btn.id}
              className={`menu-btn ${hoveredButton === btn.id ? 'hovered' : ''}`}
              onClick={btn.action}
              onMouseEnter={() => setHoveredButton(btn.id)}
              onMouseLeave={() => setHoveredButton(null)}
              style={{
                '--btn-color': btn.color
              }}
            >
              <span className="btn-icon">{btn.icon}</span>
              <div className="btn-text">
                <span className="btn-label">{btn.label}</span>
                <span className="btn-sublabel">{btn.sublabel}</span>
              </div>
              <div className="btn-glow" />
              <div className="btn-shine" />
            </button>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="stats-bar">
          {stats.map((stat, i) => (
            <div key={i} className="stat-item">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="menu-footer">
        <div className="footer-left">
          <span className="version">v1.0 ALPHA</span>
          <span className="dot">•</span>
          <span className="credits">Made with 🇰🇪 in Nairobi</span>
        </div>
        <div className="footer-right">
          <span className="time">{time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      {/* Floating Text */}
      <div className="floating-texts">
        <div className="float-text" style={{ animationDelay: '0s', top: '20%', left: '10%' }}>
          TOWN TOWN
        </div>
        <div className="float-text" style={{ animationDelay: '3s', top: '60%', right: '15%' }}>
          BESHTE FORM NI FORM
        </div>
        <div className="float-text" style={{ animationDelay: '6s', top: '80%', left: '20%' }}>
          NANI AKO DOWN?
        </div>
      </div>
    </div>
  );
};

export default MainMenu;