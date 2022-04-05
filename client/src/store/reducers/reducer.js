import * as actionTypes from "../actions/actionTypes";

const initialState = {
	playerID: null,
	roomID: null,
	opponentJoined: false,
	opponentLeft: null,
	isHost: true,
	isPlayer: false,
	quizInProgress: false,
	duration: 1000,
	isQuestionDisplay: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_OPPONENT_JOINED:
			return {
				...state,
				opponentJoined: true,
				isHost: true,
			};
		case actionTypes.SET_ROOM_ID:
			return {
				...state,
				roomID: action.roomID,
			};
		case actionTypes.SET_IS_HOST:
			return {
				...state,
				isHost: action.isHost,
			};
		case actionTypes.SET_IS_PLAYER:
			return {
				...state,
				isPlayer: action.isPlayer,
			};
		case actionTypes.SET_IS_QUESTION_DISPLAY:
			return {
				...state,
				isQuestionDisplay: action.isQuestionDisplay,
			};

		case actionTypes.OPPONENT_LEFT:
			return {
				...state,
				opponentLeft: true,
				quizInProgress: false,
			};
		case actionTypes.START_QUIZ:
			return {
				...state,
				roomID: action.roomID,
				duration: action.duration,
				quizInProgress: true,
			};
		case actionTypes.END_QUIZ:
			return {
				...state,
				quizInProgress: false,
			};
		case actionTypes.RESET_QUIZ:
			return initialState;
		default:
			return state;
	}
};

export default reducer;
