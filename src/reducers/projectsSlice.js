import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	projectsData: [],
	isLoading: false,
	error: '',
};

export const projectsSlice = createSlice({
	name: 'projects',
	initialState,
	reducers: {
		loadProjects(state, action) {
			state.projectsData = action.payload;
		},
	},
});

export default projectsSlice.reducer;
