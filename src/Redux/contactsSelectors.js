export const selectLoading = state => state.passwords.loading;

export const selectFilter = state => state.passwords.filter;

export const selectError = state => state.auth.error;

export const selectAllPasswords = state => state.passwords.items;
