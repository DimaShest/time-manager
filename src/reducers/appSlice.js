import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isHidenMenu: false,
	currentPage: null,
	modal: {
		isOpen: false,
		text: '',
	},
};

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setCurrentPage(state, action) {
			state.currentPage = action.payload;
		},
		openModal(state, action) {
			state.modal.isOpen = true;
			state.modal.text = action.payload;
		},
		closeModal(state) {
			state.modal = initialState.modal;
		},
		hideMenu(state) {
			state.isHidenMenu = true;
		},
		showMenu(state) {
			state.isHidenMenu = false;
		},
	},
});

export const { reducer: appReducer, actions: appActions } = appSlice;
