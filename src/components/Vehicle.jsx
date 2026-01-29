import React from 'react';
import './Vehicle.css';

const Vehicle = ({ matatu, lane, top, isPlayer = false }) => {
  const LANE_POSITIONS = [25, 50, 75];
  
  if (!matatu || !matatu.visual) return null;
  
  const { primaryColor, secondaryColor, tertiaryColor, pattern, ledLights, rimColor } = matatu.visual;
  
  return (
    <div 
      className={`vehicle ${isPlayer ? 'vehicle-player' : 'vehicle-npc'} vehicle-${matatu.type}`}
      style={{
        left: `${LANE_POSITIONS[lane]}%`,
        top: isPlayer ? 'auto' : `${top}px`,
        bottom: isPlayer ? '80px' : 'auto',
      }}
    >
      {/* Main Vehicle Body */}
      <div 
        className="vehicle-body"
        style={{
          background: `linear-gradient(145deg, ${primaryColor}, ${secondaryColor})`
        }}
      >
        {/* Windshield */}
        <div className="vehicle-windshield"></div>
        
        {/* Side Windows */}
        <div className="vehicle-windows">
          <div className="window window-left"></div>
          <div className="window window-right"></div>
        </div>
        
        {/* Graffiti/Branding */}
        {matatu.name && (
          <div 
            className={`vehicle-branding pattern-${pattern}`}
            style={{ color: tertiaryColor }}
          >
            {matatu.name}
          </div>
        )}
        
        {/* Headlights */}
        <div className="vehicle-lights front">
          <div className="light left"></div>
          <div className="light right"></div>
        </div>
        
        {/* Tail Lights */}
        <div className="vehicle-lights rear">
          <div className="tail-light left"></div>
          <div className="tail-light right"></div>
        </div>
        
        {/* LED Underglow (for nganyas) */}
        {ledLights && (
          <div className="vehicle-underglow" style={{ boxShadow: `0 10px 30px ${primaryColor}` }}></div>
        )}
        
        {/* Roof Rack/Details */}
        {matatu.type === 'nganya' && (
          <div className="vehicle-roof" style={{ background: tertiaryColor }}></div>
        )}
        
        {/* Side Mirrors */}
        <div className="vehicle-mirrors">
          <div className="mirror left" style={{ background: rimColor }}></div>
          <div className="mirror right" style={{ background: rimColor }}></div>
        </div>
      </div>
      
      {/* Shadow */}
      <div className="vehicle-shadow"></div>
      
      {/* Player Indicator */}
      {isPlayer && (
        <div className="player-indicator">
          <span>YOU</span>
        </div>
      )}
      
      {/* Route Number (top of matatu) */}
      {matatu.routeNumber && (
        <div className="route-number">{matatu.routeNumber}</div>
      )}
    </div>
  );
};

export default Vehicle;
