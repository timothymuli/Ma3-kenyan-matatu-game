// REAL NAIROBI MATATUS & NGANYAS - COMPLETE LIST 2024/2025
export const MATATUS = [
  
  // ===== NGONG ROAD NGANYAS =====
  {
    id: 'matrix',
    name: 'MATRIX',
    type: 'nganya',
    routeNumber: '46',
    route: 'CBD - Adams - Karen - Ngong',
    routeId: 'ngong_road',
    sacco: 'Ngong Road Operators',
    visual: {
      primaryColor: '#0066FF',
      secondaryColor: '#00FF00',
      tertiaryColor: '#FFFFFF',
      pattern: 'graffiti-wild',
      ledLights: true,
      rimColor: 'chrome'
    },
    specs: { speed: 1.3, capacity: 14, fare: 60, handling: 'sharp' },
    famous: true,
    description: 'Legendary blue nganya dominating Ngong Road nights'
  },
  
  {
    id: 'opposite',
    name: 'OPPOSITE',
    type: 'nganya',
    routeNumber: '46',
    route: 'CBD - Adams - Karen - Ronga - Ngong',
    routeId: 'ngong_road',
    sacco: 'Ngong Road Operators',
    visual: {
      primaryColor: '#FF4500',
      secondaryColor: '#FFD700',
      tertiaryColor: '#000000',
      pattern: 'flames',
      ledLights: true,
      rimColor: 'gold'
    },
    specs: { speed: 1.25, capacity: 14, fare: 60, handling: 'aggressive' },
    famous: true,
    description: 'Orange rival to Matrix, famous for speed'
  },
  
  // ===== JOGOO ROAD / EASTLANDS NGANYAS =====
  {
    id: 'umoja_express',
    name: 'UMOJA EXPRESS',
    type: 'nganya',
    routeNumber: '58',
    route: 'CBD - Makongeni - Buruburu - Umoja - Embakasi',
    routeId: 'jogoo_road',
    sacco: 'Embakasi Route Operators',
    visual: {
      primaryColor: '#FF1493',
      secondaryColor: '#00FF00',
      tertiaryColor: '#9932CC',
      pattern: 'graffiti-bubble',
      ledLights: true,
      rimColor: 'pink'
    },
    specs: { speed: 1.4, capacity: 14, fare: 50, handling: 'wild' },
    famous: true,
    description: 'Loudest, fastest nganya in Eastlands'
  },
  
  {
    id: 'embakasi_finest',
    name: 'EMBAKASI FINEST',
    type: 'nganya',
    routeNumber: '58',
    route: 'CBD - OTC - Buruburu - Embakasi',
    routeId: 'jogoo_road',
    sacco: 'Embakasi Operators',
    visual: {
      primaryColor: '#FF6600',
      secondaryColor: '#FFFF00',
      tertiaryColor: '#FF0000',
      pattern: 'flames-tribal',
      ledLights: true,
      rimColor: 'orange'
    },
    specs: { speed: 1.35, capacity: 14, fare: 50, handling: 'aggressive' },
    famous: true,
    description: 'Fire-themed Embakasi route nganya'
  },
  
  // ===== THIKA ROAD MATATUS =====
  {
    id: 'githurai_45',
    name: 'GITHURAI 45',
    type: 'nganya',
    routeNumber: '45',
    route: 'CBD - Roysambu - Kasarani - Githurai 45',
    routeId: 'thika_road',
    sacco: 'Githurai Route Operators',
    visual: {
      primaryColor: '#FF0000',
      secondaryColor: '#00FF00',
      tertiaryColor: '#0000FF',
      pattern: 'graffiti-mixed',
      ledLights: true,
      rimColor: 'red'
    },
    specs: { speed: 1.35, capacity: 14, fare: 70, handling: 'aggressive' },
    famous: true,
    description: 'Fast Githurai route nganya'
  },
  
  {
    id: 'super_metro',
    name: 'SUPER METRO',
    type: 'premium_bus',
    routeNumber: '237',
    route: 'CBD - Garden City - Roysambu - Thika',
    routeId: 'thika_road',
    sacco: 'Super Metro',
    visual: {
      primaryColor: '#0047AB',
      secondaryColor: '#FFFFFF',
      tertiaryColor: '#C0C0C0',
      pattern: 'corporate-clean',
      ledLights: false,
      rimColor: 'silver'
    },
    specs: { speed: 1.0, capacity: 33, fare: 100, handling: 'stable' },
    famous: true,
    description: 'Premium bus with WiFi and AC'
  },
  
  // ===== MOMBASA ROAD MATATUS =====
  {
    id: 'forward_travellers',
    name: 'FORWARD TRAVELLERS',
    type: 'sacco_matatu',
    routeNumber: '125',
    route: 'CBD - South B - South C - Imara Daima',
    routeId: 'mombasa_road',
    sacco: 'Forward Travellers SACCO',
    visual: {
      primaryColor: '#FFFF00',
      secondaryColor: '#000000',
      tertiaryColor: '#FF0000',
      pattern: 'stripes-bold',
      ledLights: false,
      rimColor: 'black'
    },
    specs: { speed: 1.1, capacity: 14, fare: 80, handling: 'steady' },
    famous: true,
    description: 'Yellow matatus dominating South'
  },
  
  // ===== CLASSIC BUSES =====
  {
    id: 'kbs',
    name: 'KBS',
    type: 'classic_bus',
    routeNumber: 'Various',
    route: 'Multiple Routes (Primarily Jogoo Road)',
    routeId: 'jogoo_road',
    sacco: 'Kenya Bus Service',
    visual: {
      primaryColor: '#DC143C',
      secondaryColor: '#FFD700',
      tertiaryColor: '#FFFFFF',
      pattern: 'classic',
      ledLights: false,
      rimColor: 'silver'
    },
    specs: { speed: 0.85, capacity: 49, fare: 40, handling: 'heavy' },
    famous: true,
    description: 'Iconic red buses since 1934'
  }
];

// Helper functions
export const getFamousNganyas = () => MATATUS.filter(m => m.famous);
export const getNganyasByRoute = (routeId) => MATATUS.filter(m => m.routeId === routeId);
export const getMatatuById = (id) => MATATUS.find(m => m.id === id);