import React, { useEffect, useRef, useState } from "react";
import styles from "./MainPage.module.css";
import SvgGroup from "../../components/SvgGroup/SvgGroup";
import Button from "../../components/Buttons/Button";
import { ApiClient } from "../../utils/axiosUtils";
import { useLocation, useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      !ApiClient().getTokens()
    ) {
      navigate("/");
    }
  }, [navigate]);

  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTransition, setIsTransition] = useState(false);
  const ref = useRef(document.querySelector("body"));

  const handleModal = () => {
    setIsModalOpen((prev) => {
        ref.current.style.overflow = !prev ? "hidden" : "auto"
      return !prev;
    });
    setIsTransition(true);
    setTimeout(() => setIsTransition(false), 120);
  };

  const handleLogout = async () => {
    setIsLoading(true);
    if (await ApiClient().logout()) {
      navigate("/");
    } else {
      console.log("Error!");
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.mainPage}>
      <div
        className={styles.mainPageInner}
        style={
          isModalOpen
            ? {
                filter: "blur(4px)",
                transition: isTransition ? "100ms" : "none",
              }
            : {}
        }
      >
        <div>
          <h1 className={styles.greeting}>
            {location.state?.oldUser ? "С возвращением!" : "Добро пожаловать!"}
          </h1>
          <p>Lorby - твой личный репетитор</p>
        </div>
        <SvgGroup />
        <Button
          type={"button"}
          text={"Выйти"}
          margin={"40px 0 0"}
          lightTheme={true}
          onClick={handleModal}
        />
      </div>

      <div
        onClick={handleModal}
        className={styles.modalBg}
        style={isModalOpen ? { display: "flex" } : { display: "none" }}
      >
        <div className={styles.modalWindow} onClick={(e) => e.stopPropagation()}>
          <p>Выйти?</p>
          <p>Точно выйти?</p>
          <Button
            type={"button"}
            text={"Да, точно"}
            margin={"24px 0 0"}
            isLoading={isLoading}
            onClick={handleLogout}
          />
          <Button
            type={"button"}
            text={"Нет, остаться"}
            margin={"8px 0 0"}
            lightTheme={true}
            onClick={handleModal}
          />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
