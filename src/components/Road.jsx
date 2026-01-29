import React from 'react';
import './Road.css';

const Road = ({ route, speed = 1 }) => {
  return (
    <div className="road-container">
      {/* Sky */}
      <div className="sky">
        {/* Clouds */}
        <div className="cloud cloud-1"></div>
        <div className="cloud cloud-2"></div>
        <div className="cloud cloud-3"></div>
      </div>
      
      {/* Horizon / Buildings Silhouette */}
      <div className="horizon">
        <div className="cityscape">
          <div className="building building-1"></div>
          <div className="building building-2"></div>
          <div className="building building-3"></div>
          <div className="building building-4"></div>
          <div className="building building-5"></div>
          <div className="building building-6"></div>
        </div>
      </div>
      
      {/* The Road */}
      <div className="road" style={{ animationDuration: `${2 / speed}s` }}>
        {/* Road Surface */}
        <div className="road-surface"></div>
        
        {/* Lane Lines */}
        <div className="lane-markers">
          <div className="lane-line lane-line-1"></div>
          <div className="lane-line lane-line-2"></div>
        </div>
        
        {/* Road Edges */}
        <div className="road-edge road-edge-left"></div>
        <div className="road-edge road-edge-right"></div>
        
        {/* Road Details */}
        <div className="road-cracks"></div>
      </div>
    </div>
  );
};

export default Road;
