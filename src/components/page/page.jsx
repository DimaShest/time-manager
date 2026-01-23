import styles from './page.module.css';

export const Page = ({ children }) => (
	<section className={styles.page}>{children}</section>
);
