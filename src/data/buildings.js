/**
 * MA3 - Buildings & Environment
 * Location-appropriate buildings
 */

export const BUILDINGS = {
  CBD: [
    { emoji: "🏢", name:  "Office Tower", height: "tall" },
    { emoji: "🏬", name: "Shopping Mall", height: "medium" },
    { emoji: "🏪", name: "Shop", height: "small" },
    { emoji: "🏦", name: "Bank", height:  "medium" }
  ],

  UPMARKET: [
    { emoji:  "🏘️", name: "Apartments", height: "tall" },
    { emoji: "🏡", name: "Bungalow", height: "small" },
    { emoji: "🏪", name: "Supermarket", height: "small" },
    { emoji: "🌳", name: "Trees", height: "medium" }
  ],

  MIDDLE_CLASS: [
    { emoji: "🏘️", name: "Flats", height: "medium" },
    { emoji: "🏠", name: "Houses", height: "small" },
    { emoji: "🏪", name: "Duka", height: "small" },
    { emoji: "⛽", name: "Petrol Station", height: "small" }
  ],

  LOW_INCOME: [
    { emoji: "🏚️", name: "Mabati Houses", height: "small" },
    { emoji: "🏪", name: "Kiosk", height: "tiny" },
    { emoji: "🌳", name: "Trees", height: "small" }
  ],

  INDUSTRIAL: [
    { emoji: "🏭", name: "Factory", height: "tall" },
    { emoji: "🏗️", name: "Warehouse", height: "medium" },
    { emoji: "🚛", name: "Trucks", height: "small" }
  ]
};

export const getBuildingsByArea = (area) => {
  const map = {
    "CBD":  BUILDINGS.CBD,
    "Westlands": BUILDINGS.UPMARKET,
    "Kilimani": BUILDINGS.UPMARKET,
    "Karen":  BUILDINGS.UPMARKET,
    "South B": BUILDINGS.MIDDLE_CLASS,
    "Buruburu": BUILDINGS.MIDDLE_CLASS,
    "Kasarani": BUILDINGS.MIDDLE_CLASS,
    "Umoja": BUILDINGS.LOW_INCOME,
    "Embakasi": BUILDINGS.LOW_INCOME,
    "Kawangware": BUILDINGS.LOW_INCOME,
    "Industrial Area": BUILDINGS.INDUSTRIAL
  };

  return map[area] || BUILDINGS.MIDDLE_CLASS;
};

export default { BUILDINGS, getBuildingsByArea };