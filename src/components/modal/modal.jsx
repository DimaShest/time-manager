import { useSelector } from 'react-redux';
import { Button } from '../UI';
import styles from './modal.module.css';

export const Modal = ({ onConfirm, onCancel }) => {
	const { text, isOpen } = useSelector(({ app }) => app.modal);

	if (!isOpen) {
		return null;
	}

	return (
		<div className={styles.modal}>
			<div className={styles.overlay}></div>
			<div className={styles.box}>
				<h3 className={styles.text}>{text}</h3>
				<div className={styles.buttons}>
					<Button onClick={onConfirm}>Да</Button>
					<Button onClick={onCancel}>Отмена</Button>
				</div>
			</div>
		</div>
	);
};
