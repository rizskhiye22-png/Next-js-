"use client";

import { ReactNode, useRef } from "react";
import { useInView } from "framer-motion";

// Mount canvas 3D hanya saat container-nya terlihat di viewport
// (+ margin 300px), dan unmount saat jauh keluar viewport → hemat GPU/battery.
export default function LazyCanvas({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "300px 0px 300px 0px" as never });

  return (
    <div ref={ref} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {inView ? children : null}
    </div>
  );
}
