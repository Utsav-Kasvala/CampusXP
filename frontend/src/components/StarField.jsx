// StarField.js
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const StarField = () => {
  const canvasRef = useRef(null); // Ref for the canvas element

  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Starfield creation
    const numStars = 2000;
    const positions = new Float32Array(numStars * 3);
    const speeds = new Float32Array(numStars);

    for (let i = 0; i < numStars; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20; // X position
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20; // Y position
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20; // Z position (depth)
      speeds[i] = Math.random() * 0.002 + 0.0005; // Different twinkle speeds
    }

    // Create points geometry for the stars
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Material for the stars
    const material = new THREE.PointsMaterial({ size: 0.05, color: 0xffffff, sizeAttenuation: true });

    // Create the point system (stars)
    const stars = new THREE.Points(geometry, material);
    scene.add(stars);

    camera.position.z = 5;

    // Animation loop for the starfield effect
    const animate = () => {
      requestAnimationFrame(animate);

      for (let i = 0; i < numStars; i++) {
        positions[i * 3 + 2] += speeds[i]; // Move stars forward
        if (positions[i * 3 + 2] > 10) positions[i * 3 + 2] = -10; // Reset star depth
      }

      geometry.attributes.position.needsUpdate = true; // Update star positions
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on component unmount
    return () => {
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
};

export default StarField;
