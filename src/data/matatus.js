/**
 * MA3 - Matatu SACCOs
 * Real Kenyan matatus with routes
 */

export const MATATUS = {
  EMBAKASI_NGANYA: {
    id: "embakasi_nganya",
    name: "Embakasi Nganya",
    route: "CBD → Embakasi → Umoja",
    stages: ["Nation", "Makadara", "Donholm", "Umoja", "Embakasi"],
    emoji: "🚌",
    color: "#FF1493",
    type: "nganya",
    speed: 1.3,
    capacity: 14,
    fare: { cbd_embakasi: 50, cbd_umoja: 40 },
    features: ["Loud Music", "LED Lights", "Graffiti"]
  },

  SUPER_METRO: {
    id: "super_metro",
    name: "Super Metro",
    route: "CBD → Thika Road → Ruiru → Thika",
    stages: ["Ambassadeur", "Roysambu", "Githurai", "Ruiru", "Thika"],
    emoji:  "🚍",
    color: "#0000FF",
    type: "premium",
    speed: 1.0,
    capacity: 51,
    fare: { cbd_thika: 100, cbd_ruiru: 70 },
    features: ["WiFi", "M-PESA", "CCTV", "AC"]
  },

  KBS:  {
    id: "kbs",
    name: "KBS",
    route: "CBD → Jogoo Road → Komarock",
    stages: ["OTC", "Jogoo Road", "Makongeni", "Komarock"],
    emoji: "🚌",
    color: "#FF0000",
    type: "classic",
    speed: 0.9,
    capacity: 62,
    fare: { cbd_komarock: 40 },
    features: ["Affordable", "Reliable"]
  },

  COUNTY_LINK: {
    id: "county_link",
    name: "County Link",
    route: "CBD → Mombasa Road → Katani",
    stages: ["Bunyala", "Gateway", "Syokimau", "Katani"],
    emoji: "🚍",
    color: "#4169E1",
    type: "premium",
    speed: 1.1,
    capacity: 33,
    fare: { cbd_katani: 80, cbd_syokimau: 60 },
    features: ["Cashless", "CCTV", "Clean"]
  },

  NGONG_NGANYA: {
    id: "ngong_nganya",
    name: "Ngong Nganya",
    route: "CBD → Ngong Road → Karen → Ngong",
    stages:  ["Railways", "Adams", "Prestige", "Karen", "Ngong"],
    emoji: "🚐",
    color: "#FF4500",
    type: "nganya",
    speed: 1.2,
    capacity: 14,
    fare: { cbd_ngong: 60, cbd_karen: 50 },
    features: ["Graffiti", "Music", "Fast"]
  }
};

export const MATATU_DESIGNS = {
  nganya: {
    style: "graffiti",
    colors: ["#FF1493", "#00FF00", "#FF4500"],
    features: ["loud_music", "led_lights", "graffiti"]
  },
  premium: {
    style:  "modern",
    colors: ["#0000FF", "#4169E1"],
    features: ["wifi", "usb_charging", "cctv"]
  },
  classic: {
    style: "traditional",
    colors: ["#FF0000", "#FFD700"],
    features: ["basic_comfort", "affordable"]
  }
};

export const PLAYER_MATATUS = [
  MATATUS.EMBAKASI_NGANYA,
  MATATUS.SUPER_METRO,
  MATATUS.KBS,
  MATATUS.COUNTY_LINK,
  MATATUS.NGONG_NGANYA
];

export default { MATATUS, MATATU_DESIGNS, PLAYER_MATATUS };