"use client";

import { CSSProperties, ReactNode, useRef } from "react";
import { useInView } from "framer-motion";

type RevealProps = {
  className?: string;
  children: ReactNode;
  id?: string;
  style?: CSSProperties;
  margin?: string;
  threshold?: number;
};

// Pengganti IntersectionObserver manual: menambahkan .is-visible
// saat elemen masuk viewport (sekali saja). Semua transisi CSS asli
// (fword, fchar, wword, badge-pop, dst.) tetap bekerja seperti semula.
export default function Reveal({
  className = "",
  children,
  id,
  style,
  margin = "0px 0px -15% 0px",
  threshold = 0.15,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: true,
    margin: margin as never,
    amount: threshold,
  });

  return (
    <div ref={ref} id={id} style={style} className={`${className}${inView ? " is-visible" : ""}`}>
      {children}
    </div>
  );
}
