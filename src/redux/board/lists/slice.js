import { createSlice } from "@reduxjs/toolkit";
import { fetchLists, addList, updateList, deleteList } from "./operations";
import handlePending from '../../../utils/handlePenging';
import handleRejected from '../../../utils/handleRejected';
import { addCard, deleteCard, updateCard, updateCardInfo } from "../cards/operations";

const listsSlice = createSlice({
    name: 'lists',
    initialState: {
        items: [],
        isLoading: false,
        error: null
    },
    extraReducers: {
    [fetchLists.pending]: handlePending,
    [fetchLists.fulfilled](state, {payload}) {
      state.isLoading = false;
      state.error = null;
      state.items = payload;
    },
    [fetchLists.rejected]: handleRejected,
    [addList.pending]: handlePending,
    [addList.fulfilled](state, {payload}) {
      state.isLoading = false;
      state.error = null;
      state.items.push(payload);
    },
    [addList.rejected]: handleRejected,
    [addCard.pending]: handlePending,
    [addCard.fulfilled](state, {payload}) {
      state.isLoading = false;
      state.error = null;
      const index = state.items.findIndex(({ _id }) => _id === payload.listId);
      state.items[index].cards.push(payload);
    },
    [addCard.rejected]: handleRejected,
    [updateList.pending]: handlePending,
    [updateList.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.items.title = payload.title;
    },
    [updateList.rejected]: handleRejected,
    [updateCard.pending]: handlePending,
    [updateCard.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      const { oldList, updatedList } = payload;

      const fromListIndex = state.items.findIndex((list) => list._id === oldList._id);
      const toListIndex = state.items.findIndex((list) => list._id === updatedList._id);

      state.items[fromListIndex].cards = oldList.cards;
      state.items[toListIndex].cards = updatedList.cards;
    },
    [updateCard.rejected]: handleRejected,
    [updateCardInfo.pending]: handlePending,
    [updateCardInfo.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      const itemIndex = state.items.findIndex(item => item.cards.find(card => card._id === payload._id));
      if (itemIndex !== -1) {
      const updatedCards = state.items[itemIndex].cards.map(card => card._id === payload._id ? payload : card);
      const updatedItem = {
        ...state.items[itemIndex],
        cards: updatedCards
      };
      const updatedItems = [
        ...state.items.slice(0, itemIndex),
        updatedItem,
        ...state.items.slice(itemIndex + 1)
      ];
      state.items = updatedItems;
  }
    },
    [updateCardInfo.rejected]: handleRejected,
    [deleteList.pending]: handlePending,
    [deleteList.fulfilled](state, {payload}) {
      state.isLoading = false;
      state.error = null;
      state.items = [...state.items].filter(({ _id }) => _id !== payload._id)
    },
    [deleteList.rejected]: handleRejected,
    [deleteCard.pending]: handlePending,
    [deleteCard.fulfilled](state, {payload}) {
      state.isLoading = false;
      state.error = null;
      const index = state.items.findIndex(({ _id }) => _id === payload._id);
      state.items[index].cards = state.items[index].cards.filter(({ _id }) => payload.cards.some(id => id === _id));
      },
      [deleteCard.pending]: handleRejected,
    }
});

export const listsReducer = listsSlice.reducer;