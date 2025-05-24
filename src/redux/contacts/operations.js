import { createAsyncThunk } from '@reduxjs/toolkit';
import { ContactsAPI } from '../../services/api';
import { Notify } from 'notiflix';

export const getContacts = createAsyncThunk(
  'contacts/getContacts',
  async (_, thunkApi) => {
    try {
      const contacts = await ContactsAPI.fetchContacts();
      return contacts;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkApi) => {
    try {
      const data = await ContactsAPI.postContact(contact);
      Notify.success(`${contact.name} has been added to contacts!`);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const removeContact = createAsyncThunk(
  'contacts/removeContact',
  async (id, thunkApi) => {
    try {
      const data = await ContactsAPI.deleteContact(id);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const updateContact = createAsyncThunk(
  'contacts/editContact',
  async (updatedContact, thunkApi) => {
    try {
      const data = await ContactsAPI.editContact(updatedContact);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
