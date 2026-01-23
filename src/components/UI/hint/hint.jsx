import styles from './hint.module.css';

export const Hint = ({ children }) =>
	children !== '' && <div className={styles.hint}>{children}</div>;
