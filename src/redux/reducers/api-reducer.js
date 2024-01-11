import {createSlice} from '@reduxjs/toolkit';
import instance from '../../api';

const initialState = {
    loading: true,
    error: {
        status: false,
        message: ""
    },
    photos: [],
};

const apiSlice = {
    name: 'api',
    initialState,
    reducers: {
        startLoading: (state) => {
            state.loading = true;
            state.photos = [];
        },
        stopLoading: (state) => {
            state.loading= false;
        },
        saveData: (state, action) => {
            state.photos = action.payload;
        },
        catchError: (state, action) => {
            state.error.status = true;
            state.error.message = action.payload;
            state.photos = [];
        },
        cleanError: (state) => {
            state.error.state = false;
            state.error.message = "";
        },
    },
};

const { startLoading, saveData, stopLoading, cleanError, catchError } = apiSlice.actions
const {reducer} = apiSlice;

export default reducer;