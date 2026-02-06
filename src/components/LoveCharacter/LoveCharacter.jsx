import { useMemo } from "react";
import styles from "./LoveCharacter.module.css";

const pseudoRandom = (seed) => {
	const x = Math.sin(seed) * 10000;
	return x - Math.floor(x);
};

const LoveCharacter = ({
	height = 200,
	width = 200,
	isHeart = false,
	heartCount = 28,
	children
}) => {
	const hearts = useMemo(() => {
		const duration = 7;

		return Array.from({ length: heartCount }).map((_, i) => {
			const angle = pseudoRandom(i + 1) * 90 - 45;
			const distance = 650 + pseudoRandom(i + 10) * 300;

			return {
				id: i,
				style: {
					"--angle": `${angle}deg`,
					"--distance": `${distance}px`,
					animationDelay: `${(duration / heartCount) * i}s`
				}
			};
		});
	}, [heartCount]);

	return (
		<div className={styles.wrapper} style={{ height, width }}>
			{/* Hearts ALWAYS mounted */}
			<div
				className={`${styles.heartLayer} ${isHeart ? styles.active : styles.inactive
					}`}
			>
				{hearts.map((h) => (
					<span key={h.id} className={styles.heart} style={h.style}>
						❤️
					</span>
				))}
			</div>

			<div className={styles.character}>{children}</div>
		</div>
	);
};

export default LoveCharacter;