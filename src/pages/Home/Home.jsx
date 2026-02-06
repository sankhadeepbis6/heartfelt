import { useState } from "react";
import styles from "./Home.module.css";
import HeartSvg from "./heart.svg";
import LoveCharacter from "../../components/LoveCharacter/LoveCharacter";

export default function Home() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const getRandomBetween = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const getDifferentCombination = ([a, b]) => {
    a = a > 0 ? 1 : -1;
    b = b > 0 ? 1 : -1;

    const combinations = [
      [1, 1],
      [-1, 1],
      [-1, -1],
      [1, -1],
    ];

    const filtered = combinations.filter(
      ([x, y]) => !(x === a && y === b)
    );

    // return any one (random)
    return filtered[Math.floor(Math.random() * filtered.length)];
  };

  const moveNoButton = () => {
    const mul = getDifferentCombination(
      [position.x, position.y]
    );

    const x = getRandomBetween(50, 150) * mul[0];
    const y = getRandomBetween(50, 150) * mul[1];

    setPosition({ x, y });
  };

  return (
    <div className={styles.container}>
      <LoveCharacter height={150} width={150} isHeart>
        <img
          src={HeartSvg}
          alt="heart"
          className={styles.heart}
        />
      </LoveCharacter>

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
              style={{
                transform: `translate(${position.x}px, ${position.y}px)`
              }}
              onMouseEnter={moveNoButton}
              onPointerDown={moveNoButton}
            >
              No 💔
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}