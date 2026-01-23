import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PROJECT_PRIORITY } from '../../constants';
import { projectsSlice } from '../../reducers';
import { PageTitle } from '../../components';
import { Loader } from '../../components/UI';
import { Project } from './components';
import styles from './projects.module.css';

const projects = [
	{
		id: 4,
		name: 'Трудоустройство Fronted Developer',
		progress: 5,
		priority: PROJECT_PRIORITY.HIGH,
	},
	{
		id: 6,
		name: 'Страница Авторизация в рамках time manager',
		progress: 12,
		priority: PROJECT_PRIORITY.HIGH,
	},
	{
		id: 1,
		name: 'Веб-приложение Блог в качестве практики на React',
		progress: 88,
		priority: PROJECT_PRIORITY.MEDIUM,
	},
	{
		id: 3,
		name: 'Страница Список проектов',
		progress: 0,
		priority: PROJECT_PRIORITY.MEDIUM,
	},
	{
		id: 2,
		name: 'Главная страница',
		progress: 33,
		priority: PROJECT_PRIORITY.LOW,
	},
	{
		id: 5,
		name: 'Страница Аналитика',
		progress: 100,
		priority: PROJECT_PRIORITY.LOW,
	},
];

export const Projects = () => {
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();

	const { loadProjects } = projectsSlice.actions;

	const loadedProjects = useSelector((state) => state.projects.projectsData);

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
			dispatch(loadProjects(projects));
		}, 500);
	}, [dispatch, loadProjects]);

	if (isLoading) return <Loader />;

	return (
		<div className={styles.projectsPage}>
			<PageTitle>Список проектов</PageTitle>
			<div className={styles.projectsList}>
				{loadedProjects.map(({ id, name, priority, progress }) => (
					<Project
						key={id}
						name={name}
						priority={priority}
						progress={progress}
					/>
				))}
			</div>
		</div>
	);
};
