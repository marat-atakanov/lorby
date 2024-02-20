import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import hidePasswordIcon from "../../assets/icons/hidePasswordIcon.svg";
import showPasswordIcon from "../../assets/icons/showPasswordIcon.svg";
import { useNavigate } from "react-router-dom";
import { Slide, toast, ToastContainer } from "react-toastify";
import { ApiClient } from "../../utils/axiosUtils";
import Button from "../Buttons/Button";

function Login() {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handlePasswordVisibility = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  const notify = () => {
    toast("Неверный логин или пароль", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      className: styles.notification,
      bodyClassName: styles.notificationBody,
      closeButton: false,
      pauseOnFocusLoss: "false",
      transition: Slide,
      toastId: "errorNotification",
    });
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      if (await ApiClient().login(username, password)) {
        navigate("/main", {state: {oldUser: true}});
      } else {
        notify();
      }
    } catch (e) {
        console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (ApiClient().tokens) {
      navigate("/main");
    }
  }, []);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin().then();
        }}
        className={styles.loginPanel}
      >
        <h2 className={styles.title}>Вэлком бэк!</h2>
        <div className={styles.loginInput}>
          <input
            placeholder="Введи логин"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.passwordInput}>
          <input
            placeholder="Введи пароль"
            type={isPasswordShown ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isPasswordShown ? (
            <img
              onClick={handlePasswordVisibility}
              src={hidePasswordIcon}
              alt="hidePasswordIcon"
            />
          ) : (
            <img
              onClick={handlePasswordVisibility}
              src={showPasswordIcon}
              alt="showPasswordIcon"
            />
          )}
        </div>
        <Button
          type={"submit"}
          text={"Войти"}
          isLoading={isLoading}
          margin={"48px 0 0"}
        />
        {/*<Button type={"button"} onClick={()=>ApiClient().logout()} text={"Выйти"} margin={"48px 0 0"} lightTheme={false}/>*/}
        <Button
          type={"button"}
          onClick={() => navigate("/register")}
          text={"У меня еще нет аккаунта"}
          margin={"48px 0 0"}
          lightTheme={true}
        />
      </form>
      <ToastContainer className={styles.notificationContainer} />
    </>
  );
}

export default Login;
