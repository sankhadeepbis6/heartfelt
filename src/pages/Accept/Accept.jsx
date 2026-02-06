import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./Accept.module.css";

/* 🔧 CONFIG */
const SYMBOLS = ["❤️", "🌹", "💖", "💕", "💘", "🌸", "💞", "🌷"];
const EMOJI_COUNT = 30; // 👈 TOTAL floating emojis (change freely)

export default function Accept() {
  const [searchParams] = useSearchParams();
  const floatingRef = useRef([]);

  const from = searchParams.get("from") ?? "Lovebug";
  const to = searchParams.get("to") ?? "Babe";

  // Apply randomness AFTER render (safe)
  useEffect(() => {
    floatingRef.current.forEach((el) => {
      if (!el) return;

      const left = Math.random() * 100;
      const duration = 12 + Math.random() * 10;
      const delay = Math.random() * 5;
      const sway = 20 + Math.random() * 40;

      el.style.left = `${left}%`;
      el.style.animationDuration = `${duration}s`;
      el.style.animationDelay = `${delay}s`;
      el.style.setProperty("--sway", `${sway}px`);
    });
  }, []);

  return (
    <div className={styles.container}>
      {/* Floating emojis */}
      <div className={styles.floatingLayer}>
        {Array.from({ length: EMOJI_COUNT }).map((_, i) => (
          <span
            key={i}
            ref={(el) => (floatingRef.current[i] = el)}
            className={styles.floating}
          >
            {SYMBOLS[i % SYMBOLS.length]} {/* 🔁 repeats automatically */}
          </span>
        ))}
      </div>

      {/* Center content */}
      <div className={styles.content}>
        <h1 className={styles.title}>It’s official 💖</h1>

        <p className={styles.message}>
          <span className={styles.name}>{to}</span> &{" "}
          <span className={styles.name}>{from}</span>
        </p>

        <p className={styles.subtitle}>
          are now <span className={styles.highlight}>Valentine’s Partners</span> 💘
        </p>
      </div>
    </div>
  );
}