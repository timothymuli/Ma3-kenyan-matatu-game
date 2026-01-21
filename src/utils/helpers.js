/**
 * MA3 - Helper Functions
 * Utility functions
 */

export const getRandomLane = () => {
  return Math.floor(Math.random() * 3);
};

export const getRandomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const checkCollision = (obj1, obj2, threshold = 40) => {
  const sameLane = obj1.lane === obj2.lane;
  const verticalDistance = Math.abs(obj1.top - obj2.top);
  return sameLane && verticalDistance < threshold;
};

export const formatScore = (score) => {
  return Math.floor(score).toString().padStart(6, '0');
};

export const formatMoney = (amount) => {
  return `KES ${amount.toLocaleString()}`;
};

export const getLevelFromScore = (score) => {
  return Math.floor(score / 500) + 1;
};

export const calculateSpeed = (level, baseSpeed = 6) => {
  return Math.min(baseSpeed + (level * 0.3), 18);
};

export const playSound = (soundName) => {
  // Placeholder for sound system
  if (process.env.NODE_ENV === 'development') {
    console.log(`🔊 ${soundName}`);
  }
};

export const vibrate = (duration = 50) => {
  if ('vibrate' in navigator) {
    navigator.vibrate(duration);
  }
};

export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export default {
  getRandomLane,
  getRandomItem,
  checkCollision,
  formatScore,
  formatMoney,
  getLevelFromScore,
  calculateSpeed,
  playSound,
  vibrate,
  generateId
};