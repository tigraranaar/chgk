import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GameState {
  categories: string;
  room: string;
  question: string;
  message: string;
  status: string;
  scoreboard: string;
}

const initialState: GameState = {
  categories: "",
  room: "",
  question: "",
  message: "",
  status: "",
  scoreboard: "",
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    resetRoom: (state) => {
      state.room = "";
    },
    setCategories: (state, action: PayloadAction<string>) => {
      state.categories = action.payload;
    },
    setRoom: (state, action: PayloadAction<string>) => {
      state.room = action.payload;
    },
    setQuestion: (state, action: PayloadAction<string>) => {
      state.question = action.payload;
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    setScoreboard: (state, action: PayloadAction<string>) => {
      state.scoreboard = action.payload;
    },
    resetGame: (state) => {
      state.room = "";
    },
  },
});

export const {
  setRoom,
  setCategories,
  resetRoom,
  setQuestion,
  setMessage,
  setStatus,
  setScoreboard,
  resetGame,
} = gameSlice.actions;

export default gameSlice.reducer;

// export const defaultGame = {
//   categories: [],
//   room: "",
//   question: {},
//   message: "",
//   status: "",
//   scoreboard: [],
// };

// /* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */

// export default (state = defaultGame, action) => {
//   switch (action.type) {
//     case "SET_CATEGORIES":
//       return {
//         ...state,
//         categories: action.categories,
//       };
//     case "SET_ROOM":
//       return {
//         ...state,
//         room: action.room,
//       };
//     case "RESET_ROOM":
//       return {
//         ...state,
//         room: "",
//       };
//     case "SET_QUESTION":
//       return {
//         ...state,
//         question: action.question,
//       };
//     case "SET_MESSAGE":
//       return {
//         ...state,
//         message: action.message,
//       };
//     case "SET_STATUS":
//       return {
//         ...state,
//         status: action.status,
//       };
//     case "SET_SCOREBOARD":
//       return {
//         ...state,
//         scoreboard: action.scoreboard,
//       };
//     case "RESET_GAME":
//       return defaultGame;
//     default:
//       return state;
//   }
// };
