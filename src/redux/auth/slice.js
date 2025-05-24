import { createSlice } from '@reduxjs/toolkit';
import { register, login, logout, getCurrentUser } from './operations';

const handleAuth = (state, { payload }) => {
  state.user = payload.user;
  state.token = payload.token;
  state.isLoggedIn = true;
  state.isAuthChecked = true;
};

const initialState = {
  user: null,
  isLoggedIn: false,
  token: '',
  isAuthChecked: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, handleAuth)
      .addCase(login.fulfilled, handleAuth)
      .addCase(logout.fulfilled, state => {
        state.user = null;
        state.token = '';
        state.isLoggedIn = false;
        state.isAuthChecked = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLoggedIn = true;
        state.isAuthChecked = true;
      })
      .addCase(getCurrentUser.rejected, state => {
        state.isAuthChecked = true;
      });
  },
});

export const authReducer = authSlice.reducer;
