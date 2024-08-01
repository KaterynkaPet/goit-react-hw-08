import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://connections-api.goit.global'; // Замість цього вкажіть URL вашого бекенду

// Реєстрація нового користувача
export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/users/signup`, credentials);
      const { token, user } = response.data;
      // Зберігаємо токен у локальному сховищі
      localStorage.setItem('token', token);
      return { token, user };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Логін існуючого користувача
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/users/login`, credentials);
      const { token, user } = response.data;
      // Зберігаємо токен у локальному сховищі
      localStorage.setItem('token', token);
      return { token, user };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Вихід з додатка
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await axios.post(`${API_URL}/users/logout`);
      // Видаляємо токен з локального сховища
      localStorage.removeItem('token');
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Оновлення користувача за токеном
export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    if (!token) {
      return thunkAPI.rejectWithValue('No token found');
    }
    try {
      const response = await axios.get(`${API_URL}/users/current`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);