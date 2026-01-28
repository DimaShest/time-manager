import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PROJECT_PRIORITY_FOR_CSS } from '../../../../constants';
import { Hint } from '../../../../components/UI';
import { deboounce } from '../../../../utils';
import { useHint } from '../../../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { projectsActions } from '../../../../reducers/projectsSlice';
import styles from './project.module.css';

export const Project = ({ id, name, priority, progress, onDeleteProject }) => {
	const [isShowSettings, setIsShowSettings] = useState(false);
	const selectedProjectId = useSelector(({ projects }) => projects.selectedProjectId);
	const dispatch = useDispatch();
	const { hint, onHint } = useHint();

	const delayedOnHint = useMemo(() => deboounce(onHint, 250), [onHint]);

	if (isShowSettings && selectedProjectId !== id) {
		setIsShowSettings(false);
	}

	const navigate = useNavigate();

	return (
		<div className={styles.project}>
			<span
				style={{
					width: `${progress}%`,
					background: `linear-gradient(90deg, var(--blue), var(--${PROJECT_PRIORITY_FOR_CSS[priority]})`,
				}}
			></span>
			<div
				className={styles.priority}
				style={{
					backgroundColor: ` var(--${PROJECT_PRIORITY_FOR_CSS[priority]})`,
				}}
				onMouseOver={({ type }) => delayedOnHint(type, `Приоритет: ${priority}`)}
				onMouseOut={({ type }) => delayedOnHint(type, '')}
				onClick={delayedOnHint}
			></div>

			<div
				className={styles.projectData}
				onClick={() => navigate(`/project/${id}`)}
			>
				<div className={styles.text}>{name}</div>
				<div className={styles.text}>{`${progress}%`}</div>
			</div>
			<div className={styles.controlPanel}>
				<img
					className={styles.settingsBtn}
					src="menu-item-icon.png"
					onClick={() => {
						setIsShowSettings(!isShowSettings);
						dispatch(projectsActions.setSelectedProjectId(id));
						delayedOnHint();
					}}
					onMouseOver={({ type }) => delayedOnHint(type, 'Функции')}
					onMouseOut={({ type }) => delayedOnHint(type, '')}
				/>

				{isShowSettings && (
					<div className={styles.settingsPanel}>
						<div className={styles.flexRow}></div>
						<img src="settings-icon.svg" className={styles.icon} />
						<img src="select-icon.png" className={styles.icon} />
						<img
							src="trash-icon.png"
							onClick={onDeleteProject}
							className={styles.icon}
						/>
					</div>
				)}
			</div>
			<Hint>{hint}</Hint>
		</div>
	);
};
