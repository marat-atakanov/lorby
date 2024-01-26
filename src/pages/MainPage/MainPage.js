import React, {useEffect, useState} from 'react';
import styles from "./MainPage.module.css"
import SvgGroup from "../../components/SvgGroup/SvgGroup";
import Button from "../../components/Button/Button";
import {ApiClient} from "../../utils/axiosUtils";
import {useNavigate} from "react-router-dom";

function MainPage() {
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem("access_token") || !localStorage.getItem("refresh_token")) {
            navigate("/")
        }
        ApiClient().checkTokens().then(
            () => {
                if (!localStorage.getItem("access_token") || !localStorage.getItem("refresh_token")) {
                    navigate("/")
                }
            }
        )
    }, [navigate]);

    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTransition, setIsTransition] = useState(false);
    const handleModal = () => {
        setIsModalOpen(!isModalOpen)
        setIsTransition(true)
        setTimeout(()=> setIsTransition(false), 120)
    }

    const handleLogout = async () => {
        setIsLoading(true)
        if (await ApiClient().logout()) {
            navigate("/")
        } else {
            console.log("Error!")
        }
        await setIsLoading(false)
    }




    return (
        <div className={styles.mainPage}>
            <div className={styles.mainPageInner} style={isModalOpen ? {filter: "blur(4px)", transition: isTransition ? "100ms" : "none"} : {}}>
                <h1 className={styles.greeting}>Добро пожаловать!</h1>
                <p>Lorby - твой личный репетитор</p>
                <SvgGroup/>
                <Button type={"button"} text={"Выйти"} margin={"40px 0 0"} lightTheme={true} onClick={handleModal}/>
            </div>

            <div className={styles.modalBg} style={isModalOpen ? {display: "flex"} : {display: "none"}}>
                <div className={styles.modalWindow}>
                    <p>Выйти?</p>
                    <p>Точно выйти?</p>
                    <Button type={"button"} text={"Да, точно"} margin={"24px 0 0"} isLoading={isLoading} onClick={handleLogout}/>
                    <Button type={"button"} text={"Нет, остаться"} margin={"8px 0 0"} lightTheme={true} onClick={handleModal}/>
                </div>
            </div>

        </div>
    );
}

export default MainPage;