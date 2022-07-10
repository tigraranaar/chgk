import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  results: {}
};

export const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    updateResults: (state, action) => {
      state.results = action.payload;
    },
  },
});

export const { updateResults } = resultsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectCount = (state) => state.counter.value;

export default resultsSlice.reducer;





