import { useLayoutEffect, useState } from 'react';
import styles from './menu.module.css';
import { useNavigate } from 'react-router-dom';

export const Menu = () => {
	const [isHidenMenu, setIsHidenMenu] = useState(false);
	const [isDisplayItems, setIsDisplayItems] = useState(false);

	const navigation = useNavigate();

	useLayoutEffect(() => {
		if (window.innerWidth <= 720) setIsHidenMenu(true);
	}, []);

	setTimeout(() => {
		setIsDisplayItems(true);
	}, 700);

	const onPage = (path) => {
		if (window.innerWidth <= 720) setIsHidenMenu(true);
		navigation(path);
	};

	if (isHidenMenu)
		return (
			<img
				className={`${styles.hidenMenu} ${styles.icon}`}
				src="back-icon.png"
				alt="back-icon"
				onClick={() => {
					setIsHidenMenu(!isHidenMenu);
					setIsDisplayItems(false);
				}}
			/>
		);

	return (
		<ul className={styles.menu}>
			{isDisplayItems && (
				<>
					<img
						className={`${styles.hidenMenu} ${styles.icon}`}
						src="forward-icon.png"
						alt="back-icon"
						onClick={() => setIsHidenMenu(!isHidenMenu)}
					/>
					<h3>Меню</h3>
					<li className={styles.menuItem} onClick={() => onPage('/')}>
						<img
							className={styles.icon}
							src="timer-icon.png"
							alt="timer-icon"
						/>
						<div className={styles.text}>Главная</div>
					</li>
					<li className={styles.menuItem} onClick={() => onPage('/projects')}>
						<img
							className={styles.icon}
							src="projects-icon.png"
							alt="projects-icon"
						/>
						<div className={styles.text}>Проекты</div>
					</li>
					<li className={styles.menuItem} onClick={() => onPage('/analytics')}>
						<img
							className={styles.icon}
							src="analytics-icon.png"
							alt="analytics-icon"
						/>
						<div className={styles.text}>Аналитика</div>
					</li>
					<li className={styles.menuItem} onClick={() => onPage('account')}>
						<img
							className={styles.icon}
							src="account-icon.png"
							alt="account-icon"
						/>
						<div className={styles.text}>Аккаунт</div>
					</li>
					<li className={styles.menuItem} onClick={() => onPage('/login')}>
						<img
							className={styles.icon}
							src="logout-icon.png"
							alt="logout-icon"
						/>
						<div className={styles.text} onClick={() => navigation('/')}>
							Выход
						</div>
					</li>
				</>
			)}
		</ul>
	);
};
