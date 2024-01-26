import React, {useEffect, useState} from 'react';
import hidePasswordIcon from "../../assets/icons/hidePasswordIcon.svg";
import showPasswordIcon from "../../assets/icons/showPasswordIcon.svg";
import styles from "./Registration.module.css"
import {useFormik} from "formik";
import {registrationSchema} from "../../schemas/schemas";
import Button from "../Button/Button";
import {ApiClient} from "../../utils/axiosUtils";
import {useNavigate} from "react-router-dom";
import backArrowBtn from "../../assets/icons/backArrowBtn.svg"

function Registration() {

    // states
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isPasswordShown2, setIsPasswordShown2] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate()

    // formik
    const onSubmit = async () => {
        setIsLoading(true)
        if (await ApiClient().signUp(values.email, values.username, values.password, values.confirmPassword)) {
            await navigate("/verification", {state: {emailValue: values.email}})
        } else {
            setErrorMessage("Пользователь с такой почтой или логином уже существует")
        }

        await setIsLoading(false)
    }

    const {values, errors, handleChange, touched, handleBlur, handleSubmit} = useFormik({
        initialValues: {
            email: "",
            username: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: registrationSchema,
        onSubmit
    })


    // functions
    const handlePasswordVisibility = () => {
        setIsPasswordShown(!isPasswordShown)
    }
    const handlePasswordVisibility2 = () => {
        setIsPasswordShown2(!isPasswordShown2)
    }
    console.log(errors)

    // useEffect(() => {
    //     validateForm()
    // }, [validateForm]);


    return (
        <div className={styles.rightBlockInner}>
            <button type={"button"} className={styles.backBtn} onClick={()=>navigate(-1)}>
                <img src={backArrowBtn} alt="back arrow button"/>
                <span>Назад</span>
            </button>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit()
                }}
                className={styles.registrationPanel}
            >
                <h2>
                    Создать аккаунт Lorby
                </h2>
                <div className={styles.emailBlock}>
                    <input
                        id="email"
                        placeholder="Введи адрес почты"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onFocus={() => setErrorMessage("")}
                        className={`${errors.email && touched.email ? styles.inputError : null} ${styles.inputBox}`}
                    />
                </div>
                <div className={styles.loginInput}>
                    <input
                        id="username"
                        placeholder="Придумай логин"
                        type="text"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onFocus={() => setErrorMessage("")}
                        className={`${errors.username && touched.username ? styles.inputError : null} ${styles.inputBox}`}
                    />
                </div>
                <div className={styles.passwordInput}>
                    <input
                        id="password"
                        placeholder="Создай пароль"
                        type={isPasswordShown ? "text" : "password"}
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onFocus={() => setErrorMessage("")}
                        className={`${errors.password && touched.password ? styles.inputError : null} ${styles.inputBox}`}
                    />
                    {
                        isPasswordShown
                            ? <img onClick={handlePasswordVisibility} src={hidePasswordIcon} alt="hidePasswordIcon"/>
                            : <img onClick={handlePasswordVisibility} src={showPasswordIcon} alt="showPasswordIcon"/>
                    }
                    <ul>
                        <li
                            className={touched.password && values.password === "" ? styles.error : (values.password ? (values.password.length > 7 && values.password.length < 16 ? styles.check : styles.error) : styles.initial)}
                        >От 8 до 15 символов
                        </li>
                        <li
                            className={touched.password && values.password === "" ? styles.error : (values.password ? (values.password.match(/(?=.*[a-z])(?=.*[A-Z])/) ? styles.check : styles.error) : styles.initial)}
                        >Строчные и прописные буквы
                        </li>
                        <li
                            className={touched.password && values.password === "" ? styles.error : (values.password ? (values.password.match(/(?=.*[0-9])/) ? styles.check : styles.error) : styles.initial)}
                        >Минимум 1 цифра
                        </li>
                        <li
                            className={touched.password && values.password === "" ? styles.error : (values.password ? (values.password.match(/(?=.*[!@#$%^"*])/) ? styles.check : styles.error) : styles.initial)}
                        >Минимум 1 спецсимвол (!, ", #, $...)
                        </li>
                    </ul>
                </div>
                <div className={styles.repeatPasswordInput}>
                    <input
                        id="confirmPassword"
                        placeholder="Повтори пароль"
                        type={isPasswordShown2 ? "text" : "password"}
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onFocus={() => setErrorMessage("")}
                        className={`${errors.confirmPassword && touched.confirmPassword ? styles.inputError : null} ${styles.inputBox}`}
                    />
                    {
                        isPasswordShown2
                            ? <img onClick={handlePasswordVisibility2} src={hidePasswordIcon} alt="hidePasswordIcon"/>
                            : <img onClick={handlePasswordVisibility2} src={showPasswordIcon} alt="showPasswordIcon"/>
                    }
                </div>
                <p className={styles.errorMessage}>{errorMessage}</p>
                {/*<Link to={"/verification"} state={{emailValue: values.email}}>*/}
                <Button type={"submit"} text={"Далее"} margin={"24px 0 0"} isLoading={isLoading}/>
                {/*<button className={!Object.keys(errors).length ? styles.activeButton : styles.inactiveButton} type="submit">Далее</button>*/}
                {/*</Link>*/}
            </form>
        </div>
    );
}

export default Registration;