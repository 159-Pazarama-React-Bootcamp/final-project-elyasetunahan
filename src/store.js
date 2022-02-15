import { configureStore } from '@reduxjs/toolkit';
import adminSlice from './redux/adminSlice';
import createApplicationSlice from './redux/createApplicationSlice';

const store = configureStore({
  reducer: {
    createApplication: createApplicationSlice,
    admin: adminSlice,
  },
});

export default store;
