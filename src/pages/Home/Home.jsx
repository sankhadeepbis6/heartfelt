import { useState } from "react";
import styles from "./Home.module.css";
import HeartSvg from "./heart.svg";

export default function Home() {
  const [noStyle, setNoStyle] = useState({});

  const moveNoButton = () => {
    const x = Math.random() * 260 - 130;
    const y = Math.random() * 160 - 80;

    setNoStyle({
      transform: `translate(${x}px, ${y}px)`
    });
  };

  return (
    <div className={styles.container}>
      <img
        src={HeartSvg}
        alt="heart"
        className={styles.heart}
      />

      <h1 className={styles.text}>
        &lt;name&gt; will you be my valentine? 💖
      </h1>

      {/* Center wrapper */}
      <div className={styles.buttonWrapper}>
        <div className={styles.buttons}>
          <button className={styles.yes}>Yes 💘</button>

          <div className={styles.noSlot}>
            <div className={styles.placeholder}></div>

            <button
              className={styles.no}
              style={noStyle}
              onMouseEnter={moveNoButton}
            >
              No 💔
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}