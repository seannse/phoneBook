import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserAPI } from '../../services/api';

export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkApi) => {
    try {
      const data = await UserAPI.register(user);
      localStorage.setItem('token', data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk('auth/login', async (user, thunkApi) => {
  try {
    const data = await UserAPI.login(user);
    localStorage.setItem('token', data.token);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const logout = createAsyncThunk('auth/logout', async (i_, thunkApi) => {
  try {
    const data = await UserAPI.logOut();
    localStorage.removeItem('token');
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue, getState }) => {
    try {
      const persistedToken = getState().auth.token;
      if (!persistedToken) return rejectWithValue();

      const data = await UserAPI.getCurrentUser(persistedToken);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
