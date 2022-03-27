import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PlayersState {
  player: string;
}

const initialState: PlayersState = {
  player: "",
};

export const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    addPlayer: (state, action: PayloadAction<string>) => {
      state.player = action.payload;
    },
  },
});

export const { addPlayer } = playersSlice.actions;

export default playersSlice.reducer;
