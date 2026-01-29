/**
 * MA3 - GAME ENGINE WITH ALL UPGRADES
 * Post-processing, 3D Matatu, Improved HUD
 */

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sky, Stars, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Import new components
import PostProcessing from '../effects/PostProcessing';
import Matatu3D from '../models/Matatu3D';
import ImprovedHUD from './ImprovedHUD';

// Ground component
const Ground = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[1000, 1000]} />
      <meshStandardMaterial color="#2a2a2a" />
    </mesh>
  );
};

// Road component
const Road = ({ position = [0, 0, 0] }) => {
  return (
    <group position={position}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[10, 1000]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      
      {/* Road lines */}
      {[...Array(50)].map((_, i) => (
        <mesh
          key={i}
          position={[0, 0.02, i * 20 - 500]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[0.3, 5]} />
          <meshBasicMaterial color="#FFD700" />
        </mesh>
      ))}
    </group>
  );
};

// Simple building
const Building = ({ position, height, color }) => {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={[8, height, 8]} />
      <meshStandardMaterial color={color} roughness={0.8} />
    </mesh>
  );
};

const Game3D = ({ selectedMatatu, onExit }) => {
  // Game state
  const [gameTime, setGameTime] = useState(12);
  const [isNight, setIsNight] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  // Vehicle state
  const [position, setPosition] = useState([0, 1, 0]);
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [speed, setSpeed] = useState(0);
  const [rpm, setRpm] = useState(800);
  const [gear, setGear] = useState(1);
  
  // Game metrics
  const [money, setMoney] = useState(500);
  const [passengers, setPassengers] = useState(0);
  const [health, setHealth] = useState(100);
  
  // Mission state
  const [currentMission, setCurrentMission] = useState({
    title: 'Pick up passengers',
    description: 'Stop at 3 matatu stages',
    progress: 0
  });
  
  // Police chase
  const [policeChaseActive, setPoliceChaseActive] = useState(false);
  
  // Controls
  const keysPressed = useRef({});
  
  // Day/night cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setGameTime(prev => {
        const newTime = (prev + 0.1) % 24;
        setIsNight(newTime < 6 || newTime > 18);
        return newTime;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      keysPressed.current[e.key.toLowerCase()] = true;
      
      if (e.key === 'Escape') {
        setIsPaused(prev => !prev);
      }
      
      if (e.key === 'q' || e.key === 'Q') {
        if (window.confirm('Return to main menu?')) {
          onExit();
        }
      }
    };
    
    const handleKeyUp = (e) => {
      keysPressed.current[e.key.toLowerCase()] = false;
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [onExit]);
  
  // Game loop
  useEffect(() => {
    if (isPaused) return;
    
    const gameLoop = setInterval(() => {
      const keys = keysPressed.current;
      
      // Acceleration
      if (keys['w'] || keys['arrowup']) {
        setSpeed(prev => Math.min(prev + 2, 120));
        setRpm(prev => Math.min(prev + 100, 7000));
      } else {
        setSpeed(prev => Math.max(prev - 1, 0));
        setRpm(prev => Math.max(prev - 50, 800));
      }
      
      // Braking
      if (keys['s'] || keys['arrowdown']) {
        setSpeed(prev => Math.max(prev - 3, 0));
      }
      
      // Steering
      let steerAmount = 0;
      if (keys['a'] || keys['arrowleft']) {
        steerAmount = 0.02;
      }
      if (keys['d'] || keys['arrowright']) {
        steerAmount = -0.02;
      }
      
      // Update position
      setPosition(prev => {
        const [x, y, z] = prev;
        const currentRotation = rotation[1];
        const moveSpeed = speed / 100;
        
        return [
          x + Math.sin(currentRotation) * moveSpeed,
          y,
          z + Math.cos(currentRotation) * moveSpeed
        ];
      });
      
      // Update rotation
      if (speed > 5) {
        setRotation(prev => [prev[0], prev[1] + steerAmount, prev[2]]);
      }
      
      // Auto gear shifting
      if (rpm > 6000 && gear < 5) {
        setGear(prev => prev + 1);
        setRpm(2000);
      }
      if (rpm < 1500 && gear > 1 && speed > 10) {
        setGear(prev => prev - 1);
        setRpm(4000);
      }
      
      // Police trigger
      if (speed > 100 && Math.random() < 0.01) {
        setPoliceChaseActive(true);
      }
      
      // Random passenger spawns
      if (speed < 5 && Math.random() < 0.05 && passengers < 14) {
        const newPassengers = Math.min(passengers + Math.floor(Math.random() * 3) + 1, 14);
        setPassengers(newPassengers);
        setMoney(prev => prev + 50);
        
        setCurrentMission(prev => ({
          ...prev,
          progress: Math.min(prev.progress + 33, 100)
        }));
      }
      
    }, 1000 / 60);
    
    return () => clearInterval(gameLoop);
  }, [isPaused, speed, rotation, gear, rpm, passengers]);
  
  // Format time
  const formatTime = () => {
    const hours = Math.floor(gameTime);
    const minutes = Math.floor((gameTime % 1) * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Canvas
        shadows
        camera={{ position: [0, 5, -10], fov: 75 }}
        gl={{ 
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2
        }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={isNight ? 0.2 : 0.5} />
          <directionalLight
            position={[100, 100, 50]}
            intensity={isNight ? 0.3 : 1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          
          {/* Sky */}
          <Sky
            distance={450000}
            sunPosition={[100, isNight ? -20 : 20, 100]}
            inclination={isNight ? 0.6 : 0.49}
            azimuth={0.25}
          />
          
          {/* Stars at night */}
          {isNight && (
            <Stars
              radius={100}
              depth={50}
              count={5000}
              factor={4}
              saturation={0}
              fade
              speed={1}
            />
          )}
          
          {/* Environment */}
          <Environment preset={isNight ? 'night' : 'sunset'} />
          
          {/* Ground */}
          <Ground />
          
          {/* Road */}
          <Road position={[0, 0, position[2]]} />
          
          {/* Buildings */}
          {[...Array(20)].map((_, i) => (
            <Building
              key={i}
              position={[
                i % 2 === 0 ? -20 : 20,
                Math.random() * 20 + 10,
                i * 50 - 500 + position[2]
              ]}
              height={Math.random() * 30 + 10}
              color={`hsl(${Math.random() * 60 + 180}, 20%, 30%)`}
            />
          ))}
          
          {/* Player Matatu */}
          <Matatu3D
            position={position}
            rotation={rotation}
            color={selectedMatatu?.color || '#FFD700'}
            hasUnderglow={true}
            speed={speed}
          />
          
          {/* Post-Processing */}
          <PostProcessing speed={speed} isNight={isNight} />
        </Suspense>
      </Canvas>
      
      {/* Improved HUD */}
      <ImprovedHUD
        speed={speed}
        rpm={rpm}
        gear={gear}
        money={money}
        passengers={passengers}
        maxPassengers={14}
        time={formatTime()}
        route={selectedMatatu?.route || 'CBD - Ngong'}
        mission={currentMission}
        health={health}
      />
      
      {/* Pause Menu */}
      {isPaused && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.9)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '30px',
          zIndex: 1000
        }}>
          <h1 style={{ 
            fontSize: '72px', 
            color: '#FFD700',
            textShadow: '0 0 40px rgba(255,215,0,0.8)',
            fontFamily: 'Poppins'
          }}>
            PAUSED
          </h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <button
              onClick={() => setIsPaused(false)}
              style={{
                padding: '15px 40px',
                fontSize: '20px',
                background: '#FFD700',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: '700',
                fontFamily: 'Poppins'
              }}
            >
              ▶ RESUME
            </button>
            <button
              onClick={onExit}
              style={{
                padding: '15px 40px',
                fontSize: '20px',
                background: 'rgba(255,255,255,0.1)',
                color: '#FFF',
                border: '2px solid #FFD700',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: '700',
                fontFamily: 'Poppins'
              }}
            >
              EXIT TO MENU
            </button>
          </div>
        </div>
      )}
      
      {/* Controls */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(0,0,0,0.7)',
        padding: '10px 20px',
        borderRadius: '10px',
        color: '#FFF',
        fontSize: '12px',
        fontFamily: 'Poppins',
        display: 'flex',
        gap: '20px',
        border: '1px solid rgba(255,215,0,0.3)',
        zIndex: 10
      }}>
        <span><strong>W/↑</strong> Accelerate</span>
        <span><strong>S/↓</strong> Brake</span>
        <span><strong>A/D</strong> Steer</span>
        <span><strong>ESC</strong> Pause</span>
        <span><strong>Q</strong> Exit</span>
      </div>
    </div>
  );
};

export default Game3D;
