import {createSlice} from '@reduxjs/toolkit';
import instance from '../../api';

const initialState = {
    query: {
        path: "",
        itemPerPage: null,
        type: "",
        query: "",
    },
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
    pagination: {
        hasNextPage: false,
        hasPrevPage: false,
        totalPages: null,
        currentPage: 1,
    }
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
        saveQuery: (state, action) => {
            state.query = action.payload;
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
        },
        updatePage: (state, action) => {
            state.pagination.currentPage = action.payload
        },
        checkPagination: (state, action) => {
            state.pagination.hasNextPage = action.payload.hasNextPage;
            state.pagination.hasPrevPage = action.payload.hasPrevPage;
            state.pagination.totalPages = action.payload.totalPages;
        },
    },
});

const { startLoading, saveData, saveQuery, stopLoading, cleanError, catchError, checkRateLimiter, updatePage, checkPagination } = apiSlice.actions;

export { cleanError, catchError, saveQuery, updatePage };

const {reducer} = apiSlice;

export const fetchData = (path) => async (dispatch, getState) => {
    dispatch(startLoading());
    dispatch(cleanError());
    try {
        const response = await instance.get(path);
        if(response.data?.total_pages) {
            const { currentPage } = getState().photos.pagination;
            const paginationInfo = {
                hasPrevPage: currentPage > 1,
                hasNextPage: currentPage + 1 <= response?.data?.total_pages,
                totalPages: response?.data?.total_pages,
            }

            dispatch(checkPagination(paginationInfo))
        }
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