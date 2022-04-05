import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { socket } from "../../../index";
import { joinClasses } from "../../../utils/general";
import FormModal from "../../UI/FormModal/FormModal";
import * as actions from "../../../store/actions/actions";
import styles from "../../UI/FormModal/FormModal.module.css";

const CreateRoom = props => {
	const [roomID, setRoomID] = useState(null);
	const [error, setError] = useState(null);
	const [startGame, setStartGame] = useState(false);

	const topCard = useRef(null);

	const { setOpponentJoined, startQuiz, history, showModal, closed, setIsHost } = props;

	useEffect(() => {
		socket.on("player_joined", () => {
			setIsHost();
			setOpponentJoined();
			setStartGame(true);
		});

		socket.on("start_quiz_ack", ({ roomID, duration }) => {
			startQuiz(roomID, duration);
			history.push(`/quiz`);
		});

		return () => {
			socket.off("start_quiz_ack");
			socket.off("player_joined");
		};
	}, []);

	useEffect(() => {
		if (roomID)
			socket.emit("create_room", roomID, response => {
				if (response.status === "Success") setError(null);
				else setError(response.message);
			});
	}, [roomID]);

	const inputhandle = event => {
		setRoomID(event.target.value);
	};
	const generateRoom = event => {
		setRoomID(roomID);
		unstackCard();
	};

	const startQuizHandler = () => {
		const quizConfig = { roomID };
		socket.emit("start_quiz", quizConfig);
	};

	const unstackCard = () => {
		topCard.current.classList.add(styles.unstacked);
		topCard.current.classList.remove(styles.top);
		const nextCard = topCard.current.nextElementSibling;

		nextCard.classList.add(styles.top);
		nextCard.classList.remove(styles.stacked);
		topCard.current = nextCard;
	};

	return (
		<FormModal
			title="Создание игры"
			showModal={showModal}
			closed={closed}
			error={error}
			cleanup={() => setError(null)}
		>
			<div ref={topCard} className={styles.top}>
				<div className={styles.message}>Введите номер игры</div>
				<input placeholder="Номер игры" onChange={inputhandle}></input>
				<button onClick={generateRoom} className={styles.inputGroup}>
					Создать игру
				</button>
			</div>
			{!startGame && (
				<div className={joinClasses(styles.stacked, styles.roomCard)}>
					<div className={styles.message}>Поделитесь номером игры с игроками</div>
					<div className={joinClasses(styles.inputGroup, styles.room)}>{roomID}</div>
				</div>
			)}
			{startGame && (
				<div onClick={startQuizHandler}>
					<div className={styles.inputGroup}>Начать игру</div>
				</div>
			)}
		</FormModal>
	);
};

const mapStateToProps = state => {
	return {
		opponentJoined: state.opponentJoined,
		isHost: state.isHost,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		startQuiz: (roomID, duration) => dispatch(actions.startQuiz(roomID, duration)),
		setOpponentJoined: () => dispatch(actions.setOpponentJoined()),
		setIsHost: () => dispatch(actions.setIsHost()),
	};
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateRoom));
