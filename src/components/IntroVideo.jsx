import React, { useState, useEffect } from 'react';
import './IntroVideo.css';

const IntroVideo = ({ onComplete }) => {
  const [canSkip, setCanSkip] = useState(false);
  const [countdown, setCountdown] = useState(5);
  
  useEffect(() => {
    // Countdown timer
    const countInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // Allow skipping after 3 seconds
    const skipTimer = setTimeout(() => setCanSkip(true), 3000);
    
    // Auto-complete after 5 seconds
    const autoComplete = setTimeout(() => {
      onComplete();
    }, 5000);
    
    return () => {
      clearTimeout(skipTimer);
      clearTimeout(autoComplete);
      clearInterval(countInterval);
    };
  }, [onComplete]);
  
  const handleSkip = () => {
    if (canSkip) {
      onComplete();
    }
  };
  
  return (
    <div className="intro-video-screen">
      {/* Animated Background */}
      <div className="intro-bg">
        <div className="moving-matatu matatu-1"></div>
        <div className="moving-matatu matatu-2"></div>
        <div className="moving-matatu matatu-3"></div>
        <div className="nairobi-skyline"></div>
      </div>
      
      {/* Main Content */}
      <div className="intro-overlay">
        <div className="intro-content">
          <h1 className="intro-title">MA3</h1>
          <div className="intro-badge">
            <span className="badge-text">🇰🇪 100% KENYAN 🇰🇪</span>
          </div>
          <p className="intro-subtitle">The Real Kenyan Matatu Experience</p>
          
          <div className="intro-features">
            <div className="feature">✓ Real Nairobi Routes</div>
            <div className="feature">✓ Authentic Nganyas</div>
            <div className="feature">✓ Sheng Language</div>
            <div className="feature">✓ Kenyan Music</div>
          </div>
          
          {countdown > 0 && (
            <div className="countdown">Starting in {countdown}...</div>
          )}
        </div>
        
        {canSkip && (
          <button className="skip-button" onClick={handleSkip}>
            SKIP INTRO →
          </button>
        )}
      </div>
      
      {/* Kenyan Flag Animation */}
      <div className="flag-bars">
        <div className="flag-bar black"></div>
        <div className="flag-bar red"></div>
        <div className="flag-bar green"></div>
      </div>
      
      {/* Now Playing */}
      <div className="now-playing">
        <span className="music-icon">🎵</span>
        <span>Those Days in Nairobi - DynamQ</span>
      </div>
    </div>
  );
};

export default IntroVideo;
