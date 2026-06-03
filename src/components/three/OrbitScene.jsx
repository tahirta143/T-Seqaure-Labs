"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Float } from "@react-three/drei";
import * as THREE from "three";

// ── Individual Orbiting Node ──────────────────────────────────────────────────
function OrbitNode({ radius, speed, angleOffset, label, color, isDark }) {
  const ref = useRef();

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    const angle = elapsed * speed + angleOffset;
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    if (ref.current) ref.current.position.set(x, 0, z);
  });

  return (
    <group ref={ref}>
      {/* Node dot */}
      <mesh>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>

      {/* Soft glow aura */}
      <mesh scale={[1.5, 1.5, 1.5]}>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.18} />
      </mesh>

      {/* Floating HTML label */}
      <Html distanceFactor={8} position={[0, 0.42, 0]} center>
        <div
          className="px-2.5 py-1 text-[10px] font-bold rounded-lg whitespace-nowrap select-none pointer-events-none"
          style={{
            backgroundColor: isDark
              ? "rgba(22, 22, 34, 0.88)"
              : "rgba(255, 255, 255, 0.92)",
            color: isDark ? "#f1f5f9" : "#0f172a",
            border: `1px solid ${color}55`,
            boxShadow: `0 2px 12px ${color}33`,
          }}
        >
          {label}
        </div>
      </Html>
    </group>
  );
}

// ── Center Icosahedron Core ───────────────────────────────────────────────────
function CenterCore({ isDark }) {
  const coreRef = useRef();

  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.y = state.clock.getElapsedTime() * 0.4;
      coreRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    }
  });

  // Teal core
  const coreColor = isDark ? "#14b8a6" : "#0d9488";

  return (
    <mesh ref={coreRef}>
      <icosahedronGeometry args={[0.9, 1]} />
      <meshBasicMaterial
        color={coreColor}
        wireframe
        transparent
        opacity={isDark ? 0.55 : 0.70}
      />
    </mesh>
  );
}

// ── Full Orbit System ─────────────────────────────────────────────────────────
function OrbitSystem({ isDark }) {
  const systemRef = useRef();

  useFrame((state) => {
    const pointer = state.pointer;
    if (systemRef.current) {
      systemRef.current.rotation.x = THREE.MathUtils.lerp(
        systemRef.current.rotation.x,
        pointer.y * 0.2 + 0.3,
        0.05
      );
      systemRef.current.rotation.z = THREE.MathUtils.lerp(
        systemRef.current.rotation.z,
        -pointer.x * 0.1,
        0.05
      );
    }
  });

  // Node palette — teal family for inner rings, rose/amber for AI outer ring
  const techNodes = [
    // Ring 1 (Inner): Frontend — teal / cyan shades
    { label: "Next.js",      radius: 1.8, speed: 0.25,  angleOffset: 0,                      color: "#2dd4bf" },
    { label: "Flutter",      radius: 1.8, speed: 0.25,  angleOffset: (2 * Math.PI) / 3,      color: "#14b8a6" },
    { label: "React Native", radius: 1.8, speed: 0.25,  angleOffset: (4 * Math.PI) / 3,      color: "#0891b2" },

    // Ring 2 (Middle): Backend & DB — emerald / teal
    { label: "Node.js",      radius: 2.8, speed: -0.18, angleOffset: 0,                      color: "#34d399" },
    { label: "PostgreSQL",   radius: 2.8, speed: -0.18, angleOffset: Math.PI / 2,            color: "#2dd4bf" },
    { label: "MongoDB",      radius: 2.8, speed: -0.18, angleOffset: Math.PI,                color: "#6ee7b7" },
    { label: "Express.js",   radius: 2.8, speed: -0.18, angleOffset: (3 * Math.PI) / 2,     color: "#a7f3d0" },

    // Ring 3 (Outer): AI — warm rose/violet for contrast
    { label: "AI Agents",    radius: 3.8, speed: 0.12,  angleOffset: 0,                      color: "#f472b6" },
    { label: "LangChain",    radius: 3.8, speed: 0.12,  angleOffset: Math.PI / 2,            color: "#c084fc" },
    { label: "OpenAI",       radius: 3.8, speed: 0.12,  angleOffset: Math.PI,                color: "#fb7185" },
    { label: "Vector DBs",   radius: 3.8, speed: 0.12,  angleOffset: (3 * Math.PI) / 2,     color: "#e879f9" },
  ];

  // Orbit ring lines — teal tint
  const ringColor = isDark ? "#14b8a6" : "#0d9488";

  return (
    <group ref={systemRef}>
      <CenterCore isDark={isDark} />

      {/* Orbit path rings */}
      {[1.8, 2.8, 3.8].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[r - 0.02, r + 0.02, 80]} />
          <meshBasicMaterial
            color={ringColor}
            transparent
            opacity={0.07 - i * 0.015}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Orbiting nodes */}
      {techNodes.map((node, index) => (
        <OrbitNode
          key={index}
          radius={node.radius}
          speed={node.speed}
          angleOffset={node.angleOffset}
          label={node.label}
          color={node.color}
          isDark={isDark}
        />
      ))}
    </group>
  );
}

// ── Root Export ───────────────────────────────────────────────────────────────
export default function OrbitScene() {
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

  return (
    <div className="w-full h-[400px] md:h-[500px] relative pointer-events-auto">
      <Canvas
        camera={{ position: [0, 4, 7], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={isDark ? 0.7 : 1.1} />
        {/* Teal key light from above */}
        <pointLight
          position={[0, 6, 4]}
          intensity={isDark ? 1.4 : 2.0}
          color={isDark ? "#14b8a6" : "#0d9488"}
        />
        <OrbitSystem isDark={isDark} />
      </Canvas>
    </div>
  );
}
