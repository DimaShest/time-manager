import { useState } from 'react';
import { PageTitle } from '../../../../components';
import { Input } from '../../../../components/UI';
import styles from './project-form.module.css';
import { PROJECT_PRIORITY } from '../../../../constants';

export const ProjectForm = () => {
	const [project, setProject] = useState({
		id: null,
		name: '',
		timeComplete: 0,
		priority: PROJECT_PRIORITY.LOW,
	});

	return (
		<div className={styles.projectForm}>
			<PageTitle>Создание нового проекта</PageTitle>
			<label className={styles.label} htmlFor="name">
				Название:
			</label>
			<Input
				id="name"
				value={project.name}
				type="text"
				onChange={({ target }) =>
					setProject((project) => ({ ...project, name: target.value }))
				}
			/>
			<label className={styles.label} htmlFor="timeComplete">
				Время на выполнение (в часах):
			</label>
			<Input
				id="timeComplete"
				value={project.timeComplete}
				type="number"
				onChange={({ target }) =>
					setProject((project) => ({ ...project, timeComplete: target.value }))
				}
			/>
			<label className={styles.label} htmlFor="priority">
				Приоритет:
			</label>
			<select
				id="priority"
				value={project.priority}
				onChange={({ target }) =>
					setProject((project) => ({ ...project, priority: target.value }))
				}
			>
				{Object.values(PROJECT_PRIORITY).map((priority) => (
					<option key={priority} value={priority}>
						{priority}
					</option>
				))}
			</select>
		</div>
	);
};
