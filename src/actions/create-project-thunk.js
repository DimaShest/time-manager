import { createAsyncThunk } from '@reduxjs/toolkit';
import { addProject } from '../api';
import { projectsActions } from '../reducers/projectsSlice';

export const createProjectThunk = createAsyncThunk(
	'projects/create',
	async (project, { dispatch }) => {
		const loadedProject = await addProject(project);
		dispatch(projectsActions.addProject(loadedProject));
	},
);
