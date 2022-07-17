import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  quiz: {},
  value: 0,
  playerID: 0,
  roomID: 0,
  playerJoined: false,
  playerLeft: false,
  quizInProgress: false,
  duration: 0,
  playerName: "player",
  players: [],
  quizEnd: false
};

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    startQuiz: (state, action) => {
      state.roomID = action.payload.roomID;
      state.duration = action.payload.duration;
    },

    setPlayerName: (state, action) => {
      state.playerName = action.payload;
    },

    setPlayerJoined: (state) => {
      state.playerJoined = true;
    },

    setPlayersList: (state, action) => {
      state.players.push(action.payload);
    },

    deletePlayersList: (state, action) => {
      state.players.forEach((item, index, arr) => {
        if (item === action.payload) {
          arr.splice(index, 1);
        }
      });
    },

    endQuiz: (state, action) => {
      state.quizEnd = true;
    },
  },
});

export const { startQuiz, setPlayerJoined, setPlayersList, deletePlayersList, setPlayerName, endQuiz } = quizSlice.actions;

export default quizSlice.reducer;
