/**
 * MA3 - Passenger Stages
 * Real matatu stages with passenger behavior
 */

export const STAGES = {
  // Jogoo Road stages
  OTC: {
    name: "OTC",
    location: "CBD",
    passengerCount: { min: 5, max: 15 },
    behavior: "aggressive", // Push to board
    destinations: ["Umoja", "Donholm", "Embakasi"]
  },

  MAKONGENI: {
    name: "Makongeni",
    location: "Jogoo Road",
    passengerCount: { min: 3, max: 10 },
    behavior: "normal",
    destinations: ["Umoja", "Buruburu"]
  },

  BURUBURU: {
    name: "Buruburu",
    location: "Buruburu",
    passengerCount: { min: 2, max: 8 },
    behavior: "calm",
    destinations: ["Town", "Umoja"]
  },

  // Ngong Road stages
  RAILWAYS: {
    name: "Railways",
    location: "CBD",
    passengerCount:  { min: 8, max: 20 },
    behavior: "very_aggressive",
    destinations: ["Karen", "Ngong", "Rongai"]
  },

  ADAMS: {
    name: "Adams Arcade",
    location: "Ngong Road",
    passengerCount: { min: 4, max: 12 },
    behavior: "normal",
    destinations: ["Town", "Karen"]
  },

  PRESTIGE: {
    name: "Prestige",
    location: "Ngong Road",
    passengerCount: { min: 3, max: 10 },
    behavior: "calm",
    destinations: ["Town", "Ngong"]
  },

  KAREN: {
    name:  "Karen",
    location: "Karen",
    passengerCount:  { min: 2, max:  6 },
    behavior: "calm",
    destinations: ["Town"]
  },

  // Thika Road stages
  AMBASSADEUR: {
    name: "Ambassadeur",
    location: "CBD",
    passengerCount:  { min: 10, max: 25 },
    behavior: "very_aggressive",
    destinations: ["Kasarani", "Githurai", "Ruiru", "Thika"]
  },

  KASARANI: {
    name:  "Kasarani",
    location: "Thika Road",
    passengerCount: { min: 5, max: 15 },
    behavior: "aggressive",
    destinations: ["Town", "Githurai"]
  },

  GITHURAI: {
    name: "Githurai 44",
    location: "Githurai",
    passengerCount: { min: 8, max: 20 },
    behavior: "very_aggressive",
    destinations: ["Town", "Thika"]
  },

  // Mombasa Road stages
  BUNYALA: {
    name: "Bunyala",
    location: "CBD",
    passengerCount:  { min: 6, max:  18 },
    behavior:  "aggressive",
    destinations: ["South B", "Syokimau", "Kitengela"]
  },

  SOUTH_B: {
    name:  "South B",
    location:  "South B",
    passengerCount: { min: 4, max: 10 },
    behavior: "normal",
    destinations: ["Town", "South C"]
  },

  GATEWAY: {
    name: "Gateway Mall",
    location: "Mombasa Road",
    passengerCount: { min: 5, max: 12 },
    behavior: "normal",
    destinations: ["Town", "Syokimau"]
  }
};

export const PASSENGER_BEHAVIORS = {
  very_aggressive: {
    boardingSpeed: 0.5, // seconds per passenger
    pushiness: 0.9,
    complainChance: 0.3,
    fakeMpesaChance: 0.15
  },
  aggressive: {
    boardingSpeed: 0.8,
    pushiness: 0.7,
    complainChance: 0.2,
    fakeMpesaChance: 0.1
  },
  normal: {
    boardingSpeed: 1.0,
    pushiness: 0.5,
    complainChance: 0.1,
    fakeMpesaChance: 0.05
  },
  calm: {
    boardingSpeed: 1.5,
    pushiness: 0.2,
    complainChance: 0.05,
    fakeMpesaChance: 0.02
  }
};

export default { STAGES, PASSENGER_BEHAVIORS };