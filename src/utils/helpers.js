// HELPER FUNCTIONS
export const getRandomLane = () => Math.floor(Math.random() * 3);

export const getRandomItem = (array) => {
  if (!array || array.length === 0) return null;
  return array[Math.floor(Math.random() * array.length)];
};

export const checkCollision = (obj1, obj2, threshold = 50) => {
  if (!obj1 || !obj2) return false;
  if (obj1.lane !== obj2.lane) return false;
  
  const distance = Math.abs(obj1.top - obj2.top);
  return distance < threshold;
};

export const formatScore = (score) => {
  return String(Math.floor(score)).padStart(6, '0');
};

export const formatMoney = (amount) => {
  return `KES ${amount.toLocaleString()}`;
};

export const getLevelFromScore = (score) => {
  return Math.floor(score / 500) + 1;
};

export const getSpeedForLevel = (level, baseSpeed = 5) => {
  return baseSpeed + (level - 1) * 0.5;
};

export const calculateFine = (violation, station) => {
  const baseFines = {
    redLight: 4000,
    speeding: 5000,
    overlapping: 3000,
    overloading: 10000
  };
  
  const stationMultiplier = {
    central: 1.5,
    industrial_area: 1.3,
    langata: 1.2,
    buruburu: 1.0
  };
  
  const base = baseFines[violation] || 3000;
  const multiplier = stationMultiplier[station] || 1.0;
  
  return Math.floor(base * multiplier);
};

export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

export const lerp = (start, end, factor) => {
  return start + (end - start) * factor;
};

export const getHighScore = () => {
  return parseInt(localStorage.getItem('ma3HighScore')) || 0;
};

export const saveHighScore = (score) => {
  const current = getHighScore();
  if (score > current) {
    localStorage.setItem('ma3HighScore', score);
    return true;
  }
  return false;
};

export const getTotalGamesPlayed = () => {
  return parseInt(localStorage.getItem('ma3GamesPlayed')) || 0;
};

export const incrementGamesPlayed = () => {
  const total = getTotalGamesPlayed() + 1;
  localStorage.setItem('ma3GamesPlayed', total);
  return total;
};

export default {
  getRandomLane,
  getRandomItem,
  checkCollision,
  formatScore,
  formatMoney,
  getLevelFromScore,
  getSpeedForLevel,
  calculateFine,
  generateId,
  clamp,
  lerp,
  getHighScore,
  saveHighScore,
  getTotalGamesPlayed,
  incrementGamesPlayed
};