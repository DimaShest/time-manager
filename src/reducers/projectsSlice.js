import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { STATUS } from '../constants';
import { deleteProject, getProjects } from '../api';

const initialState = {
	projectsData: [],
	status: STATUS.INIT,
	error: '',
	selectedProjectId: null,
};

export const projectsSlice = createSlice({
	name: 'projects',
	initialState,
	reducers: {
		setProjects(state, action) {
			console.log('setPROjects');
			state.projectsData = action.payload;
		},
		setSelectedProjectId(state, action) {
			state.selectedProjectId = action.payload;
		},
	},
	extraReducers: (builder) =>
		builder
			.addCase(deleteProjectThunk.pending, (state) => {
				state.status = STATUS.DELETING;
			})
			.addCase(deleteProjectThunk.fulfilled, (state) => {
				state.status = STATUS.RELOADING;
			})
			.addCase(deleteProjectThunk.rejected, (state) => {
				state.status = STATUS.ERROR;
			})
			.addCase(fetchProjectsThunk.pending, (state) => {
				state.status = STATUS.LOADING;
			})
			.addCase(fetchProjectsThunk.fulfilled, (state) => {
				state.status = STATUS.SUCCESS;
			})
			.addCase(fetchProjectsThunk.rejected, (state) => {
				state.status = STATUS.ERROR;
			}),
});

export const deleteProjectThunk = createAsyncThunk('projects/delete', (id) => {
	return deleteProject(id);
});

export const { reducer: projectsReducer, actions: projectsActions } = projectsSlice;

export const fetchProjectsThunk = createAsyncThunk(
	'projects/get',
	async (_arg, { dispatch }) => {
		const loadedProjects = await getProjects();
		dispatch(projectsActions.setProjects(loadedProjects));
	},
);
