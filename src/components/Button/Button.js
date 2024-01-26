import React from 'react';
import styles from "./Button.module.css"

function Button({text, isLoading, margin, onClick, type, lightTheme}) {
    return (
        <button
            disabled={isLoading}
            onClick={onClick}
            type={type}
            style={{margin}}
            className={`
                ${styles.buttonStyle} 
                ${isLoading ? styles.loadingButtonStyle : `${styles.hoverButtonStyle} ${styles.activeButtonStyle}`} 
                ${lightTheme ? styles.light : ""}
            `}
        >
            {text}
        </button>
    );
}

export default Button;