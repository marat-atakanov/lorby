import React from 'react';
import SvgGroupNotFound from "../../components/SvgGroupNotFound/SvgGroupNotFound";
import styles from "./NotFoundPage.module.css"
import {Link, useNavigate} from "react-router-dom";
import Button from "../../components/Button/Button";

function NotFoundPage() {
    const navigate = useNavigate()
    return (
        <div className={styles.notFoundPage}>
            <div className={styles.notFoundPageInner}>
                <h1>404</h1>
                <SvgGroupNotFound/>
                <p>Упс... Не туда попали...</p>
                <Button type={"button"} text={"Вернуться назад"} onClick={()=>navigate(-1)} lightTheme={true} margin={"8px 0 0"}/>
            </div>
        </div>
    );
}

export default NotFoundPage;