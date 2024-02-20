import React, { useEffect, useState } from 'react';
import {Outlet} from "react-router-dom";
import SvgGroup from "../../components/SvgGroup/SvgGroup";
import 'react-toastify/dist/ReactToastify.css';
import styles from "./Layout.module.css"

function Layout() {

    const [display, setDisplay] = useState("none")
    
    useEffect(()=>{

        const checkSize = () => {
            if (window.matchMedia("(max-width: 768px)").matches) {
                setDisplay("none")
              } else {
                setDisplay("block")
              }
        }
        window.addEventListener("resize", checkSize)
        checkSize()
        return () => {
            window.removeEventListener("resize", checkSize)
        }
        
    }, [])
    return (
        <div className={styles.layout}>
            <div className={styles.layoutInner}>
                <div className={styles.leftBlock}>
                    <SvgGroup displayValue={display}/>
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