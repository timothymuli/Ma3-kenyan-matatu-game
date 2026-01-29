/**
 * MA3 - NAIROBI 3D WORLD
 * Procedurally generated Nairobi city
 */

import * as THREE from 'three';
import * as CANNON from 'cannon-es';

export class NairobiWorld {
  constructor(engine) {
    this.engine = engine;
    this.buildings = [];
    this.roads = [];
    this.landmarks = [];
    
    this.init();
  }
  
  init() {
    this.createGround();
    this.createMainRoad();
    this.createBuildings();
    this.createLandmarks();
    this.createStreetLights();
    
    console.log('🏙️ Nairobi world generated');
  }
  
  createGround() {
    const groundGeometry = new THREE.PlaneGeometry(2000, 2000, 100, 100);
    
    const vertices = groundGeometry.attributes.position.array;
    for (let i = 0; i < vertices.length; i += 3) {
      vertices[i + 2] = Math.random() * 0.5;
    }
    groundGeometry.attributes.position.needsUpdate = true;
    groundGeometry.computeVertexNormals();
    
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0xB8B890,
      roughness: 0.9,
      metalness: 0.1
    });
    
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.engine.addToScene(ground);
    
    const groundShape = new CANNON.Plane();
    const groundBody = new CANNON.Body({
      mass: 0,
      shape: groundShape,
      material: this.engine.groundMaterial
    });
    groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
    this.engine.addToPhysics(groundBody);
  }
  
  createMainRoad() {
    const roadLength = 1000;
    const roadWidth = 20;
    
    const roadGeometry = new THREE.PlaneGeometry(roadWidth, roadLength);
    const roadTexture = this.createAsphaltTexture();
    
    const roadMaterial = new THREE.MeshStandardMaterial({
      map: roadTexture,
      roughness: 0.8,
      metalness: 0.1
    });
    
    const road = new THREE.Mesh(roadGeometry, roadMaterial);
    road.rotation.x = -Math.PI / 2;
    road.position.y = 0.01;
    road.receiveShadow = true;
    this.engine.addToScene(road);
    
    this.createLaneMarkings(roadWidth, roadLength, 4);
    this.roads.push(road);
  }
  
  createAsphaltTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#2C2C2C';
    ctx.fillRect(0, 0, 512, 512);
    
    for (let i = 0; i < 10000; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const shade = Math.random() * 50 - 25;
      ctx.fillStyle = `rgb(${44 + shade}, ${44 + shade}, ${44 + shade})`;
      ctx.fillRect(x, y, 2, 2);
    }
    
    ctx.strokeStyle = '#1A1A1A';
    ctx.lineWidth = 2;
    for (let i = 0; i < 20; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * 512, Math.random() * 512);
      ctx.lineTo(Math.random() * 512, Math.random() * 512);
      ctx.stroke();
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 20);
    
    return texture;
  }
  
  createLaneMarkings(width, length, lanes) {
    const markingWidth = 0.3;
    const markingLength = 3;
    const gap = 6;
    
    const markingGeometry = new THREE.BoxGeometry(markingWidth, 0.02, markingLength);
    const markingMaterial = new THREE.MeshBasicMaterial({
      color: 0xFFD700
    });
    
    const laneSpacing = width / lanes;
    
    for (let lane = 1; lane < lanes; lane++) {
      const x = -width / 2 + lane * laneSpacing;
      
      for (let z = -length / 2; z < length / 2; z += markingLength + gap) {
        const marking = new THREE.Mesh(markingGeometry, markingMaterial);
        marking.position.set(x, 0.02, z);
        this.engine.addToScene(marking);
      }
    }
  }
  
  createBuildings() {
    const buildingCount = 50;
    const buildingZone = 100;
    
    for (let i = 0; i < buildingCount; i++) {
      const x = (Math.random() - 0.5) * buildingZone * 4;
      const z = (Math.random() - 0.5) * buildingZone * 4;
      
      if (Math.abs(x) < 15) continue;
      
      const width = 10 + Math.random() * 10;
      const depth = 10 + Math.random() * 10;
      const height = 20 + Math.random() * 60;
      
      this.createBuilding(x, z, width, depth, height);
    }
  }
  
  createBuilding(x, z, width, depth, height) {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    
    const colors = [0xE0E0E0, 0xC0C0C0, 0x8899AA, 0x667788];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    const material = new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.7,
      metalness: 0.3
    });
    
    const building = new THREE.Mesh(geometry, material);
    building.position.set(x, height / 2, z);
    building.castShadow = true;
    building.receiveShadow = true;
    
    this.engine.addToScene(building);
    this.buildings.push(building);
    
    this.addWindows(building, width, height, depth);
  }
  
  addWindows(building, width, height, depth) {
    const windowSize = 1.5;
    const windowGap = 2;
    
    const windowGeometry = new THREE.PlaneGeometry(windowSize, windowSize);
    const windowMaterial = new THREE.MeshStandardMaterial({
      color: 0x88CCFF,
      roughness: 0.1,
      metalness: 0.9
    });
    
    for (let y = windowGap; y < height - windowGap; y += windowGap) {
      for (let x = -width / 2 + windowGap; x < width / 2 - windowGap; x += windowGap) {
        const window = new THREE.Mesh(windowGeometry, windowMaterial);
        window.position.set(x, y - height / 2, depth / 2 + 0.01);
        building.add(window);
      }
    }
  }
  
  createLandmarks() {
    this.createKICC();
    this.createTimesTower();
  }
  
  createKICC() {
    const baseGeometry = new THREE.CylinderGeometry(15, 15, 30, 32);
    const baseMaterial = new THREE.MeshStandardMaterial({ color: 0xBBAA99 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.set(50, 15, -100);
    base.castShadow = true;
    this.engine.addToScene(base);
    
    const towerGeometry = new THREE.CylinderGeometry(8, 8, 60, 32);
    const tower = new THREE.Mesh(towerGeometry, baseMaterial);
    tower.position.set(50, 60, -100);
    tower.castShadow = true;
    this.engine.addToScene(tower);
    
    this.landmarks.push({ name: 'KICC', position: base.position });
  }
  
  createTimesTower() {
    const geometry = new THREE.BoxGeometry(20, 100, 20);
    const material = new THREE.MeshStandardMaterial({ color: 0x445566 });
    const tower = new THREE.Mesh(geometry, material);
    tower.position.set(-80, 50, -120);
    tower.castShadow = true;
    this.engine.addToScene(tower);
    
    this.landmarks.push({ name: 'Times Tower', position: tower.position });
  }
  
  createStreetLights() {
    const count = 30;
    const spacing = 30;
    
    for (let i = 0; i < count; i++) {
      const x = 12;
      const z = -500 + i * spacing;
      this.createStreetLight(x, z);
      this.createStreetLight(-x, z);
    }
  }
  
  createStreetLight(x, z) {
    const poleGeometry = new THREE.CylinderGeometry(0.2, 0.2, 8);
    const poleMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
    const pole = new THREE.Mesh(poleGeometry, poleMaterial);
    pole.position.set(x, 4, z);
    pole.castShadow = true;
    this.engine.addToScene(pole);
    
    const light = new THREE.PointLight(0xFFAA55, 2, 30);
    light.position.set(x, 8, z);
    light.castShadow = true;
    this.engine.addToScene(light);
  }
  
  getSpawnPosition() {
    return new CANNON.Vec3(0, 2, 0);
  }
}

export default NairobiWorld;
