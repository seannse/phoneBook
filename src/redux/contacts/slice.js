import { createSlice } from '@reduxjs/toolkit';
import {
  getContacts,
  addContact,
  removeContact,
  updateContact,
} from './operations';

const initialState = {
  contacts: [],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,

  extraReducers: builder => {
    builder
      .addCase(getContacts.fulfilled, (state, action) => {
        state.contacts = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts = [...state.contacts, action.payload];
      })
      .addCase(removeContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(
          el => el.id !== action.payload.id
        );
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.map(el =>
          el.id !== action.payload.id ? el : action.payload
        );
      });
  },
});

export const contactsReducer = contactsSlice.reducer;
