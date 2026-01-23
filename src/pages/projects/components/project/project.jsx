import { useMemo, useState } from 'react';
import { PROJECT_PRIORITY_RUSSIAN } from '../../../../constants';
import { Hint } from '../../../../components/UI';
import { deboounce } from '../../../../utils';
import { useHint } from '../../../../hooks';
import styles from './project.module.css';

export const Project = ({ name, priority, progress }) => {
	const [isShowSettings, setIsShowSettings] = useState(false);
	const { hint, onHint } = useHint();

	const delayedOnHint = useMemo(() => deboounce(onHint, 250), [onHint]);

	return (
		<div className={styles.project}>
			<span
				style={{
					width: `${progress}%`,
					background: `linear-gradient(90deg, var(--blue), var(--${priority})`,
				}}
			></span>
			<div
				className={styles.priority}
				style={{ backgroundColor: `var(--${priority})` }}
				onMouseOver={({ type }) =>
					delayedOnHint(
						type,
						`Приоритет: ${PROJECT_PRIORITY_RUSSIAN[priority]}`,
					)
				}
				onMouseOut={({ type }) => delayedOnHint(type, '')}
				onClick={delayedOnHint}
			></div>

			<div className={styles.projectData}>
				<div className={styles.text}>{name}</div>
				<div className={styles.text}>{`${progress}%`}</div>
				<img
					className={styles.settingsBtn}
					src="menu-item-icon.png"
					onClick={() => {
						setIsShowSettings(!isShowSettings);
						delayedOnHint();
					}}
					onMouseOver={({ type }) => delayedOnHint(type, 'Функции')}
					onMouseOut={({ type }) => delayedOnHint(type, '')}
				/>

				{isShowSettings && (
					<div className={styles.settingsPanel}>
						<div className={styles.flexRow}></div>
						<img src="settings-icon.svg" className={styles.icon}></img>
						<img src="select-icon.png" className={styles.icon}></img>
						<img src="trash-icon.png" className={styles.icon}></img>
					</div>
				)}
			</div>
			<Hint>{hint}</Hint>
		</div>
	);
};
