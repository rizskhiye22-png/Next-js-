"use client";

import { ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/use3DEnabled";

type Props = {
  className?: string;
  children: ReactNode;
  maxTilt?: number;
  glare?: boolean;
  style?: React.CSSProperties;
};

// Upgrade tilt-card: spring physics + glare dinamis mengikuti kursor.
export default function TiltCard3D({
  className = "",
  children,
  maxTilt = 8,
  glare = true,
  style,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), {
    stiffness: 180,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), {
    stiffness: 180,
    damping: 18,
  });
  const glareX = useTransform(px, [0, 1], [0, 100]);
  const glareY = useTransform(py, [0, 1], [0, 100]);
  const glareBg = useTransform<number, string>(
    [glareX, glareY],
    ([x, y]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.35), transparent 55%)`
  );

  const onMouseMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      className={`tilt-3d ${className}`}
      style={{ rotateX, rotateY, transformPerspective: 900, ...style }}
      onMouseMove={onMouseMove}
      onMouseLeave={onLeave}
    >
      {children}
      {glare && !reduced && <motion.div className="tilt-glare" style={{ background: glareBg }} />}
    </motion.div>
  );
}
