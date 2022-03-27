import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  value: string;
}

const initialState: UserState = {
  value: "",
};

export const userSlice = createSlice({
  name: "clientType",
  initialState,
  reducers: {
    setAdmin: (state) => {
      state.value = "admin";
    },
    setPlayer: (state) => {
      state.value = "player";
    },
    resetType: (state) => {
      state.value = "";
    },
  },
});

export const { setAdmin, setPlayer, resetType } = userSlice.actions;

export default userSlice.reducer;
