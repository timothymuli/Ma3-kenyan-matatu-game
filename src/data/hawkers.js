/**
 * MA3 - Hawkers
 * Street hawkers at traffic lights
 */

export const HAWKER_TYPES = {
  MUKOMBERO: {
    emoji: "💊",
    item: "Mukombero",
    price: 50,
    pitch: "Power za kiume! ",
    spawnChance: 0.3
  },

  SWEETS: {
    emoji: "🍬",
    item: "Sweets",
    price:  5,
    pitch: "Masweets tamu!",
    spawnChance: 0.5
  },

  PEANUTS: {
    emoji: "🥜",
    item:  "Njugu",
    price: 10,
    pitch: "Karanga fresh!",
    spawnChance: 0.4
  },

  NEWSPAPER: {
    emoji: "📰",
    item: "Newspaper",
    price: 50,
    pitch: "Taifa leo!",
    spawnChance: 0.3
  },

  WATER:  {
    emoji: "💧",
    item: "Water",
    price: 20,
    pitch: "Maji baridi!",
    spawnChance: 0.6
  },

  TISSUES: {
    emoji: "🧻",
    item: "Tissue",
    price: 20,
    pitch: "Tissue mbili thao!",
    spawnChance: 0.4
  }
};

export const getHawkersByLocation = (location) => {
  // More hawkers in busy areas
  const busyAreas = ["CBD", "Ngong Road", "Thika Road"];
  const multiplier = busyAreas.includes(location) ? 1.5 : 1.0;

  return Object.values(HAWKER_TYPES).map(hawker => ({
    ...hawker,
    spawnChance: hawker.spawnChance * multiplier
  }));
};

export default { HAWKER_TYPES, getHawkersByLocation };