/**
 * MA3 - Private Cars
 * Location-based car distribution
 */

export const CARS = {
  // Common cars (everywhere)
  COMMON: [
    { emoji: "🚗", name:  "Toyota Corolla", probability: 0.3 },
    { emoji: "🚙", name: "Nissan Note", probability: 0.25 },
    { emoji: "🚕", name: "Taxi", probability: 0.15 }
  ],

  // Middle class areas
  MIDDLE_CLASS: [
    { emoji: "🚙", name: "Toyota Harrier", probability: 0.4 },
    { emoji: "🚗", name: "Mazda Demio", probability: 0.2 },
    { emoji: "🚙", name: "Nissan X-Trail", probability: 0.15 }
  ],

  // Upmarket areas (Kilimani, Westlands, Karen)
  UPMARKET: [
    { emoji: "🚙", name: "Toyota Prado", probability: 0.25 },
    { emoji: "🚗", name: "Lexus", probability: 0.2 },
    { emoji: "🚙", name: "Mercedes GLE", probability: 0.15 },
    { emoji: "🚗", name: "Audi", probability: 0.15 },
    { emoji: "🚙", name: "Range Rover", probability: 0.1 }
  ],

  // Loud cars (30% chance in any area)
  LOUD: [
    { emoji: "🏎️", name: "Subaru WRX", probability: 0.5, sound: "LOUD" },
    { emoji:  "🏎️", name: "Golf GTI", probability: 0.5, sound: "LOUD" }
  ],

  // Commercial vehicles
  COMMERCIAL: [
    { emoji: "🚚", name: "Delivery Truck", probability: 0.4 },
    { emoji: "🚐", name: "Probox", probability: 0.3 },
    { emoji: "🚛", name: "Trailer", probability: 0.1 }
  ],

  // Boda Bodas (everywhere)
  BODA: [
    { emoji: "🏍️", name: "Boda Boda", probability: 1.0, speed: 1.5 }
  ]
};

export const getCarsByLocation = (location) => {
  const upmarketAreas = ["Westlands", "Kilimani", "Karen", "Lavington", "Runda"];
  const middleClassAreas = ["South B", "South C", "Buruburu", "Kasarani"];
  
  if (upmarketAreas.includes(location)) {
    return [...CARS.UPMARKET, ... CARS.COMMON];
  } else if (middleClassAreas.includes(location)) {
    return [...CARS.MIDDLE_CLASS, ...CARS.COMMON];
  } else {
    return CARS.COMMON;
  }
};

export const OBSTACLE_VEHICLES = [
  { emoji: "🚗", type: "car", speed: 1.0 },
  { emoji: "🚕", type: "taxi", speed: 1.1 },
  { emoji: "🏍️", type: "boda", speed: 1.5 },
  { emoji: "🚙", type: "suv", speed: 0.9 },
  { emoji: "🚐", type: "matatu", speed: 1.2 },
  { emoji: "🚚", type: "truck", speed: 0.7 },
  { emoji: "🚌", type: "bus", speed:  0.8 }
];

export default { CARS, getCarsByLocation, OBSTACLE_VEHICLES };