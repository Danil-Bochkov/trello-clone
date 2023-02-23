import { createSlice } from "@reduxjs/toolkit";
import { fetchLists, addList, updateList, deleteList } from "./operations";
import handlePending from '../../../utils/handlePenging';
import handleRejected from '../../../utils/handleRejected';
import { addCard, deleteCard } from "../cards/operations";

const listsSlice = createSlice({
    name: 'lists',
    initialState: {
        items: [],
        isLoading: false,
        error: null
    },
    extraReducers: {
    [fetchLists.pending]: handlePending,
    [fetchLists.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [fetchLists.rejected]: handleRejected,
    [addList.pending]: handlePending,
    [addList.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items.push(action.payload);
    },
    [addList.rejected]: handleRejected,
    [addCard.pending]: handlePending,
    [addCard.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      const index = state.items.findIndex(({ _id }) => _id === action.payload.listId);
      state.items[index].cards.push(action.payload);
    },
    [addCard.rejected]: handleRejected,
    [updateList.pending]: state => {
      state.isLoading = true;
      state.error = null;
    },
    [updateList.fulfilled]: (state, { payload }) => {
      console.log(payload);
      const index = state.items.findIndex(({ _id }) => _id === payload._id);
      state.items[index].cards = payload;
      state.isLoading = false;
    },
    [updateList.rejected]: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    [deleteList.pending]: handlePending,
    [deleteList.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = [...state.items].filter(({ _id }) => _id !== action.payload._id)
    },
    [deleteList.rejected]: handleRejected,
    [deleteCard.pending]: handlePending,
    [deleteCard.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      const index = state.items.findIndex(({ _id }) => _id === action.payload._id);
      state.items[index].cards = state.items[index].cards.filter(({ _id }) => action.payload.cards.some(id => id === _id));
      },
      [deleteCard.pending]: handleRejected,
    }
});

export const listsReducer = listsSlice.reducer;