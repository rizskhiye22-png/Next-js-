"use client";

import { ReactNode, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/use3DEnabled";

type Ripple = { id: number; x: number; y: number; size: number };

type Props = {
  href?: string;
  className?: string;
  children: ReactNode;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent) => void;
  ariaDisabled?: boolean;
};

// Tombol/link magnetik + ripple saat klik (pengganti .magnetic + btn-ripple vanilla).
export default function Magnetic({
  href,
  className = "",
  children,
  target,
  rel,
  onClick,
  ariaDisabled,
}: Props) {
  const reduced = usePrefersReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 16 });
  const sy = useSpring(y, { stiffness: 200, damping: 16 });
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.25);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.25);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.6;
    const id = Date.now() + Math.random();
    setRipples((r) => [
      ...r,
      { id, x: e.clientX - rect.left - size / 2, y: e.clientY - rect.top - size / 2, size },
    ]);
    window.setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 650);
    onClick?.(e);
  };

  const rippleEls = ripples.map((r) => (
    <span
      key={r.id}
      className="btn-ripple"
      style={{ width: r.size, height: r.size, left: r.x, top: r.y }}
    />
  ));

  const motionProps = {
    className,
    style: { x: sx, y: sy },
    onMouseMove,
    onMouseLeave: onLeave,
    onClick: handleClick,
  };

  if (href) {
    return (
      <motion.a href={href} target={target} rel={rel} aria-disabled={ariaDisabled || undefined} {...motionProps}>
        {children}
        {rippleEls}
      </motion.a>
    );
  }
  return (
    <motion.button type="button" aria-disabled={ariaDisabled || undefined} {...motionProps}>
      {children}
      {rippleEls}
    </motion.button>
  );
}
