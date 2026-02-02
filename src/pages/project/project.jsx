import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useNavigate, useParams } from 'react-router-dom';
import { fetchProjectThunk } from '../../actions';
import { Button, Loader } from '../../components/UI';
import { ProjectForm } from './components';
import { STATUS } from '../../constants';
import styles from './project.module.css';

export const Project = () => {
	const isCreating = !!useMatch('/project');
	const isEditing = !!useMatch('/project/:id/edit');
	const projectData = useSelector(({ projects }) => projects.currentProjectData);
	const params = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const status = useSelector(({ projects }) => projects.status);

	useEffect(() => {
		if (status === STATUS.RELOADING) dispatch(fetchProjectThunk(params.id));
	}, [status, dispatch, params.id]);

	useEffect(() => {
		if (isCreating) {
			return;
		}
		dispatch(fetchProjectThunk(params.id));
	}, [isCreating, dispatch, params.id]);

	if (isCreating) return <ProjectForm />;
	if (status === STATUS.LOADING) return <Loader />;

	const editableProjectData = {
		id: projectData.id,
		name: projectData.name,
		description: projectData.description,
		timeComplete: projectData.timeComplete,
		priority: projectData.priority,
		progressDetemination: projectData.progressDetemination,
	};

	if (isEditing)
		return <ProjectForm project={editableProjectData} isEditing={isEditing} />;

	return (
		<div className={styles.project}>
			<div className={styles.flexRowSpace}>
				<div className={styles.name}>{projectData.name}</div>
				<img
					src="/settings-icon.svg"
					className={styles.icon}
					onClick={() => navigate(`/project/${projectData.id}/edit`)}
				/>
			</div>
			<hr />
			{projectData.description !== '' && (
				<>
					<label className={styles.itemName}>Описание: </label>
					<div className={styles.description}>{projectData.description}</div>
				</>
			)}
			<label className={styles.itemName}>Приоритет: </label>
			<span className={styles.itemValue}>{` ${projectData.priority}`}</span>
			<br />
			<label className={styles.itemName}>Определение прогресса: </label>
			<span
				className={styles.itemValue}
			>{` ${projectData.progressDetemination}`}</span>
			<br />
			<label className={styles.itemName}>Прогресс: </label>
			<span className={styles.itemValue}>{` ${projectData.progress}%`}</span>
			<br />
			<label className={styles.itemName}>Потрачено времени: </label>
			<span className={styles.itemValue}>{` ${projectData.timeSpent} ч.`}</span>
			<br />
			<label className={styles.itemName}>Установлено времени: </label>
			<span className={styles.itemValue}>{` ${projectData.timeComplete} ч.`}</span>
			<br />
			<Button className={styles.button} onClick={() => navigate('/projects')}>
				ОК
			</Button>
		</div>
	);
};
