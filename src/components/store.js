// import React from 'react';
import { configureStore, createSlice } from '@reduxjs/toolkit';
// import { createAction, createReducer } from '@reduxjs/toolkit';
// import { nanoid } from 'nanoid';

export const initialState = {
  items: [{ id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' }],
  filters: '',
};

const slice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact(state, action) {
      state.items.push(action.payload);
    },

    filteredItems(state, action) {
      state.filters = action.payload;
    },

    deleteContact(state, action) {
      const newContacts = state.items.filter(el => el.id !== action.payload);
      return { ...state, items: newContacts };
    },
  },
});

export const store = configureStore({
  reducer: {
    myContacts: slice.reducer,
  },
});

export const { addContact, filteredItems, deleteContact } = slice.actions;
