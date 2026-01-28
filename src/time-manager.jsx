import { Route, Routes } from 'react-router-dom';
import { Main, Project, Projects } from './pages';
import { Menu, Page } from './components';
import styles from './time-manager.module.css';

export const TimeManager = () => {
	return (
		<>
			<div className={styles.timeManager}>
				<Page>
					<Routes>
						<Route path="/" element={<Main />} />
						<Route path="/login" element={<div>Авторизация</div>} />
						<Route path="/register" element={<div>Регистрация</div>} />
						<Route path="/projects" element={<Projects />} />
						<Route path="/project" element={<Project />} />
						<Route
							path="/project/:id/edit"
							element={<div>Редактирование проекта</div>}
						/>
						<Route path="/analytics" element={<div>Аналитика</div>} />
						<Route path="/account" element={<div>Настройка аккаунта</div>} />
						<Route path="*" element={<div>Ошибка</div>} />
					</Routes>
				</Page>
			</div>
			<Menu />
		</>
	);
};
