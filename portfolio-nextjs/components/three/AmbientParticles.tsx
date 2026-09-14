"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COLORS = ["#5B9BD8", "#FF8FA8", "#FFCE7A"];

// Ambient background 3D ringan untuk section Contact.
export default function AmbientParticles() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 7], fov: 50 }} gl={{ alpha: true, antialias: false }} style={{ pointerEvents: "none" }}>
      <ambientLight intensity={1} />
      <Drift />
    </Canvas>
  );
}

function Drift() {
  const group = useRef<THREE.Group>(null);

  const points = useMemo(() => {
    let seed = 99;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    return COLORS.map((color) => {
      const count = 90;
      const arr = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        arr[i * 3] = (rand() - 0.5) * 14;
        arr[i * 3 + 1] = (rand() - 0.5) * 7;
        arr[i * 3 + 2] = (rand() - 0.5) * 4;
      }
      return { color, arr };
    });
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.z += delta * 0.015;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.25;
  });

  return (
    <group ref={group}>
      {points.map((p) => (
        <points key={p.color}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[p.arr, 3]} />
          </bufferGeometry>
          <pointsMaterial size={0.06} color={p.color} transparent opacity={0.4} sizeAttenuation />
        </points>
      ))}
    </group>
  );
}
