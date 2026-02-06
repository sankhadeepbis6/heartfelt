import styles from "./LoverName.module.css";

export default function LoverName({ children }) {
	return (
		<span className={styles.name}>
			<span className={styles.heart}>❤</span>
			{children}
		</span>
	);
}