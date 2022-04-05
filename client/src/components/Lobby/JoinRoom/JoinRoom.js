import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import FormModal from "../../UI/FormModal/FormModal";
import ModalButton from "../../UI/FormModal/Button/Button";

import { socket } from "../../../index";
import * as actions from "../../../store/actions/actions";
import styles from "../../UI/FormModal/FormModal.module.css";

const JoinRoom = props => {
	const [roomID, setRoomID] = useState("");
	const [playerName, setPlayerName] = useState("");

	const [error, setError] = useState(null);

	const topCard = useRef(null);

	const { startQuiz, history, showModal, closed } = props;

	useEffect(() => {
		socket.on("start_quiz_ack", ({ roomID, duration }) => {
			startQuiz(roomID, duration);
			history.push(`/quiz`);
		});

		return () => {
			socket.off("start_quiz_ack");
		};
	}, []);

	const changeRoomID = event => {
		const room = event.target.value;
		setRoomID(room);
		setError(null);
	};

	const changePlayerName = event => {
		const player = event.target.value;
		setPlayerName(player);
	};

	const submitJoinRoomHandler = event => {
		event.preventDefault();

		socket.emit("join_room", roomID, playerName, response => {
			if (response.status === "Success") {
				props.setIsHost();
				props.setIsPlayer();
				setError(null);
				unstackCard();
			} else {
				setError(response.message);
			}
		});
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
			title="Начало игры"
			showModal={showModal}
			closed={closed}
			error={error}
			cleanup={() => setError(null)}
		>
			<div ref={topCard} className={styles.top}>
				<div className={styles.message}>Введите номер игры</div>
				<div className={styles.joinCard}>
					{/* <button disabled={disableBtn} clicked={submitJoinRoomHandler} icon="join">
					Присоединиться
					</button> */}

					{/* <ModalButton clicked={submitJoinRoomHandler} icon="join"></ModalButton> */}

					<input type="number" onChange={changeRoomID} placeholder="Введите номер игры" />

					<input
						type="text"
						onChange={changePlayerName}
						placeholder="Введите название команды"
					/>

					<button type="button" onClick={submitJoinRoomHandler}>
						Присоединиться
					</button>
				</div>
			</div>
			<div className={styles.stacked}>
				<div className={styles.message}>Ожидайте подключения других команд</div>
			</div>
		</FormModal>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		startQuiz: (roomID, duration) => dispatch(actions.startQuiz(roomID, duration)),
		setIsHost: () => dispatch(actions.setIsHost(false)),
		setIsPlayer: () => dispatch(actions.setIsPlayer(true)),
	};
};

export default withRouter(connect(null, mapDispatchToProps)(JoinRoom));
