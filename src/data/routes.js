/**
 * MA3 - Nairobi Routes
 * Real routes with traffic lights
 */

export const ROUTES = {
  JOGOO_ROAD: {
    id: "jogoo_road",
    name: "Jogoo Road",
    distance: 12,
    difficulty: "easy",
    trafficLights: [
      { position: 200, location: "Nation" },
      { position: 500, location: "Makongeni" },
      { position:  800, location: "Buruburu" }
    ],
    stages: [
      { name: "OTC", position: 100 },
      { name: "Makongeni", position: 400 },
      { name: "Buruburu", position: 700 },
      { name: "Umoja", position: 1000 }
    ],
    policeCheckpoints: [
      { position: 600, type: "regular" }
    ],
    speedBumps: [
      { position: 300 },
      { position: 900 }
    ]
  },

  NGONG_ROAD: {
    id: "ngong_road",
    name: "Ngong Road",
    distance: 18,
    difficulty: "medium",
    trafficLights: [
      { position: 150, location: "Railways" },
      { position: 400, location: "Nairobi West" },
      { position: 700, location: "Adams" },
      { position: 1000, location: "Prestige" },
      { position: 1400, location: "Karen" }
    ],
    stages: [
      { name: "Railways", position: 150 },
      { name: "Adams", position: 650 },
      { name: "Prestige", position: 950 },
      { name: "Karen", position: 1350 }
    ],
    policeCheckpoints: [
      { position: 500, type: "bicycle" },
      { position: 1200, type: "regular" }
    ],
    speedBumps: [
      { position: 250 },
      { position:  850 },
      { position: 1150 }
    ]
  },

  THIKA_ROAD: {
    id: "thika_road",
    name: "Thika Road (Superhighway)",
    distance: 30,
    difficulty: "hard",
    trafficLights:  [
      { position: 200, location: "Ambassadeur" },
      { position: 600, location: "Kasarani" },
      { position: 1200, location: "Githurai" }
    ],
    stages: [
      { name: "Ambassadeur", position: 200 },
      { name: "Roysambu", position: 500 },
      { name: "Kasarani", position: 800 },
      { name: "Githurai 44", position: 1100 }
    ],
    policeCheckpoints: [
      { position: 400, type: "regular" },
      { position: 1000, type: "regular" }
    ],
    speedBumps: []
  },

  MOMBASA_ROAD: {
    id: "mombasa_road",
    name: "Mombasa Road",
    distance: 25,
    difficulty:  "hard",
    trafficLights:  [
      { position: 300, location: "Bunyala" },
      { position: 700, location: "Nyayo" },
      { position: 1100, location: "Gateway" }
    ],
    stages: [
      { name: "Bunyala", position: 300 },
      { name:  "South B", position: 500 },
      { name: "Gateway", position: 1000 },
      { name:  "Syokimau", position: 1400 }
    ],
    policeCheckpoints:  [
      { position: 600, type: "regular" },
      { position: 1300, type: "bicycle" }
    ],
    speedBumps: [
      { position: 450 }
    ],
    expressway: {
      entry: 400,
      exit: 1600,
      toll: 100,
      speedBonus: 1.5
    }
  }
};

export const DEFAULT_ROUTE = ROUTES.JOGOO_ROAD;

export default { ROUTES, DEFAULT_ROUTE };