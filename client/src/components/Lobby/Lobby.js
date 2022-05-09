import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { socket } from "../../index";
import CreateRoom from "./CreateRoom/CreateRoom";
import JoinRoom from "./JoinRoom/JoinRoom";
import ResultPage from "./ResultPage/ResultPage";
import * as actions from "../../store/actions/actions";
import styles from "./Lobby.module.css";

const Lobby = (props) => {
  const [showJoinRoom, setShowJoinRoom] = useState(false);
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [showResultPage, setShowResultPage] = useState(false);

  const { resetQuiz, setOpponentLeft } = props;
  const redirectedFromQuiz = props.location.state && props.location.state.from === "/quiz";

  useEffect(() => {
    if (redirectedFromQuiz) resetQuiz();
    socket.on("opponent_left", () => {
      setOpponentLeft();
      closeModal();
    });
    return () => {
      socket.off("opponent_left");
    };
  }, [resetQuiz, setOpponentLeft, redirectedFromQuiz]);

  const createRoomClicked = () => {
    setShowCreateRoom(true);
  };

  const joinRoomClicked = () => {
    setShowJoinRoom(true);
  };

  const resultClicked = () => {
    setShowResultPage(true);
  };

  const closeModal = () => {
    setShowJoinRoom(false);
    setShowCreateRoom(false);
    setShowResultPage(false);
  };

  const blurred = showCreateRoom || showJoinRoom ? { filter: "blur(15px)" } : null;
  return (
    <div className={styles.lobby}>
      <CreateRoom showModal={showCreateRoom} closed={closeModal} />
      <JoinRoom showModal={showJoinRoom} closed={closeModal} />
      <ResultPage showModal={showResultPage} closed={closeModal} />

      <h1 className={styles.title} closed={closeModal}>
        Войти как:
      </h1>
      <div className={styles.buttons} style={blurred}>
        <button className={styles.button} onClick={createRoomClicked}>
          Администратор
        </button>
        <button className={styles.button} onClick={joinRoomClicked}>
          Игрок
        </button>
        <button className={styles.button} onClick={resultClicked}>
          Модератор
        </button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetQuiz: () => dispatch(actions.resetQuiz()),
    setOpponentLeft: () => dispatch(actions.setOpponentLeft()),
  };
};

export default connect(null, mapDispatchToProps)(Lobby);