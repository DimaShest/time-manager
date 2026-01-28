import styles from './button.module.css';

export const Button = ({ className, children, ...props }) => {
	return (
		<button className={`${styles.button} ${className}`} {...props}>
			{children}
		</button>
	);
};
