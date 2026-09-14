"use client";

import { useEffect, useState } from "react";

const WORD = "ようこそ";
const CHAR_DELAY = 90;
const CHAR_DURATION = 550;

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [hiding, setHiding] = useState(false);
  const [romajiVisible, setRomajiVisible] = useState(false);

  useEffect(() => {
    document.body.classList.add("preloader-active");

    const totalTextTime = (WORD.length - 1) * CHAR_DELAY + CHAR_DURATION;
    const t1 = window.setTimeout(() => setRomajiVisible(true), totalTextTime - 150);
    const t2 = window.setTimeout(() => {
      setHiding(true);
      document.body.classList.remove("preloader-active");
      window.dispatchEvent(new CustomEvent("maul:preloader-done"));
      window.setTimeout(() => setVisible(false), 800);
    }, totalTextTime + 700);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      document.body.classList.remove("preloader-active");
    };
  }, []);

  if (!visible) return null;

  return (
    <div id="preloader" className={hiding ? "preloader-hide" : ""}>
      <div className="preloader-glow" />
      <div className="preloader-inner">
        <span className="preloader-jp">
          {[...WORD].map((ch, i) => (
            <span key={i} className="char" style={{ animationDelay: `${i * CHAR_DELAY}ms` }}>
              {ch}
            </span>
          ))}
        </span>
        <span className={`preloader-romaji${romajiVisible ? " is-visible" : ""}`}>yōkoso</span>
      </div>
    </div>
  );
}
