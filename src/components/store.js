import {
  configureStore,
  getDefaultMiddleware,
  createSlice,
} from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query/react';
import authOperations from '../Redux/authOperations';
import axios from 'axios';
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

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const materialsApi = createApi({
  reducerPath: 'contacts',
  baseQuery: axiosBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com',
  }),
  tagTypes: ['Contact'],

  endpoints: builder => ({
    getContacts: builder.query({
      query: () => ({ url: `/contacts` }),
      providesTags: ['Contact'],
    }),
    addContact: builder.mutation({
      query: values => ({
        url: `/contacts`,
        method: 'POST',
        data: values,
      }),
      invalidatesTags: ['Contact'],
    }),
    deleteContact: builder.mutation({
      query: id => ({
        url: `/contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contact'],
    }),
  }),
});

////////////////////////////////////////////////
///////////////////authSlice////////////////////
////////////////////////////////////////////////

export const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshingUser: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [authOperations.register.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    [authOperations.logIn.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    [authOperations.logOut.fulfilled](state) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    },
    [authOperations.fetchCurrentUser.pending](state) {
      state.isRefreshingUser = true;
    },
    [authOperations.fetchCurrentUser.fulfilled](state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isRefreshingUser = false;
    },
    [authOperations.fetchCurrentUser.rejected](state) {
      state.isRefreshingUser = false;
    },
  },
});

////////////////////////////////////////////
////////////////PERSISTOR///////////////////
////////////////////////////////////////////

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
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
    [materialsApi.reducerPath]: materialsApi.reducer,
    auth: persistReducer(persistConfig, authSlice.reducer),
  },
  middleware,
  devTools: process.env.NODE_ENV === 'development',
  // middleware: getDefaultMiddleware =>
  //   getDefaultMiddleware().concat(materialsApi.middleware),
});

export const persistor = persistStore(store);

export const {
  useGetContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
} = materialsApi;
