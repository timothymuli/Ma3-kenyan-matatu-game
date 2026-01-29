import React, { useState, useEffect } from 'react';
import './RadioPlayer.css';
import { KENYAN_FM_STATIONS, getAllMatatuSongs } from '../data/matatuMusicReal';

const RadioPlayer = ({ isPlaying, onToggle }) => {
  const [currentStation, setCurrentStation] = useState(KENYAN_FM_STATIONS[1]); // Homeboyz by default
  const [currentSong, setCurrentSong] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  
  useEffect(() => {
    // Simulate changing songs
    const interval = setInterval(() => {
      const allSongs = getAllMatatuSongs();
      setCurrentSong(allSongs[Math.floor(Math.random() * allSongs.length)]);
    }, 180000); // Change every 3 minutes
    
    // Set initial song
    const allSongs = getAllMatatuSongs();
    setCurrentSong(allSongs[Math.floor(Math.random() * allSongs.length)]);
    
    return () => clearInterval(interval);
  }, []);
  
  const changeStation = () => {
    const currentIndex = KENYAN_FM_STATIONS.indexOf(currentStation);
    const nextIndex = (currentIndex + 1) % KENYAN_FM_STATIONS.length;
    setCurrentStation(KENYAN_FM_STATIONS[nextIndex]);
  };
  
  return (
    <div className={`radio-player ${isExpanded ? 'expanded' : ''}`}>
      <div className="radio-header" onClick={() => setIsExpanded(!isExpanded)}>
        <span className="radio-icon">📻</span>
        <div className="station-info">
          <div className="station-name">{currentStation.name}</div>
          <div className="station-frequency">{currentStation.frequency}</div>
        </div>
        <button className="expand-btn">{isExpanded ? '▼' : '▲'}</button>
      </div>
      
      {isExpanded && (
        <div className="radio-body">
          <div className="now-playing">
            <div className="music-bars">
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
            <div className="song-info">
              <div className="song-title">{currentSong?.title || 'Loading...'}</div>
              <div className="song-artist">{currentSong?.artist || '...'}</div>
            </div>
          </div>
          
          <div className="radio-controls">
            <button className="control-btn" onClick={changeStation}>
              🔀 CHANGE STATION
            </button>
            <button className="control-btn" onClick={onToggle}>
              {isPlaying ? '⏸️ PAUSE' : '▶️ PLAY'}
            </button>
          </div>
          
          <div className="station-tagline">
            {currentStation.tagline}
          </div>
        </div>
      )}
    </div>
  );
};

export default RadioPlayer;
