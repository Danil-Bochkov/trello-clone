import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../../utils/axios.config'
import { toast } from "react-toastify";

export const fetchLists = createAsyncThunk(
  "lists/fetchLists",
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get("/lists");
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addList = createAsyncThunk(
    "lists/addList",
  async (body, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post("/lists", body);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const updateList = createAsyncThunk(
    'lists/updateList',
    async ({listId, title}, thunkAPI) => { 
      try {
            const response = await axiosInstance.patch(`/lists/${listId}`, title);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const deleteList = createAsyncThunk(
  "lists/deleteList",
  async (_id, thunkAPI) => {
    try {
        const response = await axiosInstance.delete(`/lists/${_id}`);
        return response.data;
      } catch (e) {
        toast.error(e.response.data.message);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);