import { configureStore } from '@reduxjs/toolkit';
import { appReducer, projectsReducer } from './reducers';

export const store = configureStore({
	reducer: { projects: projectsReducer, app: appReducer },
});
