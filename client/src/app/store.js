import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../features/counter/counterSlice';
import lobbyReducer from "../features/lobby/lobbySlice";
import quizReducer from "../features/quiz/quizSlice";
// import resultsReducer from "../features/results/resultsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    lobby: lobbyReducer,
    quiz: quizReducer,
    // results: resultsReducer,
  },
});
