import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteProject } from '../api';

export const deleteProjectThunk = createAsyncThunk('projects/delete', (id) => {
	return deleteProject(id);
});
