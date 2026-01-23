import { Route, Routes } from 'react-router-dom';
import { Projects } from './pages';
import { Menu, Page } from './components';
// import styles from './time-manager.css';

export const TimeManager = () => {
	return (
		<>
			{/* <Header />*/}
			<Page>
				<Routes>
					<Route path="/" element={<div>Главная</div>} />
					<Route path="/login" element={<div>Авторизация</div>} />
					<Route path="/register" element={<div>Регистрация</div>} />
					<Route path="/projects" element={<Projects />} />
					<Route path="/project" element={<div>Новый проект</div>} />
					<Route
						path="/project/:id/edit"
						element={<div>Редактирование проекта</div>}
					/>
					<Route path="/analytics" element={<div>Аналитика</div>} />
					<Route path="/account" element={<div>Настройка аккаунта</div>} />
					<Route path="*" element={<div>Ошибка</div>} />
				</Routes>
			</Page>
			{/*<Footer />
			<Modal /> */}
			<Menu />
		</>
	);
};
