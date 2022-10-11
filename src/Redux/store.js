import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { authSlice } from './authSlice';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { passwordsReducer } from './contactsSlice';


////////////////////////////////////////////
////////////////PERSISTOR///////////////////
////////////////////////////////////////////

const persistConfigAuth = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const persistConfigPasswords = {
  key: 'passwords',
  storage,
  whitelist: ['items'],
};

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
];

////////////////////////////////////////////
///////////////////STORE////////////////////
////////////////////////////////////////////

export const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfigAuth, authSlice.reducer),
    passwords: persistReducer(persistConfigPasswords, passwordsReducer),
  },
  middleware,
  devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);
