import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = 'https://66621f7063e6a0189feccbd4.mockapi.io/';

export const fetchContacts = createAsyncThunk(
    'contacts/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${API_URL}/contacts`);
            return response.data;
        } catch (error) {
          const message = error.response ? error.response.data : error.message;
          console.error("Fetch contacts error: ", message);
          return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/contacts`, contact);
      return response.data;
    } catch (error) {
      const message = error.response ? error.response.data : error.message;
      console.error("Add contact error: ", message);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      await axios.delete(`${API_URL}/contacts/${contactId}`);
      return contactId;
    } catch (error) {
      const message = error.response ? error.response.data : error.message;
      console.error("Delete contact error: ", message);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);