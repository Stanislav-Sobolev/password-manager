import { configureStore } from '@reduxjs/toolkit';
// import { persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const materialsApi = createApi({
  reducerPath: 'contacts',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://6301fb43e71700618a41078e.mockapi.io',
  }),
  tagTypes: ['Contact'],
  endpoints: builder => ({
    getContacts: builder.query({
      query: () => `/contacts`,
      providesTags: ['Contact'],
    }),
    addContact: builder.mutation({
      query: values => ({
        url: `/contacts`,
        method: 'POST',
        body: values,
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

export const store = configureStore({
  reducer: {
    [materialsApi.reducerPath]: materialsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(materialsApi.middleware),
});

export const {
  useGetContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
} = materialsApi;

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

// export const initialState = {
//   items: [{ id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' }],
//   filters: '',
// };

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const slice = createSlice({
//   name: 'contacts',
//   initialState,
//   reducers: {
//     addContact(state, action) {
//       state.items.push(action.payload);
//     },

//     filteredItems(state, action) {
//       state.filters = action.payload;
//     },

//     deleteContact(state, action) {
//       const newContacts = state.items.filter(el => el.id !== action.payload);
//       return { ...state, items: newContacts };
//     },
//   },
// });

// const persistedReducer = persistReducer(persistConfig, slice.reducer);

// export const persistor = persistStore(store);

// export const { addContact, filteredItems, deleteContact } = slice.actions;

// export const initialState = {
//   items: [{ id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' }],
//   filters: '',
// };

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const slice = createSlice({
//   name: 'contacts',
//   initialState,
//   reducers: {
//     addContact(state, action) {
//       state.items.push(action.payload);
//     },

//     filteredItems(state, action) {
//       state.filters = action.payload;
//     },

//     deleteContact(state, action) {
//       const newContacts = state.items.filter(el => el.id !== action.payload);
//       return { ...state, items: newContacts };
//     },
//   },
// });

// const persistedReducer = persistReducer(persistConfig, slice.reducer);

// export const store = configureStore({
//   reducer: {
//     myContacts: persistedReducer,
//   },
// });

// export const persistor = persistStore(store);

// export const { addContact, filteredItems, deleteContact } = slice.actions;
