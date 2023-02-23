export const selectLists = state => state.lists.items;

export const selectListId = state => state.lists.items._id;

export const selectListTitle = state => state.lists.items.title;

export const selectListsIsLoading = state => state.lists.isLoading;

export const selectListsError = state => state.lists.error;