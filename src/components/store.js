import { configureStore, createSlice } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

export const initialState = {
  items: [{ id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' }],
  filters: '',
};

const persistConfig = {
  key: 'root',
  storage,
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

const persistedReducer = persistReducer(persistConfig, slice.reducer);

export const store = configureStore({
  reducer: {
    myContacts: persistedReducer,
  },
});

export const persistor = persistStore(store);

export const { addContact, filteredItems, deleteContact } = slice.actions;
