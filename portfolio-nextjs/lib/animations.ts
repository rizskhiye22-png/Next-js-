// Util & konstanta animasi bersama (Framer Motion / GSAP).

// easeOutBounce klasik (dipakai GSAP intro bounce sebelumnya — disimpan
// sebagai referensi matematis, GSAP pakai "bounce.out" bawaan).
export function easeOutBounce(t: number): number {
  const n1 = 7.5625;
  const d1 = 2.75;
  if (t < 1 / d1) return n1 * t * t;
  if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
  if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
  return n1 * (t -= 2.625 / d1) * t + 0.984375;
}

// Lenis easing (sama dengan project vanilla: easeOutCubic)
export const lenisEasing = (t: number) => 1 - Math.pow(1 - t, 3);

// Variants Framer Motion umum
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
