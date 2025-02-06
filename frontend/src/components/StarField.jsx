import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const StarField = () => {
  const canvasRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Attach renderer to the existing canvas
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Starfield setup
    const numStars = 2000;
    const positions = new Float32Array(numStars * 3);
    const speeds = new Float32Array(numStars);

    for (let i = 0; i < numStars; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      speeds[i] = Math.random() * 0.002 + 0.0005;
    }

    // Create buffer geometry
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Define material correctly
    const material = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xffffff,
      sizeAttenuation: true,
    });

    // Create and add stars
    const stars = new THREE.Points(geometry, material);
    scene.add(stars);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Scroll-based movement
      if (cameraRef.current) {
        cameraRef.current.position.y = window.scrollY * 0.005; // Moves stars with scroll
      }

      for (let i = 0; i < numStars; i++) {
        positions[i * 3 + 2] += speeds[i];
        if (positions[i * 3 + 2] > 10) positions[i * 3 + 2] = -10;
      }

      geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />;
};

export default StarField;
