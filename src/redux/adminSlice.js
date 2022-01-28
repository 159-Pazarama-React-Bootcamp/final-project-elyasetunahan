import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedIn: false,
  applications: [],
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    setApplications: (state, action) => {
      state.applications = action.payload;
    },
    logout: (state) => {
      state.loggedIn = false;
      localStorage.clear();
    },
  },
});

export const { setLoggedIn, setApplications, logout } = adminSlice.actions;

export default adminSlice.reducer;
