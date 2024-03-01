import React, { useEffect, useState } from 'react';
import {Outlet} from "react-router-dom";
import SvgGroup from "../../components/SvgGroup/SvgGroup";
import 'react-toastify/dist/ReactToastify.css';
import styles from "./Layout.module.css"

function Layout() {

    
    return (
        <div className={styles.layout}>
            <div className={styles.layoutInner}>
                <div className={styles.leftBlock}>
                    <SvgGroup hideOnSmallScreen={true}/>
                    <h1>Lorby</h1>
                    <p>Твой личный репетитор</p>
                </div>
                <div className={styles.rightBlock}>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}

export default Layout;