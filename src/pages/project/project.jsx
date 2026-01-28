import { ProjectForm } from './components/project-form/project-form';
import styles from './project.module.css';

export const Project = () => {
	return (
		<div className={styles.project}>
			<ProjectForm />
		</div>
	);
};
