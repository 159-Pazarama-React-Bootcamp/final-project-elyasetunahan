import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const createApplicationSlice = createSlice({
  name: 'createApplication',
  initialState,
  reducers: {
    create: (state, action) => {
      state.application = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { create } = createApplicationSlice.actions;

export default createApplicationSlice.reducer;
