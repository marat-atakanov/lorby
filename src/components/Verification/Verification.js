import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import styles from "./Verification.module.css"
import Button from "../Buttons/Button";
import {ApiClient} from "../../utils/axiosUtils";
import backArrowBtn from "../../assets/icons/backArrowBtn.svg";
import BackButton from '../Buttons/BackButton';

function Verification() {
    const location = useLocation();
    const navigate = useNavigate()
    const [codeInputs, setCodeInputs] = useState([])
    const [inputId, setInputId] = useState(0)
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleConfirm = async () => {
        setIsLoading(true)
        if (await ApiClient().confirm(codeInputs.join(""))) {
            navigate("/")
        } else {
            setErrorMessage("Неверный код")
        }
        await setIsLoading(false)
    }

    useEffect(() => {
        const codeInputFunc = (e) => {
            if (e.key === "Backspace") {
                codeInputs.pop()
                setCodeInputs([...codeInputs])
                if (inputId !== 0) {
                    setInputId(inputId - 1)
                }
                setErrorMessage("")
                window.removeEventListener("keyup", codeInputFunc)
            } else if (codeInputs.length > -1 && codeInputs.length < 4) {
                if (e.key.match(/^[0-9]$/)) {
                    setCodeInputs([...codeInputs, Number(e.key)])
                    setInputId(inputId + 1)
                    setErrorMessage("")
                    window.removeEventListener("keyup", codeInputFunc)
                }
            }
        }

        window.addEventListener("keyup", codeInputFunc)
    }, [codeInputs])


    return (
        <div className={styles.rightBlockInner}>
            <BackButton text="Назад" onClick={() => navigate(-1)}/>
            <div className={styles.verificationPanel}>
                <h2 className={styles.title}>Введи 4-значный код, высланный
                    на {location?.state?.emailValue ? location.state.emailValue : "почту"}</h2>
                <div className={styles.codeDigits}>
                    <div className={`${inputId === 0 ? `${styles.codeDigit} ${styles.codeDigitActive}` : styles.codeDigit} ${errorMessage ? styles.codeDigitError : ""}`}>
                        <span className={styles.codeDigitChar}>{codeInputs[0]}</span>
                    </div>
                    <div className={`${inputId === 1 ? `${styles.codeDigit} ${styles.codeDigitActive}` : styles.codeDigit} ${errorMessage ? styles.codeDigitError : ""}`}>
                        <span className={styles.codeDigitChar}>{codeInputs[1]}</span>
                    </div>
                    <div className={`${inputId === 2 ? `${styles.codeDigit} ${styles.codeDigitActive}` : styles.codeDigit} ${errorMessage ? styles.codeDigitError : ""}`}>
                        <span className={styles.codeDigitChar}>{codeInputs[2]}</span>
                    </div>
                    <div className={`${inputId === 3 ? `${styles.codeDigit} ${styles.codeDigitActive}` : styles.codeDigit} ${errorMessage ? styles.codeDigitError : ""}`}>
                        <span className={styles.codeDigitChar}>{codeInputs[3]}</span>
                    </div>
                </div>
                <p className={styles.errorMessage}>{errorMessage}</p>
                <Button type={"button"} text={"Подтвердить"} margin={"22px 0 0"} onClick={handleConfirm} isLoading={isLoading}/>
                <Button type={"button"} text={"Выслать код повторно"} margin={"24px 0 0"} lightTheme={true}/>
            </div>
        </div>

    );
}

export default Verification;