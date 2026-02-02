import { useSelector } from 'react-redux';
import styles from './page.module.css';

export const Page = ({ children }) => {
	const isHidenMenu = useSelector(({ app }) => app.isHidenMenu);

	return (
		<div className={isHidenMenu ? styles.pageWithoutMenu : styles.pageWithMenu}>
			{children}
		</div>
	);
};
