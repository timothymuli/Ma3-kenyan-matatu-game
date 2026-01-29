/**
 * MA3 - IMPROVED HUD
 * Clean, professional in-game interface
 */

import React, { useState, useEffect } from 'react';
import './ImprovedHUD.css';

const ImprovedHUD = ({ 
  speed = 0, 
  rpm = 0, 
  gear = 1,
  money = 0,
  passengers = 0,
  maxPassengers = 14,
  time = '00:00',
  route = 'CBD - Ngong',
  mission = null,
  health = 100
}) => {
  const [fuelLevel, setFuelLevel] = useState(100);
  
  // Consume fuel
  useEffect(() => {
    const interval = setInterval(() => {
      if (speed > 0) {
        setFuelLevel(prev => Math.max(0, prev - 0.1));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [speed]);
  
  const speedPercent = (speed / 120) * 100;
  const rpmPercent = (rpm / 7000) * 100;

  return (
    <div className="improved-hud">
      {/* Top Bar */}
      <div className="hud-top">
        <div className="time-display">
          <span className="time-icon">🕐</span>
          <span className="time-value">{time}</span>
        </div>
        
        <div className="route-display">
          <span className="route-label">ROUTE</span>
          <span className="route-value">{route}</span>
        </div>
        
        <div className="money-display">
          <span className="money-value">KES {money.toLocaleString()}</span>
          <span className="money-icon">💰</span>
        </div>
      </div>
      
      {/* Mission Tracker */}
      {mission && (
        <div className="mission-tracker">
          <div className="mission-header">
            <span className="mission-icon">📍</span>
            <span className="mission-title">{mission.title}</span>
          </div>
          <div className="mission-progress">
            <div 
              className="mission-bar" 
              style={{ width: `${mission.progress}%` }}
            />
          </div>
          <span className="mission-desc">{mission.description}</span>
        </div>
      )}
      
      {/* Left Side - Speedometer */}
      <div className="speedometer-panel">
        <div className="panel-header">
          <span className="matatu-name">MATRIX</span>
          <span className="matatu-route">NGANYA</span>
        </div>
        
        <div className="speed-gauge">
          <svg viewBox="0 0 200 120" className="gauge-svg">
            {/* Background arc */}
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="15"
              strokeLinecap="round"
            />
            {/* Speed arc */}
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="url(#speedGradient)"
              strokeWidth="15"
              strokeLinecap="round"
              strokeDasharray={`${speedPercent * 2.51} 251`}
              className="speed-arc"
            />
            <defs>
              <linearGradient id="speedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00FF88" />
                <stop offset="50%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#FF10F0" />
              </linearGradient>
            </defs>
            {/* Speed text */}
            <text x="100" y="75" textAnchor="middle" className="speed-number">
              {Math.round(speed)}
            </text>
            <text x="100" y="95" textAnchor="middle" className="speed-unit">
              KM/H
            </text>
          </svg>
        </div>
        
        <div className="gauge-details">
          <div className="detail-item">
            <span className="detail-label">RPM</span>
            <span className="detail-value">{rpm}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">GEAR</span>
            <span className="detail-value gear-value">{gear}</span>
          </div>
        </div>
        
        {/* Fuel Bar */}
        <div className="fuel-container">
          <span className="fuel-icon">⛽</span>
          <div className="fuel-bar-bg">
            <div 
              className={`fuel-bar ${fuelLevel < 20 ? 'low' : ''}`}
              style={{ width: `${fuelLevel}%` }}
            />
          </div>
          <span className="fuel-percent">{Math.round(fuelLevel)}%</span>
        </div>
      </div>
      
      {/* Right Side - Stats */}
      <div className="stats-panel">
        <div className="stat-box">
          <span className="stat-icon">👥</span>
          <div className="stat-content">
            <span className="stat-label">PASSENGERS</span>
            <span className="stat-value">{passengers}/{maxPassengers}</span>
          </div>
        </div>
        
        <div className="stat-box">
          <span className="stat-icon">❤️</span>
          <div className="stat-content">
            <span className="stat-label">VEHICLE HEALTH</span>
            <div className="health-bar-bg">
              <div 
                className="health-bar"
                style={{ width: `${health}%` }}
              />
            </div>
          </div>
        </div>
        
        {/* Minimap */}
        <div className="minimap">
          <div className="minimap-header">NAIROBI MAP</div>
          <div className="minimap-content">
            <div className="minimap-grid">
              <div className="player-dot" />
              <div className="stage-marker" style={{top: '30%', left: '50%'}}>📍</div>
              <div className="stage-marker" style={{top: '70%', left: '60%'}}>📍</div>
            </div>
          </div>
          <div className="minimap-footer">
            <span>Speed: {Math.round(speed)} km/h</span>
          </div>
        </div>
      </div>
      
      {/* Bottom Notifications */}
      <div className="hud-notifications">
        {speed > 100 && (
          <div className="notification warning">
            ⚠️ SLOW DOWN! Police ahead!
          </div>
        )}
        {fuelLevel < 20 && (
          <div className="notification danger">
            ⛽ LOW FUEL! Find a petrol station
          </div>
        )}
        {passengers >= maxPassengers && (
          <div className="notification success">
            ✅ FULL CAPACITY! Head to destination
          </div>
        )}
      </div>
    </div>
  );
};

export default ImprovedHUD;