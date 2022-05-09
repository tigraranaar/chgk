import React, { useState, useEffect, useRef } from "react";
import { socket } from "../../../index";
import styles from "./Question.module.css";

const Question = (props) => {
  const { question, questionNumber, duration, isHost, isPlayer, isModerator, playerName } = props;
  const [answer, setAnswer] = useState("");
  const [disabledButton, setDisabledButton] = useState(false);
  const [answerData, setAnswerData] = useState({});
  const playerID = socket.id;

  const handleAnswer = (e) => {
    setAnswer(e.target.value);
    // const answ = e.target.value;

    // setAnswerData(playerID, question, answ);
  };

  const handleSend = (e) => {
    const answerConfig = { playerID, question, answer, playerName };

    console.log(playerName);
    socket.emit("submit_answer", answerConfig);
    setDisabledButton(true);
  };

  return (
    <div className={styles.question__container}>
      <div className={styles.left}>
        <span className={styles.number}>{questionNumber < 10 ? "0" + questionNumber : questionNumber}</span>
        <div className={styles.question}>{question}</div>
      </div>
      <div className={styles.right}>
        {isPlayer && !isModerator ? (
          <>
            <textarea className={styles.textarea} placeholder="Введите ответ" onChange={handleAnswer}></textarea>
            <button className={styles.button} type="button" onClick={handleSend} disabled={disabledButton}>
              Отправить ответ
            </button>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Question;
