/**
 * MA3 - Game Constants
 * All configuration values
 */

// Lanes (3 lanes)
export const LANES = [16.66, 50, 83.33]; // Percentage positions
export const LANE_COUNT = 3;

// Game timing
export const GAME_FPS = 60;
export const FRAME_DURATION = 1000 / GAME_FPS;

// Speeds
export const BASE_SPEED = 6;
export const SPEED_INCREASE_PER_LEVEL = 0.3;
export const MAX_SPEED = 18;

// Spawn rates (ms)
export const OBSTACLE_SPAWN_RATE = 800;
export const PASSENGER_SPAWN_RATE = 5000;
export const HAWKER_SPAWN_RATE = 15000;
export const POLICE_SPAWN_RATE = 20000;

// Collision
export const COLLISION_THRESHOLD = 40;

// Scoring
export const POINTS_PER_SECOND = 1;
export const PASSENGER_POINTS = 10;
export const MPESA_POINTS = 5;
export const FULL_MATATU_BONUS = 100;

// Traffic lights
export const TRAFFIC_LIGHT_DURATION = {
  GREEN: 8000,   // 8 seconds
  YELLOW: 2000,  // 2 seconds
  RED: 10000     // 10 seconds
};

// Police
export const POLICE_CATCH_DISTANCE = 100;
export const POLICE_SPEED_MULTIPLIER = 1.3;

// Sizes
export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 600;

// Game states
export const GAME_STATES = {
  MENU:  'menu',
  MATATU_SELECT: 'matatuSelect',
  ROUTE_SELECT: 'routeSelect',
  PLAYING: 'playing',
  PAUSED: 'paused',
  GAME_OVER: 'gameOver',
  POLICE_STATION: 'policeStation',
  HOW_TO_PLAY: 'howToPlay'
};

// Storage keys
export const STORAGE_KEYS = {
  HIGH_SCORE: 'ma3HighScore',
  TOTAL_GAMES: 'ma3TotalGames',
  TOTAL_PASSENGERS: 'ma3TotalPassengers',
  TOTAL_EARNINGS: 'ma3TotalEarnings'
};

// Keyboard
export const KEYS = {
  LEFT: ['ArrowLeft', 'a', 'A'],
  RIGHT: ['ArrowRight', 'd', 'D'],
  PAUSE: [' ', 'p', 'P'],
  ENTER: ['Enter']
};

export default {
  LANES,
  GAME_FPS,
  BASE_SPEED,
  GAME_STATES,
  STORAGE_KEYS,
  KEYS
};