import * as actionTypes from "./actionTypes";

export const setOpponentJoined = () => {
	return { type: actionTypes.SET_OPPONENT_JOINED };
};

export const setOpponentLeft = () => {
	return { type: actionTypes.OPPONENT_LEFT };
};

export const setRoomID = roomID => {
	return { type: actionTypes.SET_ROOM_ID, roomID };
};

export const setIsHost = isHost => {
	return { type: actionTypes.SET_IS_HOST, isHost };
};

export const setIsPlayer = isPlayer => {
	return { type: actionTypes.SET_IS_PLAYER, isPlayer };
};

export const setIsQuestionDisplay = isQuestionDisplay => {
	return { type: actionTypes.SET_IS_QUESTION_DISPLAY, isQuestionDisplay };
};

export const startQuiz = (roomID, duration) => {
	return { type: actionTypes.START_QUIZ, roomID, duration };
};

export const endQuiz = () => {
	return { type: actionTypes.END_QUIZ };
};

export const resetQuiz = () => {
	return { type: actionTypes.RESET_QUIZ };
};
