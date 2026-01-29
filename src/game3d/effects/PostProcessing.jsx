/**
 * MA3 - BASIC POST-PROCESSING
 * Simple effects without external dependencies
 */

import { useFrame, useThree } from '@react-three/fiber';

const PostProcessing = ({ speed = 0, isNight = false }) => {
  const { camera, gl } = useThree();
  
  // Motion blur simulation (camera shake at high speed)
  useFrame(() => {
    if (speed > 60) {
      const shake = (speed - 60) / 400;
      camera.position.x += (Math.random() - 0.5) * shake;
      camera.position.y += (Math.random() - 0.5) * shake;
    }
  });

  // Adjust tone mapping based on time of day
  gl.toneMappingExposure = isNight ? 0.8 : 1.2;

  return null;
};

export default PostProcessing;
