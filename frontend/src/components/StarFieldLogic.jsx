// StarFieldLogic.jsx
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

const StarFieldLogic = ({ positions, speeds, numStars }) => {
  const pointsRef = useRef();

  useFrame(() => {
    if (pointsRef.current) {
      for (let i = 0; i < numStars; i++) {
        positions[i * 3 + 2] += speeds[i]; // Move stars forward
        if (positions[i * 3 + 2] > 10) positions[i * 3 + 2] = -10; // Reset star depth
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} frustumCulled={false}>
      <PointMaterial size={0.05} color="#e0e0e0" sizeAttenuation />
    </Points>
  );
};

export default StarFieldLogic;
