import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import FormModal from "../../UI/FormModal/FormModal";

import { socket } from "../../../index";
import * as actions from "../../../store/actions/actions";
import styles from "../../UI/FormModal/FormModal.module.css";

const ResultPage = (props) => {
  const [roomID, setRoomID] = useState(1);
  const [isModerator, setisModerator] = useState("");
  const [gameCount, setGameCount] = useState([]);
  const [error, setError] = useState(null);
  const [playerName, setPlayerName] = useState("moderator");

  const topCard = useRef(null);

  const { startQuiz, history, showModal, closed } = props;

  useEffect(() => {
    socket.on("start_quiz_ack", ({ roomID, duration }) => {
      startQuiz(roomID, duration);
      history.push(`/quiz`);
    });

    socket.on("send_data", (questionData) => {
      setGameCount([...questionData]);
    });

    return () => {
      socket.off("start_quiz_ack");
    };
  }, []);

  const submitResultPageHandler = (event) => {
    event.preventDefault();

    socket.emit("join_room", roomID, playerName, (response) => {
      if (response.status === "Success") {
        props.setIsHost();
        props.setIsPlayer();
        props.setIsModerator();
        setError(null);
        unstackCard();
      } else {
        setError(response.message);
      }
    });
  };

  const handleSelectChange = (e) => {
    setRoomID(e.target.value);
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
    <FormModal title="Начало игры" showModal={showModal} closed={closed} error={error} cleanup={() => setError(null)}>
      <div ref={topCard} className={styles.top}>
        <div className={styles.message}>Введите номер игры</div>
        <div className={styles.joinCard}>
          <select onChange={handleSelectChange}>
            {gameCount.map((el, i) => (
              <option key={i} value={el}>
                {el}
              </option>
            ))}
          </select>

          <button type="button" onClick={submitResultPageHandler}>
            Просмотр игры
          </button>
        </div>
      </div>
      <div className={styles.stacked}>
        <div className={styles.message}>Ожидайте подключения других команд</div>
      </div>
    </FormModal>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    startQuiz: (roomID, duration) => dispatch(actions.startQuiz(roomID, duration)),
    setIsHost: () => dispatch(actions.setIsHost(false)),
    setIsPlayer: () => dispatch(actions.setIsPlayer(true)),
    setPlayerName: (playerName) => dispatch(actions.setPlayerName(playerName)),
    setIsModerator: () => dispatch(actions.setIsModerator(true)),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(ResultPage));
