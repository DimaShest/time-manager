import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateProject } from '../api';
import { projectsActions } from '../reducers/projectsSlice';

export const updateProjectThunk = createAsyncThunk(
	'projects/update',
	async (project, { dispatch }) => {
		const loadedProject = await updateProject(project);
		dispatch(projectsActions.updateProject(loadedProject));
	},
);
