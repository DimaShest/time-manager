import { useDispatch } from 'react-redux';
import { useLayoutEffect } from 'react';
import { appActions } from '../../reducers/appSlice';
import { PAGE } from '../../constants';
import styles from './main.module.css';

export const Main = () => {
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		dispatch(appActions.setCurrentPage(PAGE.MAIN));
	}, [dispatch]);

	return <div className={styles.main}></div>;
};
