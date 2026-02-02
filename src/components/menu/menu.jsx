import { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { appActions } from '../../reducers/appSlice';
import { MenuItem } from './components';
import { PAGES } from './constants';
import styles from './menu.module.css';

export const Menu = () => {
	const isHidenMenu = useSelector(({ app }) => app.isHidenMenu);
	const [isDisplayItems, setIsDisplayItems] = useState(false);
	const dispatch = useDispatch();

	const navigation = useNavigate();

	useLayoutEffect(() => {
		if (window.innerWidth <= 720) dispatch(appActions.hideMenu());
	}, [dispatch]);

	setTimeout(() => {
		setIsDisplayItems(true);
	}, 700);

	const onPage = (path) => {
		if (window.innerWidth <= 720) dispatch(appActions.hideMenu());
		navigation(path);
	};

	if (isHidenMenu) {
		return (
			<img
				className={`${styles.hidenMenu} ${styles.icon}`}
				src="/back-icon.png"
				alt="back-icon"
				onClick={() => {
					dispatch(appActions.showMenu());
					setIsDisplayItems(false);
				}}
			/>
		);
	}

	return (
		<nav className={styles.menu}>
			{isDisplayItems && (
				<>
					<img
						className={`${styles.hidenMenu} ${styles.icon}`}
						src="/forward-icon.png"
						alt="back-icon"
						onClick={() => dispatch(appActions.hideMenu())}
					/>
					<h3>Меню</h3>
					{PAGES.map(({ id, name, iconSrc, path }) => (
						<MenuItem
							key={id}
							id={id}
							name={name}
							iconSrc={iconSrc}
							onClick={() => onPage(path)}
						/>
					))}
					<MenuItem
						key={'LOGOUT'}
						id={'LOGOUT'}
						name={'Выход'}
						iconSrc={'/logout-icon.png'}
						onClick={() => onPage('/login')}
					/>
				</>
			)}
		</nav>
	);
};
