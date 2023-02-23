export const selectCards = state => state.cards.items;

export const selectCardTitle = state => state.cards.items.title;

export const selectCardDescr = state => state.cards.items.description;

export const selectCardTimeUpdt = state => state.cards.items.updateAt;

export const selectCardsIsLoading = state => state.cards.items.isLoading;

export const selectCardsError = state => state.cards.items.error;