import React from "react";
import backArrowBtn from "../../assets/icons/backArrowBtn.svg"
import styles from "./BackButton.module.css"

export default function BackButton({onClick, text}) {
  return (
    <button
      type={"button"}
      className={styles.backBtn}
      onClick={onClick}
    >
      <img src={backArrowBtn} alt="back button arrow" />
      <span>{text}</span>
    </button>
  );
}
