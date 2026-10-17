"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const locations = [
  { name: "Cairo", lat: 30.04, lon: 31.24 },
  { name: "Dubai", lat: 25.2, lon: 55.27 },
  { name: "London", lat: 51.5, lon: -0.12 },
  { name: "New York", lat: 40.71, lon: -74.0 },
  { name: "Tokyo", lat: 35.68, lon: 139.69 },
];

function latLonToVector3(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  return new THREE.Vector3(x, y, z);
}

function Earth({ segments, rotate }: { segments: number; rotate: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  // حساب النقاط مرة واحدة بس
  const points = useMemo(
    () => locations.map((loc) => ({
      name: loc.name,
      position: latLonToVector3(loc.lat, loc.lon, 1.02),
    })),
    []
  );

  useFrame((_, delta) => {
    if (rotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[1, segments, segments]} />
        <meshStandardMaterial color="#1e1b4b" roughness={0.6} metalness={0.2} />
      </mesh>

      <mesh>
        <sphereGeometry args={[1.005, segments / 2, segments / 2]} />
        <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.15} />
      </mesh>

      {points.map((p) => (
        <mesh key={p.name} position={p.position}>
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshBasicMaterial color="#f472b6" />
        </mesh>
      ))}
    </group>
  );
}

export default function Globe() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // الكرة بتتحمل بس لما تظهر على الشاشة، وبتتفصل لما تبعد
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className="h-[500px] w-full pointer-events-none">
      {visible && (
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 3] }}
          gl={{ antialias: !isMobile, powerPreference: "low-power" }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Earth segments={isMobile ? 32 : 64} rotate={!reduceMotion} />
        </Canvas>
      )}
    </div>
  );
}