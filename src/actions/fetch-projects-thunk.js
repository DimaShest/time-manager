import { createAsyncThunk } from '@reduxjs/toolkit';
import { projectsActions } from '../reducers/projectsSlice';
import { getProjects } from '../api';

export const fetchProjectsThunk = createAsyncThunk(
	'projects/get',
	async (_arg, { dispatch }) => {
		const loadedProjects = await getProjects();
		dispatch(projectsActions.setProjects(loadedProjects));
	},
);
