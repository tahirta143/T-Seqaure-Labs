"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PointMaterial, Points } from "@react-three/drei";
import * as THREE from "three";

// ── Animated Core Sphere + Ring ──────────────────────────────────────────────
function TechSphere({ isDark }) {
  const meshRef  = useRef();
  const groupRef = useRef();
  const ringRef  = useRef();
  const ring2Ref = useRef();

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    const pointer = state.pointer;

    if (meshRef.current) {
      meshRef.current.rotation.y = elapsed * 0.12;
      meshRef.current.rotation.x = elapsed * 0.07;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = elapsed * 0.18;
      ringRef.current.rotation.x = 0.85;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -elapsed * 0.12;
      ring2Ref.current.rotation.y = elapsed * 0.08;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.4,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -pointer.y * 0.4,
        0.05
      );
    }
  });

  // Teal palette — dark: #14b8a6  light: #0d9488
  const coreTeal  = isDark ? "#14b8a6" : "#0d9488";
  const lightTeal = isDark ? "#2dd4bf" : "#14b8a6";

  return (
    <group ref={groupRef}>
      <Float speed={2.2} rotationIntensity={0.4} floatIntensity={1.2}>

        {/* Wireframe sphere */}
        <mesh ref={meshRef}>
          <sphereGeometry args={[1.6, 36, 36]} />
          <meshBasicMaterial
            color={coreTeal}
            wireframe
            transparent
            opacity={isDark ? 0.22 : 0.30}
          />
        </mesh>

        {/* Primary outer ring */}
        <mesh ref={ringRef} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[2.2, 0.028, 16, 120]} />
          <meshBasicMaterial
            color={lightTeal}
            transparent
            opacity={isDark ? 0.55 : 0.45}
          />
        </mesh>

        {/* Secondary counter-rotating ring */}
        <mesh ref={ring2Ref} rotation={[Math.PI / 6, Math.PI / 3, 0]}>
          <torusGeometry args={[1.85, 0.016, 12, 100]} />
          <meshBasicMaterial
            color={coreTeal}
            transparent
            opacity={isDark ? 0.35 : 0.30}
          />
        </mesh>

        {/* Inner glowing core */}
        <mesh>
          <sphereGeometry args={[0.55, 20, 20]} />
          <meshBasicMaterial
            color={lightTeal}
            transparent
            opacity={isDark ? 0.18 : 0.22}
          />
        </mesh>
      </Float>
    </group>
  );
}

// ── Particle Cloud ────────────────────────────────────────────────────────────
function Particles({ count = 280, isDark }) {
  const pointsRef = useRef();

  const [positions] = useState(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 3.2 + Math.random() * 3.8;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi   = Math.acos(2.0 * v - 1.0);
      arr[i * 3]     = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = radius * Math.cos(phi);
    }
    return arr;
  });

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = elapsed * 0.04;
      pointsRef.current.rotation.x = elapsed * 0.015;
    }
  });

  // Dark: white dots  |  Light: teal dots so they're visible on light bg
  const particleColor = isDark ? "#ffffff" : "#0d9488";

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color={particleColor}
        size={isDark ? 0.055 : 0.048}
        sizeAttenuation
        depthWrite={false}
        opacity={isDark ? 0.45 : 0.50}
      />
    </Points>
  );
}

// ── Root Scene ────────────────────────────────────────────────────────────────
export default function HeroScene() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  // Teal point-light colours
  const lightColor = isDark ? "#14b8a6" : "#0d9488";

  return (
    <div className="w-full h-full relative pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Neutral ambient — let teal point-lights do the tinting */}
        <ambientLight intensity={isDark ? 0.5 : 1.0} />

        {/* Primary teal key light */}
        <pointLight
          position={[8, 8, 8]}
          intensity={isDark ? 1.8 : 2.8}
          color={lightColor}
        />

        {/* Softer fill from opposite side */}
        <pointLight
          position={[-8, -6, -6]}
          intensity={isDark ? 0.6 : 0.8}
          color={isDark ? "#2dd4bf" : "#14b8a6"}
        />

        <TechSphere isDark={isDark} />
        <Particles count={280} isDark={isDark} />
      </Canvas>
    </div>
  );
}
