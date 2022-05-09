import React, { useEffect, useState, useRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { socket } from "../../index";

import Question from "./Question/Question";
import Tables from "./Tables";

import * as actions from "../../store/actions/actions";
import styles from "./Quiz.module.css";

const Quiz = (props) => {
  const [question, setQuestion] = useState(null);
  // const [answer, setAnswer] = useState([]);
  const [showQuestion, setShowQuestion] = useState(false);
  const fetchMoreQuestionsTimeout = useRef(null);
  const pingIntervalRef = useRef(null);
  const timerRef = useRef(null);
  const quesNumberRef = useRef(0);

  const playerID = socket.id;
  const { appear, appearActive, enter, enterActive, exit, exitActive } = styles;
  const { setOpponentLeft, endQuiz, isHost, duration, isPlayer, isModerator, playerName } = props;

  useEffect(() => {
    if (!isPlayer) {
      getNextQuestion();
    }

    pingIntervalRef.current = setInterval(() => {
      socket.emit("ping");
    }, 15000);

    socket.on("next_question", (response) => {
      if (response.status === "Success") {
        quesNumberRef.current++;
        setQuestion(response.question);
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

  const handleNextQuestion = () => {
    fetchMoreQuestionsTimeout.current = setTimeout(getNextQuestion, duration);
    setShowQuestion(true);
    socket.emit("question__show", true);
  };

  useEffect(() => {
    if (question && !isPlayer) {
    }

    socket.on("question__show1", (showQuestion) => {
      setShowQuestion(true);
    });

    // socket.on("answers__show", (answerConfig) => {
    //   setAnswer((prevArray) => [...prevArray, answerConfig]);
    //   console.log(answer);
    // });

    return () => {
      clearTimeout(fetchMoreQuestionsTimeout.current);
      setShowQuestion(false);
    };
  }, [question, isHost, duration, isPlayer]);

  const animateTimer = () => {
    if (timerRef.current) {
      timerRef.current.classList.remove(styles.animateTimer);
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

      {isModerator && <Tables isModerator={isModerator} />}

      {!isModerator &&
        (showQuestion ? (
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
                isModerator={isModerator}
                isHost={isHost}
                isPlayer={isPlayer}
                playerName={playerName}
              />
            </CSSTransition>
          </TransitionGroup>
        ) : (
          !isPlayer && (
            <div>
              <h3>{question}</h3>
              <button onClick={handleNextQuestion}>GO</button>
            </div>
          )
        ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    quizInProgress: state.quizInProgress,
    isHost: state.isHost,
    isPlayer: state.isPlayer,
    playerName: state.playerName,
    isModerator: state.isModerator,
    duration: state.duration,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setOpponentLeft: () => dispatch(actions.setOpponentLeft()),
    endQuiz: () => dispatch(actions.endQuiz()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);

// setShowQuestion: () => dispatch(actions.setShowQuestion(true)),
