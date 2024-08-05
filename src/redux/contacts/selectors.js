export const selectAllContacts = (state) => state.contacts.items;
export const selectLoading = state => state.contacts.loading;
export const selectError = state => state.contacts.error;
export const selectFilteredContacts = (state) => {
  const { items } = state.contacts;
  const { name } = state.filters;
  return items.filter(contact => contact.name.toLowerCase().includes(name.toLowerCase()));
};