import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../../utils/axios.config'
import { toast } from "react-toastify";

export const fetchCards = createAsyncThunk(
  "cards/fetchCards",
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get(`/lists/cards/all`);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addCard = createAsyncThunk(
    "cards/addCard",
  async (body, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post(`/lists/cards/${body.listId}`, body);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const updateCard = createAsyncThunk(
    'cards/updateCard',
    async ({cardId, body}, thunkAPI) => { 
      try {
            const response = await axiosInstance.patch(`/lists/cards/${body.listId}/${cardId}`, body);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const updateCardInfo = createAsyncThunk(
    'cards/updateCardInfo',
    async (body, thunkAPI) => { 
      try {
            const response = await axiosInstance.put(`/lists/cards/${body.cardId}`, body);
            return response.data;
      } catch (e) {
        toast.error('Fields can`t be empty');
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);
    
export const deleteCard = createAsyncThunk(
  "cards/deleteCard",
  async (cardId, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/lists/cards/${cardId}`);
      return response.data;
      } catch (e) {
        toast.error(e.response.data.message);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);