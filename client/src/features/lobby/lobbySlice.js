import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  clientType: "",
  gameCount: [],
  gameNumber: ''
};

export const lobbySlice = createSlice({
  name: 'lobby',
  initialState,
  reducers: {
    setClientType: (state, action) => {
      state.clientType = action.payload;
    },
    getGameCount: (state, action) => {
      state.gameCount = action.payload;
    },
    createGame: (state, action)  => {
      state.gameNumber = action.payload;
    }
  },
});

export const { setClientType, createGame, getGameCount } = lobbySlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectCount = (state) => state.counter.value;

export default lobbySlice.reducer;





