import { configureStore } from '@reduxjs/toolkit';
import apireducer from './reducers/api-reducer';

const store = configureStore({
    reducer: {
        photos: apireducer,
    },
});

export default store;