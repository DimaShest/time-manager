import { createSlice } from '@reduxjs/toolkit';
import {
	createProjectThunk,
	deleteProjectThunk,
	fetchProjectsThunk,
	fetchProjectThunk,
	updateProjectThunk,
} from '../actions';
import { PROGRESS_DETERMINATION, PROJECT_PRIORITY, STATUS } from '../constants';

const initialState = {
	projectsData: [],
	currentProjectData: {
		id: null,
		name: '',
		description: '',
		progress: 0,
		timeComplete: 0,
		timeSpent: 0,
		priority: PROJECT_PRIORITY.LOW,
		progressDetemination: PROGRESS_DETERMINATION.TIME,
	},
	status: STATUS.INIT,
	error: '',
	selectedProjectId: null,
};

export const projectsSlice = createSlice({
	name: 'projects',
	initialState,
	reducers: {
		setProjects(state, { payload }) {
			state.projectsData = payload;
		},
		setCurrentProjectData(state, { payload }) {
			state.currentProjectData = payload;
		},
		setSelectedProjectId(state, { payload }) {
			state.selectedProjectId = payload;
		},
		setStatus(state, { payload }) {
			state.status = payload;
		},
		addProject(state, { payload }) {
			state.projectData.push(payload);
		},
		updateProject(state, { payload }) {
			const projectIndex = state.projectsData.findIndex((p) => p.id === payload.id);
			state.projectsData[projectIndex] = payload;
		},
	},
	extraReducers: (builder) =>
		builder
			// fetch Projects
			.addCase(fetchProjectsThunk.pending, (state) => {
				state.status = STATUS.LOADING;
			})
			.addCase(fetchProjectsThunk.fulfilled, (state) => {
				state.status = STATUS.SUCCESS;
			})
			.addCase(fetchProjectsThunk.rejected, (state, action) => {
				state.status = STATUS.ERROR;
				state.error = action.error.message;
			})
			// fetch Project
			.addCase(fetchProjectThunk.pending, (state) => {
				state.status = STATUS.LOADING;
			})
			.addCase(fetchProjectThunk.fulfilled, (state) => {
				state.status = STATUS.SUCCESS;
			})
			.addCase(fetchProjectThunk.rejected, (state) => {
				state.status = STATUS.ERROR;
			})
			// create Project
			.addCase(createProjectThunk.pending, (state) => {
				state.status = STATUS.CREATING;
			})
			.addCase(createProjectThunk.fulfilled, (state) => {
				state.status = STATUS.RELOADING;
			})
			.addCase(createProjectThunk.rejected, (state, action) => {
				state.status = STATUS.ERROR;
				state.error = action.error.message;
			})
			// update Project
			.addCase(updateProjectThunk.pending, (state) => {
				state.status = STATUS.UPDATING;
			})
			.addCase(updateProjectThunk.fulfilled, (state) => {
				state.status = STATUS.RELOADING;
			})
			.addCase(updateProjectThunk.rejected, (state, action) => {
				state.status = STATUS.ERROR;
				state.error = action.error.message;
			})
			// delete Project
			.addCase(deleteProjectThunk.pending, (state) => {
				state.status = STATUS.DELETING;
			})
			.addCase(deleteProjectThunk.fulfilled, (state) => {
				state.status = STATUS.RELOADING;
			})
			.addCase(deleteProjectThunk.rejected, (state) => {
				state.status = STATUS.ERROR;
			}),
});

export const { reducer: projectsReducer, actions: projectsActions } = projectsSlice;
