import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { socket } from "../../index";

import styles from "./Quiz.module.css";

const Tables = (props) => {
  const [answersData, setAnswersData] = useState({});

  useEffect(() => {
    socket.on("answers__show", (answers) => {
      setAnswersData(answers);
    });
  }, []);

  return (
    <>
      <h2 className={styles.tables__title}>Таблица ответов</h2>
      <div className={styles.tables}>
        {answersData && (
          <table border="1">
            <tbody>
              <tr>
                <td>Вопросы</td>

                {/* {Object.entries(answersData).map((i) => {
                return i[1].map((j) => <td>{j.playerID}</td>);
              })} */}
              </tr>

              {Object.entries(answersData).map((i) => {
                return (
                  <tr>
                    <td>{i[0]}</td>

                    {i[1].map((j) => (
                      <td>
                        {j.playerName}
                        <br />
                        <br />
                        {j.answer}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <h2 className={styles.tables__title}>Таблица баллов</h2>
      <div className={styles.tables}>
        {answersData && (
          <table border="1">
            <tbody>
              <tr>
                <td>questions</td>
              </tr>

              {Object.entries(answersData).map((i) => {
                return (
                  <tr>
                    <td>{i[0]}</td>

                    {i[1].map((j) => (
                      <td>
                        {j.playerName}
                        <br />
                        <br />
                        <input type="text" placeholder="Очки за ответ"></input>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    // quizInProgress: state.quizInProgress,
    // isHost: state.isHost,
    // isPlayer: state.isPlayer,
    // isModerator: state.isModerator,
    // duration: state.duration,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // setOpponentLeft: () => dispatch(actions.setOpponentLeft()),
    // endQuiz: () => dispatch(actions.endQuiz()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tables);
