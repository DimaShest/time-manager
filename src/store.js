import { configureStore } from '@reduxjs/toolkit';
import { projectsReducer } from './reducers/projectsSlice';
import { appReducer } from './reducers/appSlice';

export const store = configureStore({
	reducer: { projects: projectsReducer, app: appReducer },
});
