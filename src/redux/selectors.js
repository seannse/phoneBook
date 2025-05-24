import { createSelector } from '@reduxjs/toolkit';

/*** global ***/
export const selectIsLoading = state => state.global.isLoading;
export const selectError = state => state.global.error;
export const selectTheme = state => state.global.theme;
export const selectIsModalAddContactOpen = state =>
  state.global.isModalAddContactOpen;
export const selectIsModalDeleteContactOpen = state =>
  state.global.isModalDeleteContactOpen;

/*** filter ***/
export const selectFilter = state => {
  return state.filter;
};

/*** auth ***/
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectUser = state => {
  return state.auth.user;
};
export const selectToken = state => state.auth.token;
export const selectIsAuthChecked = state => state.auth.isAuthChecked;

/*** contacts ***/
export const selectContacts = state => {
  return state.contacts.contacts;
};
export const selectContactDetail = state => {
  return state.contacts.contactDetail;
};
export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filterValue) => {
    return contacts.filter(contact => {
      return contact.name
        .toLowerCase()
        .includes(filterValue.trim().toLowerCase());
    });
  }
);
