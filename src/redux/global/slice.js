import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { register, login } from '../auth/operations';
import {
  addContact,
  getContacts,
  removeContact,
  updateContact,
} from '../contacts/operations';

const initialState = {
  isLoading: false,
  error: null,
  theme: 'light',
  isModalAddContactOpen: false,
  isModalDeleteContactOpen: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setTheme: (state, { payload }) => {
      state.theme = payload;
    },
    setIsModalAddContactOpen: state => {
      state.isModalAddContactOpen = !state.isModalAddContactOpen;
    },
    setIsModalDeleteContactOpen: state => {
      state.isModalDeleteContactOpen = !state.isModalDeleteContactOpen;
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(isAnyOf(...getActions('pending')), handlePending)
      .addMatcher(isAnyOf(...getActions('rejected')), handleRejected)
      .addMatcher(isAnyOf(...getActions('fulfilled')), handleFulfilled);
  },
});

function handlePending(state) {
  state.isLoading = true;
  state.error = null;
}

function handleRejected(state, action) {
  state.isLoading = false;
  state.error = action.payload;
}

function handleFulfilled(state) {
  state.isLoading = false;
}

function getActions(type) {
  const actions = [
    register,
    login,
    getContacts,
    addContact,
    removeContact,
    updateContact,
  ];
  return actions.map(action => action[type]);
}

export const {
  setTheme,
  setIsModalAddContactOpen,
  setIsModalDeleteContactOpen,
} = globalSlice.actions;
export const globalReducer = globalSlice.reducer;
