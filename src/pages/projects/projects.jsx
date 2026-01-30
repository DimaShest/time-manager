import { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { appActions } from '../../reducers/appSlice';
import { deleteProjectThunk, fetchProjectsThunk } from '../../actions';
import { Modal, PageTitle } from '../../components';
import { Button, Loader } from '../../components/UI';
import { Project } from './components';
import { PAGE, STATUS } from '../../constants';
import styles from './projects.module.css';

export const Projects = () => {
	const status = useSelector(({ projects }) => projects.status);
	const projects = useSelector(({ projects }) => projects.projectsData);
	const selectedProjectId = useSelector(({ projects }) => projects.selectedProjectId);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useLayoutEffect(() => {
		dispatch(appActions.setCurrentPage(PAGE.PROJECTS));
	}, [dispatch]);

	useEffect(() => {
		if (status === STATUS.RELOADING || status === STATUS.INIT) {
			dispatch(fetchProjectsThunk());
		}
	}, [status, dispatch]);

	const onDeleteProject = () => {
		dispatch(appActions.openModal('Удалить проект?'));
	};

	const onConfirm = () => {
		dispatch(appActions.closeModal());
		dispatch(deleteProjectThunk(selectedProjectId));
	};

	const onCancel = () => {
		dispatch(appActions.closeModal());
	};

	if (
		status === STATUS.LOADING ||
		status === STATUS.RELOADING ||
		status === STATUS.DELETING
	)
		return <Loader />;

	return (
		status === STATUS.SUCCESS && (
			<div className={styles.projectsPage}>
				<div className={styles.flexSpace}>
					<PageTitle>Список проектов</PageTitle>
					<Button
						onClick={() => navigate('/project')}
						className={styles.button}
					>
						Новый проект
					</Button>
				</div>

				<div>
					{projects.length === 0 && (
						<div className={styles.missingProjects}>
							Нет ни одного проекта
						</div>
					)}
					{projects.map(({ id, name, priority, progress }) => (
						<Project
							key={id}
							id={id}
							name={name}
							priority={priority}
							progress={progress}
							onDeleteProject={() => onDeleteProject(id)}
						/>
					))}
				</div>
				<Modal onConfirm={onConfirm} onCancel={onCancel} />
			</div>
		)
	);
};
