import { useSelector } from 'react-redux';
import styles from './menu-item.module.css';

export const MenuItem = ({ id, name, iconSrc, onClick }) => {
	const currentPage = useSelector(({ app }) => app.currentPage);
	const alt = `${id} icon`;
	let className = `${styles.menuItem}`;

	if (currentPage === id) {
		className += ` ${styles.currentItem}`;
	}

	return (
		<li className={className} onClick={onClick}>
			<img className={styles.icon} src={iconSrc} alt={alt} />
			<div className={styles.text}>{name}</div>
		</li>
	);
};
