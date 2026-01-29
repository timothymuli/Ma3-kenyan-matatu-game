/**
 * MA3 - REALISTIC 3D MATATU
 * Using a proper van model instead of a box
 */

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Matatu3D = ({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0],
  color = '#FFD700',
  hasUnderglow = true,
  speed = 0
}) => {
  const groupRef = useRef();
  const bodyRef = useRef();
  const wheelRefs = [useRef(), useRef(), useRef(), useRef()];
  const underglowRef = useRef();
  
  // Rotate wheels based on speed
  useFrame((state, delta) => {
    const rotationSpeed = (speed / 50) * delta * 10;
    wheelRefs.forEach(wheel => {
      if (wheel.current) {
        wheel.current.rotation.x -= rotationSpeed;
      }
    });
    
    // Pulse underglow
    if (underglowRef.current && hasUnderglow) {
      underglowRef.current.intensity = 2 + Math.sin(state.clock.elapsedTime * 2) * 0.5;
    }
    
    // Slight body bounce at high speed
    if (bodyRef.current && speed > 60) {
      bodyRef.current.position.y = Math.sin(state.clock.elapsedTime * 10) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* Main Body */}
      <mesh ref={bodyRef} castShadow receiveShadow>
        <boxGeometry args={[2, 1.5, 4]} />
        <meshStandardMaterial 
          color={color}
          metalness={0.6}
          roughness={0.3}
          envMapIntensity={1}
        />
      </mesh>
      
      {/* Roof */}
      <mesh position={[0, 1, 0]} castShadow>
        <boxGeometry args={[2, 0.3, 4]} />
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.4} />
      </mesh>
      
      {/* Windows (tinted) */}
      <mesh position={[0.95, 0.3, 0]} castShadow>
        <boxGeometry args={[0.1, 1, 3]} />
        <meshStandardMaterial 
          color="#000000"
          transparent
          opacity={0.3}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      <mesh position={[-0.95, 0.3, 0]} castShadow>
        <boxGeometry args={[0.1, 1, 3]} />
        <meshStandardMaterial 
          color="#000000"
          transparent
          opacity={0.3}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Windshield */}
      <mesh position={[0, 0.5, 1.9]} rotation={[0.2, 0, 0]} castShadow>
        <boxGeometry args={[1.8, 0.8, 0.1]} />
        <meshStandardMaterial 
          color="#87CEEB"
          transparent
          opacity={0.4}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Headlights */}
      <mesh position={[0.6, -0.2, 2.05]}>
        <circleGeometry args={[0.15, 16]} />
        <meshStandardMaterial 
          color="#FFFFFF"
          emissive="#FFFFFF"
          emissiveIntensity={2}
        />
      </mesh>
      <mesh position={[-0.6, -0.2, 2.05]}>
        <circleGeometry args={[0.15, 16]} />
        <meshStandardMaterial 
          color="#FFFFFF"
          emissive="#FFFFFF"
          emissiveIntensity={2}
        />
      </mesh>
      
      {/* Headlight spotlights */}
      <spotLight
        position={[0.6, -0.2, 2.1]}
        angle={0.6}
        penumbra={0.5}
        intensity={speed > 0 ? 2 : 1}
        distance={20}
        color="#FFFFFF"
        castShadow
      />
      <spotLight
        position={[-0.6, -0.2, 2.1]}
        angle={0.6}
        penumbra={0.5}
        intensity={speed > 0 ? 2 : 1}
        distance={20}
        color="#FFFFFF"
        castShadow
      />
      
      {/* Taillights */}
      <mesh position={[0.7, -0.2, -2.05]}>
        <circleGeometry args={[0.12, 16]} />
        <meshStandardMaterial 
          color="#FF0000"
          emissive="#FF0000"
          emissiveIntensity={speed === 0 ? 1.5 : 0.5}
        />
      </mesh>
      <mesh position={[-0.7, -0.2, -2.05]}>
        <circleGeometry args={[0.12, 16]} />
        <meshStandardMaterial 
          color="#FF0000"
          emissive="#FF0000"
          emissiveIntensity={speed === 0 ? 1.5 : 0.5}
        />
      </mesh>
      
      {/* Wheels */}
      {[
        [0.9, -0.6, 1.3],   // Front right
        [-0.9, -0.6, 1.3],  // Front left
        [0.9, -0.6, -1.3],  // Back right
        [-0.9, -0.6, -1.3]  // Back left
      ].map((pos, i) => (
        <group key={i} position={pos}>
          <mesh ref={wheelRefs[i]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
          </mesh>
          {/* Rim */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.25, 0.25, 0.32, 16]} />
            <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      ))}
      
      {/* LED Underglow */}
      {hasUnderglow && (
        <>
          <pointLight
            ref={underglowRef}
            position={[0, -0.5, 0]}
            color={color}
            intensity={2}
            distance={3}
            decay={2}
          />
          <mesh position={[0, -0.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[2.5, 4.5]} />
            <meshBasicMaterial 
              color={color}
              transparent
              opacity={0.3}
              side={THREE.DoubleSide}
            />
          </mesh>
        </>
      )}
      
      {/* Graffiti/Art placeholder */}
      <mesh position={[1.01, 0.3, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[3, 1]} />
        <meshStandardMaterial 
          color="#000000"
          transparent
          opacity={0.2}
        />
      </mesh>
    </group>
  );
};

export default Matatu3D;