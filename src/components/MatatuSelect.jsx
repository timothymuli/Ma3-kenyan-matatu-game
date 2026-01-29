import React from 'react';
import './MatatuSelect.css';
import { MATATUS } from '../data/matatus';

const MatatuSelect = ({ onSelect }) => {
  // Get featured matatus (famous ones first)
  const featuredMatatus = MATATUS.filter(m => m.famous).slice(0, 8);
  
  return (
    <div className="matatu-select-screen">
      <div className="select-container">
        <h1 className="select-title">CHOOSE YOUR MATATU</h1>
        <p className="select-subtitle">Select from Nairobi's most iconic routes</p>
        
        <div className="matatu-grid">
          {featuredMatatus.map(matatu => (
            <div 
              key={matatu.id} 
              className="matatu-card"
              onClick={() => onSelect(matatu)}
              style={{
                borderColor: matatu.visual.primaryColor
              }}
            >
              {/* Visual Preview */}
              <div 
                className="matatu-preview"
                style={{
                  background: `linear-gradient(145deg, ${matatu.visual.primaryColor}, ${matatu.visual.secondaryColor})`
                }}
              >
                <div className="route-badge">{matatu.routeNumber}</div>
                {matatu.visual.ledLights && <div className="led-indicator">LED</div>}
              </div>
              
              {/* Info */}
              <div className="matatu-info">
                <h3 className="matatu-card-name">{matatu.name}</h3>
                <p className="matatu-route">{matatu.route}</p>
                
                <div className="matatu-stats">
                  <div className="stat">
                    <span className="stat-label">Speed</span>
                    <div className="stat-bar">
                      <div 
                        className="stat-fill" 
                        style={{ width: `${(matatu.specs.speed / 1.5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="stat">
                    <span className="stat-label">Fare</span>
                    <span className="stat-value">KES {matatu.specs.fare}</span>
                  </div>
                </div>
                
                <div className="matatu-type">{matatu.type.replace('_', ' ').toUpperCase()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatatuSelect;