/**
 * MA3 - KENYAN MATATU GAME
 * Main Application Component
 * Supports both 2D Classic and 3D Simulator modes
 */

import React, { useState } from 'react';
import './App.css';

// 3D Game Components
import Game3D from './game3d/components/Game3D';

// Shared Components
import MatatuSelect from './components/MatatuSelect';
import IntroVideo from './components/IntroVideo';

// Data
import { MATATUS } from './data/matatus';

// Game modes
const GAME_MODES = {
  MODE_2D: '2D_CLASSIC',
  MODE_3D: '3D_SIMULATOR'
};

// Game states
const GAME_STATES = {
  INTRO: 'INTRO',
  MENU: 'MENU',
  MODE_SELECT: 'MODE_SELECT',
  MATATU_SELECT: 'MATATU_SELECT',
  PLAYING_3D: 'PLAYING_3D'
};

function App() {
  const [gameState, setGameState] = useState(GAME_STATES.INTRO);
  const [gameMode, setGameMode] = useState(null);
  const [selectedMatatu, setSelectedMatatu] = useState(null);
  const [highScore, setHighScore] = useState(0);

  const startGame = (matatu) => {
    console.log('🎮 Starting game with:', matatu.name);
    console.log('🎮 Game mode:', gameMode);
    
    setSelectedMatatu(matatu);
    
    if (gameMode === GAME_MODES.MODE_3D) {
      setGameState(GAME_STATES.PLAYING_3D);
    }
  };

  const exitToMenu = () => {
    setGameState(GAME_STATES.MENU);
    setSelectedMatatu(null);
    setGameMode(null);
  };

  const selectMode = (mode) => {
    setGameMode(mode);
    setGameState(GAME_STATES.MATATU_SELECT);
  };

  return (
    <div className="app">
      
      {/* ===== INTRO VIDEO ===== */}
      {gameState === GAME_STATES.INTRO && (
        <IntroVideo 
          onComplete={() => setGameState(GAME_STATES.MENU)} 
        />
      )}

      {/* ===== MAIN MENU ===== */}
      {gameState === GAME_STATES.MENU && (
        <div className="menu-screen">
          <div className="menu-container">
            <h1 className="game-title">MA3</h1>
            <p className="game-subtitle">The Real Kenyan Matatu Experience</p>
            
            <div className="game-modes">
              <div className="mode-badge mode-3d">
                🎮 3D RACING SIMULATOR 🎮
              </div>
              <div className="mode-features">
                <span>✓ Real 3D Graphics</span>
                <span>✓ Realistic Physics</span>
                <span>✓ Open World Nairobi</span>
              </div>
            </div>
            
            <div className="menu-buttons">
              <button 
                className="btn btn-primary btn-large btn-3d"
                onClick={() => selectMode(GAME_MODES.MODE_3D)}
              >
                🚗 START 3D GAME
              </button>
              
              <button 
                className="btn btn-secondary"
                onClick={() => setGameState(GAME_STATES.MODE_SELECT)}
              >
                📖 HOW TO PLAY
              </button>
            </div>
            
            <div className="high-score-display">
              <span>HIGH SCORE</span>
              <strong>{highScore.toLocaleString()}</strong>
            </div>
            
            <div className="credits">
              <p>🇰🇪 Authentic Kenyan Matatu Culture 🇰🇪</p>
              <p>Real Routes • Real Nganyas • Real Sheng • Real Music</p>
              <p className="tech-stack">
                Built with <strong>Three.js</strong> • <strong>Cannon.js</strong> • <strong>React</strong>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ===== MATATU SELECTION ===== */}
      {gameState === GAME_STATES.MATATU_SELECT && (
        <div className="matatu-select-wrapper">
          <button 
            className="back-button"
            onClick={() => setGameState(GAME_STATES.MENU)}
          >
            ← BACK TO MENU
          </button>
          <MatatuSelect onSelect={startGame} />
        </div>
      )}

      {/* ===== 3D GAME ===== */}
      {gameState === GAME_STATES.PLAYING_3D && selectedMatatu && (
        <Game3D 
          selectedMatatu={selectedMatatu}
          onExit={exitToMenu}
        />
      )}
      
    </div>
  );
}
export default App;
