/**
 * MA3 - Main Game Component
 * The complete authentic Kenyan matatu experience
 */

import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { GAME_STATES, LANES, BASE_SPEED, COLLISION_THRESHOLD } from './utils/constants';
import { getRandomLane, getRandomItem, checkCollision, formatScore, getLevelFromScore } from './utils/helpers';
import { PLAYER_MATATUS } from './data/matatus';
import { ROUTES, DEFAULT_ROUTE } from './data/routes';
import { OBSTACLE_VEHICLES } from './data/cars';
import { CONDUCTOR_SHOUTS, POLICE_DIALOGUES, PASSENGER_REACTIONS } from './data/sheng';

function App() {
  // Game state
  const [gameState, setGameState] = useState(GAME_STATES.MENU);
  const [selectedMatatu, setSelectedMatatu] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);
  
  // Player
  const [playerLane, setPlayerLane] = useState(1);
  const [passengers, setPassengers] = useState(0);
  
  // Score & Level
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('ma3HighScore')) || 0;
  });
  const [level, setLevel] = useState(1);
  const [money, setMoney] = useState(0);
  
  // Game objects
  const [obstacles, setObstacles] = useState([]);
  const [collectibles, setCollectibles] = useState([]);
  const [trafficLights, setTrafficLights] = useState([]);
  const [policeOfficers, setPoliceOfficers] = useState([]);
  
  // Traffic system
  const [currentTrafficLight, setCurrentTrafficLight] = useState(null);
  const [trafficLightState, setTrafficLightState] = useState('green');
  
  // Police system
  const [isBeingChased, setIsBeingChased] = useState(false);
  const [policeMessage, setPoliceMessage] = useState('');
  const [violationType, setViolationType] = useState(null);
  
  // UI messages
  const [conductorMessage, setConductorMessage] = useState('');
  const [passengerMessage, setPassengerMessage] = useState('');
  
  // Start game
  const startGame = useCallback((matatu, route) => {
    setSelectedMatatu(matatu);
    setSelectedRoute(route || DEFAULT_ROUTE);
    setGameState(GAME_STATES.PLAYING);
    setScore(0);
    setLevel(1);
    setPassengers(0);
    setMoney(0);
    setPlayerLane(1);
    setObstacles([]);
    setCollectibles([]);
    setTrafficLights([]);
    setPoliceOfficers([]);
    setIsBeingChased(false);
    
    // Initial conductor shout
    const routeShouts = CONDUCTOR_SHOUTS[route?.id?.toUpperCase()] || CONDUCTOR_SHOUTS.EMBAKASI;
    setConductorMessage(getRandomItem(routeShouts));
    setTimeout(() => setConductorMessage(''), 3000);
  }, []);
  
  // Move player
  const movePlayer = useCallback((direction) => {
    if (gameState !== GAME_STATES.PLAYING) return;
    
    setPlayerLane(prev => {
      if (direction === 'left' && prev > 0) return prev - 1;
      if (direction === 'right' && prev < 2) return prev + 1;
      return prev;
    });
  }, [gameState]);
  
  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') movePlayer('left');
      if (e.key === 'ArrowRight' || e.key === 'd') movePlayer('right');
      if (e.key === ' ' && gameState === GAME_STATES.PLAYING) {
        setGameState(GAME_STATES. PAUSED);
      }
      if (e.key === ' ' && gameState === GAME_STATES.PAUSED) {
        setGameState(GAME_STATES.PLAYING);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [movePlayer, gameState]);
  
  // Spawn obstacles
  useEffect(() => {
    if (gameState !== GAME_STATES.PLAYING) return;
    
    const interval = setInterval(() => {
      const vehicle = getRandomItem(OBSTACLE_VEHICLES);
      setObstacles(prev => [...prev, {
        id: Date.now(),
        lane: getRandomLane(),
        top: -100,
        emoji: vehicle.emoji,
        type: vehicle.type,
        speed: vehicle.speed || 1.0
      }]);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [gameState, level]);
  
  // Spawn passengers at stages
  useEffect(() => {
    if (gameState !== GAME_STATES.PLAYING) return;
    
    const interval = setInterval(() => {
      setCollectibles(prev => [...prev, {
        id: Date.now(),
        lane: getRandomLane(),
        top: -100,
        emoji: '👤',
        type: 'passenger',
        points: 10
      }]);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [gameState]);
  
  // Spawn M-PESA
  useEffect(() => {
    if (gameState !== GAME_STATES.PLAYING) return;
    
    const interval = setInterval(() => {
      setCollectibles(prev => [...prev, {
        id: Date.now(),
        lane: getRandomLane(),
        top: -100,
        emoji: '💰',
        type: 'mpesa',
        points: 5
      }]);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [gameState]);
  
  // Traffic light system for Ngong Road
  useEffect(() => {
    if (gameState !== GAME_STATES. PLAYING) return;
    if (selectedRoute?.id !== 'ngong_road') return;
    
    const interval = setInterval(() => {
      // Spawn traffic light
      setTrafficLights(prev => [... prev, {
        id: Date.now(),
        lane: 1, // Center lane
        top: -100,
        state: 'red',
        duration: 10000
      }]);
    }, 20000);
    
    return () => clearInterval(interval);
  }, [gameState, selectedRoute]);
  
  // Game loop
  useEffect(() => {
    if (gameState !== GAME_STATES.PLAYING) return;
    
    const gameSpeed = BASE_SPEED + (level * 0.3);
    
    const loop = setInterval(() => {
      // Move obstacles
      setObstacles(prev => prev
        .map(obs => ({ ...obs, top: obs.top + (gameSpeed * obs.speed) }))
        .filter(obs => obs.top < 700)
      );
      
      // Move collectibles
      setCollectibles(prev => prev
        . map(col => ({ ...col, top: col.top + gameSpeed }))
        .filter(col => col.top < 700)
      );
      
      // Move traffic lights
      setTrafficLights(prev => prev
        .map(light => ({ ... light, top: light.top + gameSpeed }))
        .filter(light => light.top < 700)
      );
      
      // Move police
      setPoliceOfficers(prev => prev
        .map(cop => ({ ...cop, top: cop.top + (gameSpeed * 1.3) }))
        .filter(cop => cop.top < 700)
      );
      
      // Increase score
      setScore(s => s + 0.1);
      
      // Level up
      const newLevel = getLevelFromScore(score);
      if (newLevel > level) {
        setLevel(newLevel);
        setConductorMessage(getRandomItem(CONDUCTOR_SHOUTS. HYPE));
        setTimeout(() => setConductorMessage(''), 2000);
      }
    }, 50);
    
    return () => clearInterval(loop);
  }, [gameState, level, score]);
  
  // Collision detection
  useEffect(() => {
    if (gameState !== GAME_STATES.PLAYING) return;
    
    const playerObj = { lane: playerLane, top:  450 };
    
    // Check obstacle collisions
    const collision = obstacles.find(obs => 
      checkCollision(playerObj, obs, COLLISION_THRESHOLD)
    );
    
    if (collision) {
      setGameState(GAME_STATES. GAME_OVER);
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('ma3HighScore', Math.floor(score));
      }
      return;
    }
    
    // Check collectible collisions
    collectibles.forEach(col => {
      if (checkCollision(playerObj, col, COLLISION_THRESHOLD)) {
        setCollectibles(prev => prev.filter(c => c.id !== col.id));
        
        if (col.type === 'passenger') {
          setPassengers(p => Math.min(p + 1, selectedMatatu?. capacity || 14));
          setScore(s => s + 10);
          setMoney(m => m + 50);
          
          // Random passenger reaction
          if (Math.random() < 0.3) {
            setPassengerMessage(getRandomItem(PASSENGER_REACTIONS. BOARDING));
            setTimeout(() => setPassengerMessage(''), 2000);
          }
          
          // Full matatu bonus
          if (passengers + 1 === selectedMatatu?.capacity) {
            setScore(s => s + 100);
            setConductorMessage("Tumejaa! Bonus!");
            setTimeout(() => setConductorMessage(''), 2000);
          }
        } else if (col.type === 'mpesa') {
          setScore(s => s + 5);
          setMoney(m => m + 30);
        }
      }
    });
    
    // Check traffic light violations (Ngong Road only)
    trafficLights.forEach(light => {
      if (light.state === 'red' && checkCollision(playerObj, light, 50)) {
        // Run red light! 
        setIsBeingChased(true);
        setViolationType('redLight');
        setPoliceMessage(getRandomItem(POLICE_DIALOGUES.RED_LIGHT));
        
        // Spawn police on bicycle
        setPoliceOfficers(prev => [...prev, {
          id: Date.now(),
          lane: playerLane,
          top: -100,
          emoji: '👮🚲',
          type: 'bicycle'
        }]);
      }
    });
    
  }, [gameState, playerLane, obstacles, collectibles, trafficLights, score, highScore, passengers, selectedMatatu]);
  
  // Police catch
  useEffect(() => {
    if (! isBeingChased) return;
    
    const playerObj = { lane: playerLane, top: 450 };
    
    policeOfficers.forEach(cop => {
      if (checkCollision(playerObj, cop, 60)) {
        // Caught!
        setGameState(GAME_STATES. POLICE_STATION);
      }
    });
  }, [isBeingChased, playerLane, policeOfficers]);

  return (
    <div className="app">
      {/* MENU SCREEN */}
      {gameState === GAME_STATES.MENU && (
        <div className="menu-screen">
          <h1 className="game-title">🚌 MA3</h1>
          <p className="subtitle">The Real Kenyan Matatu Experience</p>
          
          <div className="menu-buttons">
            <button 
              className="btn btn-primary"
              onClick={() => setGameState(GAME_STATES.MATATU_SELECT)}
            >
              START GAME
            </button>
            <button className="btn btn-secondary">HOW TO PLAY</button>
            <button className="btn btn-secondary">LEADERBOARD</button>
          </div>
          
          <div className="high-score">
            Best: {formatScore(highScore)}
          </div>
        </div>
      )}
      
      {/* MATATU SELECT */}
      {gameState === GAME_STATES.MATATU_SELECT && (
        <div className="matatu-select-screen">
          <h2>Choose Your Matatu</h2>
          <div className="matatu-grid">
            {PLAYER_MATATUS.map(matatu => (
              <div 
                key={matatu.id}
                className="matatu-card"
                onClick={() => {
                  setSelectedMatatu(matatu);
                  startGame(matatu, DEFAULT_ROUTE);
                }}
              >
                <div className="matatu-emoji">{matatu.emoji}</div>
                <h3>{matatu.name}</h3>
                <p className="route">{matatu.route}</p>
                <div className="features">
                  {matatu.features.map((f, i) => (
                    <span key={i} className="tag">{f}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* GAME SCREEN */}
      {gameState === GAME_STATES. PLAYING && (
        <div className="game-screen">
          {/* HUD */}
          <div className="hud">
            <div className="stat">
              <span>Score</span>
              <strong>{formatScore(score)}</strong>
            </div>
            <div className="stat">
              <span>Level</span>
              <strong>{level}</strong>
            </div>
            <div className="stat">
              <span>Passengers</span>
              <strong>{passengers}/{selectedMatatu?.capacity}</strong>
            </div>
            <div className="stat">
              <span>Money</span>
              <strong>KES {money}</strong>
            </div>
          </div>
          
          {/* Game Canvas */}
          <div className="game-canvas">
            {/* Road */}
            <div className="road">
              <div className="lane-line left"></div>
              <div className="lane-line right"></div>
            </div>
            
            {/* Player */}
            <div 
              className="player"
              style={{ left: `${LANES[playerLane]}%` }}
            >
              {selectedMatatu?. emoji || '🚌'}
            </div>
            
            {/* Obstacles */}
            {obstacles.map(obs => (
              <div
                key={obs. id}
                className="obstacle"
                style={{
                  left: `${LANES[obs.lane]}%`,
                  top: `${obs.top}px`
                }}
              >
                {obs.emoji}
              </div>
            ))}
            
            {/* Collectibles */}
            {collectibles.map(col => (
              <div
                key={col.id}
                className="collectible"
                style={{
                  left:  `${LANES[col.lane]}%`,
                  top: `${col.top}px`
                }}
              >
                {col.emoji}
              </div>
            ))}
            
            {/* Traffic Lights */}
            {trafficLights.map(light => (
              <div
                key={light. id}
                className={`traffic-light ${light.state}`}
                style={{
                  left: `${LANES[light.lane]}%`,
                  top: `${light.top}px`
                }}
              >
                🚦
              </div>
            ))}
            
            {/* Police */}
            {policeOfficers.map(cop => (
              <div
                key={cop.id}
                className="police"
                style={{
                  left: `${LANES[cop.lane]}%`,
                  top: `${cop.top}px`
                }}
              >
                👮🚲
              </div>
            ))}
          </div>
          
          {/* Messages */}
          {conductorMessage && (
            <div className="conductor-message">{conductorMessage}</div>
          )}
          {passengerMessage && (
            <div className="passenger-message">{passengerMessage}</div>
          )}
          {policeMessage && (
            <div className="police-message">{policeMessage}</div>
          )}
          
          {/* Controls hint */}
          <div className="controls-hint">
            ← → Arrow Keys to move | SPACE to pause
          </div>
        </div>
      )}
      
      {/* PAUSED */}
      {gameState === GAME_STATES.PAUSED && (
        <div className="pause-overlay">
          <h2>⏸️ PAUSED</h2>
          <p>Press SPACE to continue</p>
        </div>
      )}
      
      {/* GAME OVER */}
      {gameState === GAME_STATES.GAME_OVER && (
        <div className="game-over-screen">
          <h1>Game Over!</h1>
          <div className="stats">
            <div className="stat-row">
              <span>Final Score: </span>
              <strong>{formatScore(score)}</strong>
            </div>
            <div className="stat-row">
              <span>Level Reached:</span>
              <strong>{level}</strong>
            </div>
            <div className="stat-row">
              <span>Passengers:</span>
              <strong>{passengers}</strong>
            </div>
            <div className="stat-row">
              <span>Money Earned:</span>
              <strong>KES {money}</strong>
            </div>
            <div className="stat-row">
              <span>High Score:</span>
              <strong>{formatScore(highScore)}</strong>
            </div>
          </div>
          
          {score >= highScore && score > 0 && (
            <div className="new-high-score">
              🎉 NEW HIGH SCORE!  🎉
            </div>
          )}
          
          <div className="buttons">
            <button 
              className="btn btn-primary"
              onClick={() => startGame(selectedMatatu, selectedRoute)}
            >
              PLAY AGAIN
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => setGameState(GAME_STATES. MENU)}
            >
              MAIN MENU
            </button>
          </div>
        </div>
      )}
      
      {/* POLICE STATION */}
      {gameState === GAME_STATES.POLICE_STATION && (
        <div className="police-station-screen">
          <h1>👮 Police Station</h1>
          <div className="police-dialogue">
            <p>{policeMessage}</p>
          </div>
          
          <div className="violation-info">
            <h3>Violation:  {violationType === 'redLight' ? 'Running Red Light' : 'Traffic Offense'}</h3>
            <p className="fine">Fine: KES 5,000</p>
          </div>
          
          <div className="buttons">
            <button 
              className="btn btn-danger"
              onClick={() => {
                setMoney(m => Math.max(0, m - 5000));
                setScore(s => Math.max(0, s - 100));
                setGameState(GAME_STATES. GAME_OVER);
              }}
            >
              PAY FINE
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => setGameState(GAME_STATES. GAME_OVER)}
            >
              GIVE UP
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;