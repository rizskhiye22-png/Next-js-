"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Partikel "shard" yang jatuh berbarengan dengan bounce foto intro.
export default function IntroParticles() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ alpha: true, antialias: false }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={1} />
      <Shards />
    </Canvas>
  );
}

function Shards() {
  const ref = useRef<THREE.Points>(null);
  const COUNT = 140;

  const { positions, speeds } = useMemo(() => {
    let seed = 13;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    const pos = new Float32Array(COUNT * 3);
    const spd = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (rand() - 0.5) * 10;
      pos[i * 3 + 1] = rand() * 8 - 1;
      pos[i * 3 + 2] = (rand() - 0.5) * 3;
      spd[i] = 0.6 + rand() * 1.6;
    }
    return { positions: pos, speeds: spd };
  }, []);

  useFrame((_, delta) => {
    const pts = ref.current;
    if (!pts) return;
    const arr = (pts.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3 + 1] -= speeds[i] * delta;
      if (arr[i * 3 + 1] < -4) arr[i * 3 + 1] = 7;
    }
    pts.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.07} color="#FF8FA8" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}
