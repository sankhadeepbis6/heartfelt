import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import HeartSvg from "./heart.svg";
import LoveCharacter from "../../components/LoveCharacter/LoveCharacter";
import LoverName from "../../components/LoverName/LoverName";

export default function Home() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHeart, setIsHeart] = useState(false);
  const [yesScale, setYesScale] = useState(1); // ❤️ NEW

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const to = searchParams.get("to") ?? "Babe";

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

    return filtered[Math.floor(Math.random() * filtered.length)];
  };

  const moveNoButton = () => {
    const mul = getDifferentCombination([position.x, position.y]);

    const x = getRandomBetween(80, 160) * mul[0];
    const y = getRandomBetween(80, 160) * mul[1];

    setPosition({ x, y });

    // 💖 YES BUTTON GROWS (WITH MAX LIMIT)
    setYesScale(prev => {
      const MAX_SCALE = 2.5;
      const STEP = 0.08;
      return Math.min(prev + STEP, MAX_SCALE);
    });
  };

  const handleYes = () => {
    // Navigate to the / path
    navigate('/accept?' + searchParams.toString());
  };

  return (
    <div className={styles.container}>
      <LoveCharacter height={150} width={150} isHeart={isHeart}>
        <img
          src={HeartSvg}
          alt="heart"
          className={styles.heart}
        />
      </LoveCharacter>

      <h1 className={styles.text}>
        <LoverName>{to}</LoverName> will you be my valentine?
      </h1>

      {/* Center wrapper */}
      <div className={styles.buttonWrapper}>
        <div className={styles.buttons}>
          <button
            className={styles.yes}
            style={{ transform: `scale(${yesScale})` }}
            onMouseEnter={() => setIsHeart(true)}
            onMouseLeave={() => setIsHeart(false)}
            onClick={handleYes}
          >
            Yes 💘
          </button>

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