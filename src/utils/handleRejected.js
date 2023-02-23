const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export default handleRejected;