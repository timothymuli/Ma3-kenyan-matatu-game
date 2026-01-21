/**
 * MA3 - Police Stations
 * Real Nairobi police stations
 */

export const POLICE_STATIONS = {
  CENTRAL:  {
    name: "Central Police Station",
    location: "CBD",
    area: ["CBD", "River Road", "Ronald Ngala"],
    fine: { redLight: 5000, overloading: 10000, overlapping: 3000 }
  },

  INDUSTRIAL_AREA: {
    name:  "Industrial Area Police Station",
    location: "Industrial Area",
    area: ["Mombasa Road", "Nyayo Stadium", "South B", "South C", "Imara Daima"],
    fine: { redLight: 5000, overloading: 10000, overlapping: 3000, speeding: 20000 }
  },

  BURUBURU: {
    name:  "Buruburu Police Station",
    location: "Buruburu",
    area: ["Buruburu", "Umoja", "Donholm", "Embakasi", "Pipeline"],
    fine: { redLight: 4000, overloading: 8000, overlapping: 2500 }
  },

  LANGATA: {
    name: "Langata Police Station",
    location: "Langata",
    area: ["Langata", "Karen", "Ngong", "Rongai", "Kibera"],
    fine: { redLight: 5000, overloading: 10000, overlapping: 3000 }
  },

  KASARANI: {
    name: "Kasarani Police Station",
    location: "Kasarani",
    area: ["Kasarani", "Mwiki", "Githurai", "Kahawa"],
    fine: { redLight:  4500, overloading: 9000, overlapping: 2800 }
  },

  KILIMANI: {
    name:  "Kilimani Police Station",
    location: "Kilimani",
    area: ["Kilimani", "Westlands", "Lavington", "Parklands"],
    fine: { redLight:  6000, overloading: 12000, overlapping: 4000 }
  }
};

export const getPoliceStation = (location) => {
  const map = {
    "South B": POLICE_STATIONS. INDUSTRIAL_AREA,
    "South C": POLICE_STATIONS.INDUSTRIAL_AREA,
    "Nyayo":  POLICE_STATIONS.INDUSTRIAL_AREA,
    "Syokimau": POLICE_STATIONS.INDUSTRIAL_AREA,
    "Mlolongo": POLICE_STATIONS.INDUSTRIAL_AREA,
    
    "Umoja": POLICE_STATIONS. BURUBURU,
    "Donholm": POLICE_STATIONS. BURUBURU,
    "Embakasi": POLICE_STATIONS.BURUBURU,
    "Buruburu": POLICE_STATIONS.BURUBURU,
    
    "Karen": POLICE_STATIONS. LANGATA,
    "Ngong": POLICE_STATIONS. LANGATA,
    "Langata": POLICE_STATIONS. LANGATA,
    
    "Kasarani":  POLICE_STATIONS.KASARANI,
    "Githurai": POLICE_STATIONS. KASARANI,
    "Mwiki": POLICE_STATIONS.KASARANI,
    
    "Westlands": POLICE_STATIONS. KILIMANI,
    "Kilimani": POLICE_STATIONS.KILIMANI
  };

  return map[location] || POLICE_STATIONS. CENTRAL;
};

export default { POLICE_STATIONS, getPoliceStation };