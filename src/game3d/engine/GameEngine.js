/**
 * MA3 - 3D GAME ENGINE
 * Real 3D matatu racing simulation
 * Uses Three.js for rendering, Cannon.js for physics
 */

import * as THREE from 'three';
import * as CANNON from 'cannon-es';

export class GameEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.clock = new THREE.Clock();
    this.delta = 0;
    this.time = 0;
    
    // Performance tracking
    this.fps = 60;
    this.frameCount = 0;
    this.lastFrameTime = performance.now();
    
    this.initRenderer();
    this.initScene();
    this.initPhysics();
    this.initLighting();
    this.initCamera();
    this.initControls();
    
    console.log('🎮 MA3 Game Engine Initialized');
  }
  
  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false
    });
    
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }
  
  initScene() {
    this.scene = new THREE.Scene();
    const skyColor = new THREE.Color(0x87CEEB);
    const groundColor = new THREE.Color(0xB8B890);
    this.scene.background = skyColor;
    this.scene.fog = new THREE.Fog(skyColor, 100, 1000);
    
    const hemiLight = new THREE.HemisphereLight(skyColor, groundColor, 0.6);
    this.scene.add(hemiLight);
  }
  
  initPhysics() {
    this.world = new CANNON.World({
      gravity: new CANNON.Vec3(0, -9.82, 0)
    });
    
    this.world.broadphase = new CANNON.SAPBroadphase(this.world);
    this.world.allowSleep = true;
    
    this.groundMaterial = new CANNON.Material('ground');
    this.wheelMaterial = new CANNON.Material('wheel');
    
    const wheelGround = new CANNON.ContactMaterial(
      this.wheelMaterial,
      this.groundMaterial,
      {
        friction: 0.8,
        restitution: 0.1,
        contactEquationStiffness: 1000
      }
    );
    
    this.world.addContactMaterial(wheelGround);
    console.log('⚙️ Physics Engine Ready');
  }
  
  initLighting() {
    this.sun = new THREE.DirectionalLight(0xFFFAF0, 1.5);
    this.sun.position.set(50, 100, 50);
    this.sun.castShadow = true;
    
    this.sun.shadow.mapSize.width = 2048;
    this.sun.shadow.mapSize.height = 2048;
    this.sun.shadow.camera.near = 0.5;
    this.sun.shadow.camera.far = 500;
    this.sun.shadow.camera.left = -100;
    this.sun.shadow.camera.right = 100;
    this.sun.shadow.camera.top = 100;
    this.sun.shadow.camera.bottom = -100;
    this.sun.shadow.bias = -0.0001;
    
    this.scene.add(this.sun);
    
    const ambient = new THREE.AmbientLight(0xFFFFFF, 0.4);
    this.scene.add(ambient);
  }
  
  initCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    
    this.camera.position.set(0, 5, -10);
    this.camera.lookAt(0, 0, 0);
    
    this.cameraMode = 'chase';
    this.cameraOffset = new THREE.Vector3(0, 3, -8);
  }
  
  initControls() {
    this.input = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      brake: false,
      handbrake: false,
      horn: false
    };
    
    window.addEventListener('keydown', (e) => {
      switch(e.key.toLowerCase()) {
        case 'w': case 'arrowup': this.input.forward = true; break;
        case 's': case 'arrowdown': this.input.backward = true; break;
        case 'a': case 'arrowleft': this.input.left = true; break;
        case 'd': case 'arrowright': this.input.right = true; break;
        case ' ': this.input.handbrake = true; break;
        case 'shift': this.input.brake = true; break;
        case 'h': this.input.horn = true; break;
        case 'c': this.cycleCamera(); break;
      }
    });
    
    window.addEventListener('keyup', (e) => {
      switch(e.key.toLowerCase()) {
        case 'w': case 'arrowup': this.input.forward = false; break;
        case 's': case 'arrowdown': this.input.backward = false; break;
        case 'a': case 'arrowleft': this.input.left = false; break;
        case 'd': case 'arrowright': this.input.right = false; break;
        case ' ': this.input.handbrake = false; break;
        case 'shift': this.input.brake = false; break;
        case 'h': this.input.horn = false; break;
      }
    });
  }
  
  cycleCamera() {
    const modes = ['chase', 'hood', 'cinematic', 'drone'];
    const currentIndex = modes.indexOf(this.cameraMode);
    this.cameraMode = modes[(currentIndex + 1) % modes.length];
    console.log('📷 Camera:', this.cameraMode);
  }
  
  updateCamera(vehicle) {
    if (!vehicle) return;
    
    const pos = vehicle.position.clone();
    
    switch(this.cameraMode) {
      case 'chase':
        const offset = new THREE.Vector3(0, 3, -8);
        offset.applyQuaternion(vehicle.quaternion);
        this.camera.position.lerp(pos.clone().add(offset), 0.1);
        this.camera.lookAt(pos);
        break;
        
      case 'hood':
        const hoodOffset = new THREE.Vector3(0, 1.5, 2);
        hoodOffset.applyQuaternion(vehicle.quaternion);
        this.camera.position.copy(pos.clone().add(hoodOffset));
        
        const lookAt = new THREE.Vector3(0, 1.5, 10);
        lookAt.applyQuaternion(vehicle.quaternion);
        this.camera.lookAt(pos.clone().add(lookAt));
        break;
        
      case 'cinematic':
        this.time += this.delta;
        const angle = this.time * 0.5;
        const radius = 15;
        this.camera.position.x = pos.x + Math.cos(angle) * radius;
        this.camera.position.y = pos.y + 5;
        this.camera.position.z = pos.z + Math.sin(angle) * radius;
        this.camera.lookAt(pos);
        break;
        
      case 'drone':
        const droneOffset = new THREE.Vector3(0, 20, -15);
        droneOffset.applyQuaternion(vehicle.quaternion);
        this.camera.position.lerp(pos.clone().add(droneOffset), 0.05);
        this.camera.lookAt(pos);
        break;
    }
  }
  
  update() {
    this.delta = this.clock.getDelta();
    this.time += this.delta;
    
    const fixedTimeStep = 1 / 60;
    this.world.step(fixedTimeStep, this.delta, 3);
    
    this.frameCount++;
    const now = performance.now();
    if (now >= this.lastFrameTime + 1000) {
      this.fps = this.frameCount;
      this.frameCount = 0;
      this.lastFrameTime = now;
    }
  }
  
  render() {
    this.renderer.render(this.scene, this.camera);
  }
  
  addToScene(object) {
    this.scene.add(object);
  }
  
  addToPhysics(body) {
    this.world.addBody(body);
  }
  
  removeFromScene(object) {
    this.scene.remove(object);
  }
  
  removeFromPhysics(body) {
    this.world.removeBody(body);
  }
  
  getFPS() {
    return this.fps;
  }
  
  dispose() {
    this.renderer.dispose();
    this.scene.traverse((object) => {
      if (object.geometry) object.geometry.dispose();
      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach(mat => mat.dispose());
        } else {
          object.material.dispose();
        }
      }
    });
    console.log('🗑️ Game Engine Disposed');
  }
}

export default GameEngine;
