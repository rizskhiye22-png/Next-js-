"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const PALETTE = ["#5B9BD8", "#FF8FA8", "#FFCE7A", "#A8E8D4"];

function seededRand(seedInit = 7) {
  let seed = seedInit;
  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

function ParticleField({ count = 320 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const rand = seededRand(21);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (rand() - 0.5) * 16;
      arr[i * 3 + 1] = (rand() - 0.5) * 10;
      arr[i * 3 + 2] = (rand() - 0.5) * 6;
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.03;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.045} color="#5B9BD8" transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

function Shape({
  kind,
  position,
  color,
  speed = 1.4,
  scale = 1,
}: {
  kind: "torus" | "icosahedron" | "octahedron" | "sphere";
  position: [number, number, number];
  color: string;
  speed?: number;
  scale?: number;
}) {
  return (
    <Float speed={speed} rotationIntensity={0.9} floatIntensity={1.6}>
      <mesh position={position} scale={scale}>
        {kind === "torus" && <torusGeometry args={[0.55, 0.22, 24, 48]} />}
        {kind === "icosahedron" && <icosahedronGeometry args={[0.55, 0]} />}
        {kind === "octahedron" && <octahedronGeometry args={[0.6, 0]} />}
        {kind === "sphere" && <sphereGeometry args={[0.5, 32, 32]} />}
        <meshStandardMaterial color={color} roughness={0.35} metalness={0.15} />
      </mesh>
    </Float>
  );
}

// Parallax 3D: seluruh grup merespons posisi mouse dengan lerp halus.
function ParallaxRig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    const { x, y } = state.pointer;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, x * 0.25, 2.5, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -y * 0.18, 2.5, delta);
  });
  return <group ref={group}>{children}</group>;
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[4, 6, 6]} intensity={1.1} />
      <ParallaxRig>
        <ParticleField />
        <Shape kind="torus" position={[-4.2, 1.4, -1]} color={PALETTE[0]} />
        <Shape kind="icosahedron" position={[4.4, 1.8, -2]} color={PALETTE[1]} speed={1.1} />
        <Shape kind="octahedron" position={[3.6, -1.8, -1]} color={PALETTE[2]} speed={1.7} />
        <Shape kind="sphere" position={[-3.8, -1.9, -2]} color={PALETTE[3]} speed={1.2} scale={0.8} />
        <Shape kind="icosahedron" position={[0.4, 2.6, -3]} color={PALETTE[0]} speed={0.9} scale={0.6} />
      </ParallaxRig>
    </Canvas>
  );
}
