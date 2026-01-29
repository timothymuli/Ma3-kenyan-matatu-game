// REAL NAIROBI ROUTES - COMPLETE 2024/2025
export const ROUTES = {
  ngong_road: {
    id: 'ngong_road',
    name: 'Ngong Road',
    routeNumber: '46',
    description: 'CBD → Adams Arcade → Prestige → Karen → Ngong',
    
    stages: [
      { name: 'CBD', location: 'Railways Bus Station', km: 0, landmark: 'Railways' },
      { name: 'Kilimani', location: 'Yaya Centre', km: 2.5, landmark: 'Yaya Centre' },
      { name: 'Adams Arcade', location: 'Adams Arcade Roundabout', km: 3.5, landmark: 'Naivas' },
      { name: 'Prestige', location: 'Prestige Plaza', km: 5.2, landmark: 'Prestige Mall' },
      { name: 'T-Mall', location: 'Junction/T-Mall', km: 7.8, landmark: 'Junction Mall' },
      { name: 'Karen', location: 'Karen Shopping Centre', km: 12.0, landmark: 'Karen Blixen' },
      { name: 'Ngong', location: 'Ngong Town', km: 20.0, landmark: 'Ngong Hills' }
    ],
    
    environment: {
      roadType: 'Tarmac, tree-lined',
      traffic: 'Heavy peak hours',
      area: 'Affluent suburbs, expat areas',
      buildings: ['High-rise apartments', 'Shopping malls', 'Gated communities'],
      landmarks: ['Adams Arcade', 'Karen Blixen Museum', 'Ngong Racecourse']
    },
    
    hasTrafficLights: true,
    trafficLightLocations: ['Adams Arcade', 'Prestige Plaza'],
    policeStation: 'langata',
    difficulty: 'Medium',
    
    obstacles: {
      privateCarsDensity: 'very-high',
      taxisDensity: 'high',
      bodaBodaDensity: 'medium',
      trucksDensity: 'low'
    }
  },
  
  jogoo_road: {
    id: 'jogoo_road',
    name: 'Jogoo Road',
    routeNumber: '58',
    description: 'CBD → OTC → Makongeni → Buruburu → Umoja → Donholm → Embakasi',
    
    stages: [
      { name: 'CBD', location: 'OTC (Old Tusker Club)', km: 0, landmark: 'Nation Centre' },
      { name: 'Makongeni', location: 'Makongeni Estate', km: 2.5, landmark: 'Makongeni Shops' },
      { name: 'Kaloleni', location: 'Kaloleni Social Hall', km: 3.8, landmark: 'Social Hall' },
      { name: 'Buruburu', location: 'Buruburu Phase 4', km: 5.5, landmark: 'Buruburu Mall' },
      { name: 'Umoja', location: 'Umoja Estate', km: 7.2, landmark: 'Umoja Market' },
      { name: 'Donholm', location: 'Donholm Phase 8', km: 9.0, landmark: 'Donholm Shops' },
      { name: 'Embakasi', location: 'Embakasi Village', km: 12.0, landmark: 'Embakasi Market' }
    ],
    
    environment: {
      roadType: 'Narrow tarmac, potholed sections',
      traffic: 'Very heavy all day',
      area: 'Densely populated Eastlands',
      buildings: ['Apartment blocks', 'Estates', 'Small shops', 'Churches'],
      landmarks: ['OTC', 'Buruburu Shopping Centre', 'City Stadium', 'Umoja Market']
    },
    
    hasTrafficLights: false,
    trafficLightLocations: [],
    policeStation: 'buruburu',
    difficulty: 'Hard',
    
    obstacles: {
      privateCarsDensity: 'high',
      taxisDensity: 'medium',
      bodaBodaDensity: 'very-high',
      trucksDensity: 'medium'
    }
  },
  
  thika_road: {
    id: 'thika_road',
    name: 'Thika Superhighway',
    routeNumber: '237',
    description: 'CBD → Roysambu → Kasarani → Githurai → Ruiru → Thika',
    
    stages: [
      { name: 'CBD', location: 'Kencom', km: 0, landmark: 'Kencom House' },
      { name: 'Muthaiga', location: 'Muthaiga', km: 5.0, landmark: 'Muthaiga Golf Club' },
      { name: 'Ambassadeur', location: 'UN Complex Area', km: 3.0, landmark: 'UN Offices' },
      { name: 'Garden City', location: 'Garden City Mall', km: 7.5, landmark: 'Garden City' },
      { name: 'Roysambu', location: 'Roysambu Roundabout', km: 10.0, landmark: 'Roysambu' },
      { name: 'Kasarani', location: 'Kasarani Stadium', km: 13.5, landmark: 'Kasarani Stadium' },
      { name: 'Githurai 45', location: 'Githurai 45', km: 16.0, landmark: 'Githurai Market' },
      { name: 'Githurai 44', location: 'Githurai 44', km: 17.0, landmark: 'Githurai Shops' },
      { name: 'Ruiru', location: 'Ruiru Town', km: 25.0, landmark: 'Ruiru Bypass' },
      { name: 'Thika', location: 'Thika Town', km: 42.0, landmark: 'Thika Town' }
    ],
    
    environment: {
      roadType: 'Modern superhighway, 8 lanes, elevated sections',
      traffic: 'Fast-moving, heavy volume',
      area: 'Mixed suburbs, industrial, agricultural',
      buildings: ['Modern apartments', 'Malls', 'Factories', 'Industrial parks'],
      landmarks: ['Garden City Mall', 'TRM', 'Kasarani Stadium', 'Ruiru Bypass']
    },
    
    hasTrafficLights: false,
    trafficLightLocations: [],
    policeStation: 'kasarani',
    difficulty: 'Very Hard',
    
    obstacles: {
      privateCarsDensity: 'very-high',
      taxisDensity: 'medium',
      bodaBodaDensity: 'low',
      trucksDensity: 'very-high'
    }
  },
  
  mombasa_road: {
    id: 'mombasa_road',
    name: 'Mombasa Road',
    routeNumber: '125',
    description: 'CBD → Industrial Area → Imara Daima → Gateway → Syokimau → Mlolongo',
    
    stages: [
      { name: 'CBD', location: 'Bunyala Roundabout', km: 0, landmark: 'Bunyala' },
      { name: 'Industrial Area', location: 'Enterprise Road', km: 4.0, landmark: 'Factories' },
      { name: 'South B', location: 'South B Shopping', km: 6.0, landmark: 'South B' },
      { name: 'Imara Daima', location: 'Imara Daima', km: 8.0, landmark: 'Imara Market' },
      { name: 'Gateway', location: 'Gateway Mall', km: 12.0, landmark: 'Gateway Mall' },
      { name: 'Syokimau', location: 'SGR Terminus', km: 18.0, landmark: 'SGR Station' },
      { name: 'Mlolongo', location: 'Mlolongo Town', km: 22.0, landmark: 'Mlolongo Market' }
    ],
    
    environment: {
      roadType: 'Wide highway, expressway parallel',
      traffic: 'Heavy trucks + matatus mix',
      area: 'Industrial, residential, commercial mix',
      buildings: ['Warehouses', 'Factories', 'Apartments', 'Malls'],
      landmarks: ['Gateway Mall', 'SGR Terminus', 'JKIA (visible)', 'National Park border']
    },
    
    hasTrafficLights: true,
    trafficLightLocations: ['Industrial Area', 'Imara Daima'],
    policeStation: 'industrial_area',
    difficulty: 'Very Hard',
    
    obstacles: {
      privateCarsDensity: 'high',
      taxisDensity: 'high',
      bodaBodaDensity: 'medium',
      trucksDensity: 'extreme'
    }
  },
  
  waiyaki_way: {
    id: 'waiyaki_way',
    name: 'Waiyaki Way',
    routeNumber: '110',
    description: 'CBD → Westlands → Kangemi → Kinoo',
    
    stages: [
      { name: 'CBD', location: 'University Way', km: 0, landmark: 'KICC' },
      { name: 'Westlands', location: 'Westlands Roundabout', km: 4.5, landmark: 'Sarit Centre' },
      { name: 'Kangemi', location: 'Kangemi', km: 7.0, landmark: 'Kangemi Market' },
      { name: 'Kinoo', location: 'Kinoo', km: 15.0, landmark: 'Kinoo Market' }
    ],
    
    environment: {
      roadType: 'Wide dual carriageway',
      traffic: 'Heavy commercial traffic',
      area: 'Commercial, residential, informal settlements',
      buildings: ['Office towers', 'Malls', 'Apartments', 'Markets'],
      landmarks: ['Sarit Centre', 'Westgate Mall', 'ABC Place']
    },
    
    hasTrafficLights: true,
    trafficLightLocations: ['Westlands'],
    policeStation: 'parklands',
    difficulty: 'Medium',
    
    obstacles: {
      privateCarsDensity: 'very-high',
      taxisDensity: 'very-high',
      bodaBodaDensity: 'high',
      trucksDensity: 'medium'
    }
  }
};

export const getAllStages = (routeId) => ROUTES[routeId]?.stages || [];
export const getRouteDifficulty = (routeId) => ROUTES[routeId]?.difficulty || 'Medium';
export const hasTrafficLights = (routeId) => ROUTES[routeId]?.hasTrafficLights || false;

export default ROUTES;