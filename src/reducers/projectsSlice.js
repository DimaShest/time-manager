import { createSlice } from '@reduxjs/toolkit';
import { createProjectThunk, deleteProjectThunk, fetchProjectsThunk } from '../actions';
import { STATUS } from '../constants';

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
			state.projectsData = action.payload;
		},
		setSelectedProjectId(state, action) {
			state.selectedProjectId = action.payload;
		},
		addProject(state, action) {
			state.projectsData.push(action.payload);
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
			})
			.addCase(createProjectThunk.pending, (state) => {
				state.status = STATUS.CREATING;
			})
			.addCase(createProjectThunk.fulfilled, (state) => {
				state.status = STATUS.RELOADING;
			})
			.addCase(createProjectThunk.rejected, (state) => {
				state.status = STATUS.ERROR;
			}),
});

export const { reducer: projectsReducer, actions: projectsActions } = projectsSlice;
