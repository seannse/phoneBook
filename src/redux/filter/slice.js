import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: { filter: '', alphabetFilter: '' },
  reducers: {
    setFilter: (state, { payload }) => {
      state.alphabetFilter = '';
      state.filter = payload;
    },
    setAlphabetFilter: (state, { payload }) => {
      state.filter = '';
      state.alphabetFilter = payload;
    },
  },
});

export const filterReducer = filterSlice.reducer;

export const { setFilter, setAlphabetFilter } = filterSlice.actions;
