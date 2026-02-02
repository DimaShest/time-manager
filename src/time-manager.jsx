import { Route, Routes } from 'react-router-dom';
import { Main, Project, Projects } from './pages';
import { Header, Menu, Page } from './components';
import styles from './time-manager.module.css';

export const TimeManager = () => {
	return (
		<>
			<Page>
				<Header />
				<main className={styles.main}>
					<Routes>
						<Route path="/" element={<Main />} />
						<Route path="/login" element={<div>Авторизация</div>} />
						<Route path="/register" element={<div>Регистрация</div>} />
						<Route path="/projects" element={<Projects />} />
						<Route path="/project" element={<Project />} />
						<Route path="/project/:id" element={<Project />} />
						<Route path="/project/:id/edit" element={<Project />} />
						<Route path="/analytics" element={<div>Аналитика</div>} />
						<Route path="/account" element={<div>Настройка аккаунта</div>} />
						<Route path="*" element={<div>Ошибка</div>} />
					</Routes>
				</main>
			</Page>
			<Menu />
		</>
	);
};
