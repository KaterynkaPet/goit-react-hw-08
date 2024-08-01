import { createSlice, createSelector } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./contactsOps";
import { selectNameFilter } from "./filtersSlice";


const formatPhoneNumber = (value) => {
  const phoneNumber = value.replace(/[^\d]/g, '');
  const match = phoneNumber.match(/^(\d{0,3})(\d{0,2})(\d{0,2})$/);
  if (match) {
    return match.slice(1).filter(Boolean).join('-');
  }
  return '';
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
    .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((contact) => contact.id !== action.payload);
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});


export const selectContactsState = (state) => state.contacts;

export const selectContacts = createSelector(
  [selectContactsState],
  (contactsState) => contactsState.items
);

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filter) => {
    return contacts.filter((contact) =>
  contact.name.toLowerCase().includes(filter ? filter.toLowerCase() : '')
);
  }
);

export const selectLoading = createSelector(
  [selectContactsState],
  (contactsState) => contactsState.loading
);
export const selectError = createSelector(
  [selectContactsState],
  (contactsState) => contactsState.error
);

export default contactsSlice.reducer;