/**
 * MA3 - Entry Point
 * Initialize React application
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Log game info
console.log('%c🚌 MA3 - Kenyan Matatu Game', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cTwende! Let\'s go!', 'color: #10b981; font-size: 16px;');
console.log('%cVersion: 1.0.0', 'color: #6b7280;');