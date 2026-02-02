import styles from './page-title.module.css';

export const PageTitle = ({ children }) => (
	<div className={styles.flexSpace}>
		<h2 className={styles.pageTitle}>{children}</h2>
		<hr />
	</div>
);
