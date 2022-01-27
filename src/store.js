import { configureStore } from '@reduxjs/toolkit';
import createApplicationSlice from './redux/createApplicationSlice';

const store = configureStore({
  reducer: {
    createApplication: createApplicationSlice,
  },
});

export default store;
