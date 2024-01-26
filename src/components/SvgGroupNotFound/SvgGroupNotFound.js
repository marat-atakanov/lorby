import React from 'react';
import windowAndItems from "../../assets/images/sittingManOnWindowAndItems/windowAndItems.svg";
import books from "../../assets/images/sittingManOnWindowAndItems/books.svg";
import plant from "../../assets/images/sittingManOnWindowAndItems/plant.svg";
import styles from "./SvgGroupNotFoundPage.module.css"

function SvgGroupNotFound() {
    return (
        <div className={styles.svgGroup} draggable="false">
            <img draggable="false" className={styles.part1} src={windowAndItems} alt="windowAndItems"/>
            <img draggable="false" className={styles.part2} src={books} alt="books"/>
            <img draggable="false" className={styles.part3} src={plant} alt="plant"/>
        </div>
    );
}

export default SvgGroupNotFound;