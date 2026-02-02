import { createAsyncThunk } from '@reduxjs/toolkit';
import { projectsActions } from '../reducers/projectsSlice';
import { getProjectById } from '../api';

export const fetchProjectThunk = createAsyncThunk(
	'projects/getOne',
	async (id, { dispatch }) => {
		const loadedProject = await getProjectById(id);
		dispatch(projectsActions.setCurrentProjectData(loadedProject));
	},
);
