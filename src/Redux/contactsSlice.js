import { createSlice } from '@reduxjs/toolkit';
import operations from './authOperations';

import {
  fetchPasswords,
  addPassword,
  deletePassword,
} from './contactsOperations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const passwordsSlice = createSlice({
  name: 'passwords',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: {
    [fetchPasswords.pending]: handlePending,
    [addPassword.pending]: handlePending,
    [deletePassword.pending]: handlePending,
    [fetchPasswords.rejected]: handleRejected,
    [addPassword.rejected]: handleRejected,
    [deletePassword.rejected]: handleRejected,
    [fetchPasswords.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [addPassword.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items.push(action.payload);
    },
    [deletePassword.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      const index = state.items.findIndex(
        password => password.id === action.payload
      );
      state.items.splice(index, 1);
    },
    [operations.logOut.fulfilled](state) {
      state.items = [];
      state.error = null;
      state.isLoading = false;
    },
  },
});

export const passwordsReducer = passwordsSlice.reducer;
