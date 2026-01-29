import React, { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import MainMenu from './components/MainMenu';
import IntroVideo from './components/IntroVideo';
import MatatuSelect from './components/MatatuSelect';
import Game3D from './game3d/components/Game3D';
import { MATATUS } from './data/matatus';
import './App.css';

function App() {
  const [gameState, setGameState] = useState('loading'); // loading → main-menu → select → playing
  const [selectedMatatu, setSelectedMatatu] = useState(null);

  const handleLoadComplete = () => {
    setGameState('main-menu');
  };

  const handleStartGame = () => {
    setGameState('select');
  };

  const handleMatatuSelect = (matatu) => {
    setSelectedMatatu(matatu);
    setGameState('playing');
  };

  const handleExit = () => {
    setGameState('main-menu');
    setSelectedMatatu(null);
  };

  return (
    <div className="App">
      {gameState === 'loading' && (
        <LoadingScreen onLoadComplete={handleLoadComplete} />
      )}
      
      {gameState === 'main-menu' && (
        <MainMenu 
          onStartGame={handleStartGame}
          onOpenGarage={() => alert('Garage coming soon!')}
          onOpenLeaderboard={() => alert('Leaderboard coming soon!')}
        />
      )}
      
      {gameState === 'select' && (
        <MatatuSelect 
          matatus={MATATUS} 
          onSelect={handleMatatuSelect} 
        />
      )}
      
      {gameState === 'playing' && selectedMatatu && (
        <Game3D 
          selectedMatatu={selectedMatatu} 
          onExit={handleExit} 
        />
      )}
    </div>
  );
}

export default App;