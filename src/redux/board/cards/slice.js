import { createSlice } from "@reduxjs/toolkit";
import { fetchCards, addCard, updateCard, deleteCard } from "./operations";
import handlePending from '../../../utils/handlePenging';
import handleRejected from '../../../utils/handleRejected';

const cardsSlice = createSlice({
    name: 'cards',
    initialState: {
        items: [],
        isLoading: false,
        error: null
    },
    extraReducers: {
    [updateCard.pending]: state => {
      state.isLoading = true;
      state.error = null;
    },
    [updateCard.fulfilled]: (state, { payload }) => {
      const index = state.items.findIndex(({ _id }) => _id === payload._id);
      state.items[index] = payload;
      state.isLoading = false;
    },
    [updateCard.rejected]: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    }
});

export const cardsReducer = cardsSlice.reducer;