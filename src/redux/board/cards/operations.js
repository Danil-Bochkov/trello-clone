import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../../utils/axios.config'
import { toast } from "react-toastify";
import { selectListId } from '../lists/selectors';
import { useSelector } from 'react-redux';

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
    async (cardId, thunkAPI) => { 
      try {
            const listId = useSelector(selectListId);
            const response = await axiosInstance.put(`/lists/cards/${listId}/${cardId}`);
            return response.data;
        } catch (e) {
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