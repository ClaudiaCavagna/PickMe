import {createSlice} from '@reduxjs/toolkit';
import instance from '../../api';

const initialState = {
    loading: true,
    error: {
        status: false,
        message: ""
    },
    photos: [],
    rate_limit: {
        remaining: null,
        total: 50,
    },
};

const apiSlice = createSlice({
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
        checkRateLimiter: (state, action) => {
            state.rate_limit = {...action.payload}
        }
    },
});

const { startLoading, saveData, stopLoading, cleanError, catchError, checkRateLimiter } = apiSlice.actions;

const {reducer} = apiSlice;

export const fetchData = (path) => async (dispatch) => {
    dispatch(startLoading());
    dispatch(cleanError());
    try {
        const response = await instance.get(path);
        console.log(response);
        dispatch(saveData(response.data));
        dispatch(checkRateLimiter({
            total: response.headers['x-ratelimit-limit'],
            remaining: response.headers['x-ratelimit-remaining'],
        }));
    } catch (err) {
        dispatch(catchError(err.errors));
    }
    dispatch(stopLoading());
};

export default reducer;