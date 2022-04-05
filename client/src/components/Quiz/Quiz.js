import React, { useEffect, useState, useRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { socket } from "../../index";

import Question from "./Question/Question";
import Result from "../Result/Result";

import * as actions from "../../store/actions/actions";
import styles from "./Quiz.module.css";
import { faBullseye } from "@fortawesome/free-solid-svg-icons";

const Quiz = props => {
	const [loading, setLoading] = useState(true);
	const [question, setQuestion] = useState(null);
	const [choices, setChoices] = useState(null);
	const [homeRedirect, setHomeRedirect] = useState(false);
	const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

	const [showQuestion, setShowQuestion] = useState(false);

	const fetchMoreQuestionsTimeout = useRef(null);
	const pingIntervalRef = useRef(null);
	const timerRef = useRef(null);
	const quesNumberRef = useRef(0);

	const playerID = socket.id;
	const { appear, appearActive, enter, enterActive, exit, exitActive } = styles;
	const {
		quizInProgress,
		setOpponentLeft,
		endQuiz,
		isHost,
		duration,
		isPlayer,
		isQuestionDisplay,
	} = props;

	useEffect(() => {
		if (!quizInProgress) setHomeRedirect(true);

		if (!isPlayer) {
			getNextQuestion();
		}

		pingIntervalRef.current = setInterval(() => {
			socket.emit("ping");
		}, 15000);

		socket.on("next_question", response => {
			if (response.status === "Success") {
				quesNumberRef.current++;
				setQuestion(response.question);
				setChoices(response.choices);
				setLoading(false);
			} else if (response.status === "Questions_Finished") {
				setQuestion(null);
				endQuiz();
			} else {
				console.log("ERROR");
			}
		});

		socket.on("opponent_left", () => {
			setOpponentLeft();
			endQuiz();
		});

		return () => {
			socket.off("opponent_left");
			socket.off("next_question");
			clearTimeout(fetchMoreQuestionsTimeout.current);
			clearInterval(pingIntervalRef.current);
		};
	}, []);

	useEffect(() => {
		if (question) {
			// setShowQuestion11(true);
			if (!isPlayer) {
				if (window.confirm(question)) {
					fetchMoreQuestionsTimeout.current = setTimeout(getNextQuestion, duration);
					props.setIsQuestionDisplay(true);
					setShowQuestion(true);
					const kk = true;
					socket.emit("question__show", kk);

					console.log("админ отправил", showQuestion);
				}
			}
		}

		socket.on("question__show1", showQuestion => {
			setShowQuestion(showQuestion);
			setShowQuestion(true);
			props.setIsQuestionDisplay(true);
			console.log("клиент получил обратный сокет", showQuestion);

			if (!isPlayer) {
				console.log("админ получил", showQuestion);
			}

			if (isPlayer) {
				console.log("игрок получил", showQuestion);
			}
		});

		return () => {
			clearTimeout(fetchMoreQuestionsTimeout.current);
			setShowQuestion(false);
			props.setIsQuestionHide(false);
		};
	}, [question, isHost, duration, isPlayer]);

	const animateTimer = () => {
		if (timerRef.current) {
			timerRef.current.classList.remove(styles.animateTimer);
			//Force Reflow
			void timerRef.current.offsetWidth;
			timerRef.current.classList.add(styles.animateTimer);
			const animationDelay = 500;
			timerRef.current.style.animationDuration = duration - animationDelay + "ms";
		}
	};

	const getNextQuestion = () => {
		socket.emit("get_next_question");
	};

	return (
		<div className={styles.quiz}>
			<div className={styles.timer}>
				<div ref={timerRef} className={styles.timerInner} />
			</div>
			{isQuestionDisplay || showQuestion ? (
				<TransitionGroup>
					<CSSTransition
						timeout={{ enter: 500, exit: 250 }}
						key={quesNumberRef.current}
						appear
						classNames={{
							appear,
							appearActive,
							enter,
							enterActive,
							exit,
							exitActive,
						}}
						onEntered={animateTimer}
					>
						<Question
							question={question}
							questionNumber={quesNumberRef.current}
							duration={duration}
							isHost={isHost}
							isPlayer={isPlayer}
						/>
					</CSSTransition>
				</TransitionGroup>
			) : (
				""
			)}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		quizInProgress: state.quizInProgress,
		isHost: state.isHost,
		isPlayer: state.isPlayer,
		duration: state.duration,
		isQuestionDisplay: state.isQuestionDisplay,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setOpponentLeft: () => dispatch(actions.setOpponentLeft()),
		endQuiz: () => dispatch(actions.endQuiz()),
		setIsQuestionDisplay: () => dispatch(actions.setIsQuestionDisplay(true)),
		setIsQuestionHide: () => dispatch(actions.setIsQuestionDisplay(false)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);

// setShowQuestion: () => dispatch(actions.setShowQuestion(true)),
