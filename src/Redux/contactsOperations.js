import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPasswords = createAsyncThunk(
  'passwords/fetchPasswords',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get('/contacts');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addPassword = createAsyncThunk(
  'passwords/addPassword',
  async (value, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', value);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deletePassword = createAsyncThunk(
  'passwords/deletePassword',
  async (passwordId, thunkAPI) => {
    try {
      await axios.delete(`/contacts/${passwordId}`);
      return passwordId;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
