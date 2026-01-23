import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './reducers/projectsSlice';

export const store = configureStore({
	reducer: { projects: projectsReducer },
});
