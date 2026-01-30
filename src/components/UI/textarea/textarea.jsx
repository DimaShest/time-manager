import styles from './textarea.module.css';

export const Textarea = ({ ...props }) => (
	<textarea className={styles.textarea} {...props}></textarea>
);
