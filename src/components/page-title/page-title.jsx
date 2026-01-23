import styles from './page-title.module.css';

export const PageTitle = ({ children }) => (
	<h2 className={styles.pageTitle}>{children}</h2>
);
