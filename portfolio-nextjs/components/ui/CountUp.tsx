"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

type Props = {
  target: number;
  suffix?: string;
  className?: string;
  duration?: number;
};

// Counter angka (pengganti animateCounter vanilla).
export default function CountUp({ target, suffix = "", className, duration = 1200 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" as never, amount: 0.5 });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      if (ref.current) ref.current.textContent = `${Math.round(target * eased)}${suffix}`;
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
