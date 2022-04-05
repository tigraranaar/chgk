import React from "react";
import { connect } from "react-redux";

import Modal from "../UI/Modal/Modal";

import styles from "./Result.module.css";

const Result = props => {
	return <div className={styles.semicircle} />;
};

const mapStateToProps = state => {
	return {
		playerID: state.playerID,
		opponentLeft: state.opponentLeft,
	};
};
export default connect(mapStateToProps)(Result);
