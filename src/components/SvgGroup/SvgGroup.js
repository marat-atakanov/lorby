import React from 'react';
import "./svgGroup.css"
import windowAndItems from "../../assets/images/sittingManOnWindowAndItems/windowAndItems.svg";
import sittingMan from "../../assets/images/sittingManOnWindowAndItems/sittingMan.svg";
import curvedLines from "../../assets/images/sittingManOnWindowAndItems/curvedLines.svg";
import paperPlane from "../../assets/images/sittingManOnWindowAndItems/paperPlane.svg";
import mail from "../../assets/images/sittingManOnWindowAndItems/mail.svg";
import planeTrail from "../../assets/images/sittingManOnWindowAndItems/planeTrail.svg";
import calendar from "../../assets/images/sittingManOnWindowAndItems/calendar.svg";
import paper from "../../assets/images/sittingManOnWindowAndItems/paper.svg";
import tablet from "../../assets/images/sittingManOnWindowAndItems/tablet.svg";
import books from "../../assets/images/sittingManOnWindowAndItems/books.svg";
import plant from "../../assets/images/sittingManOnWindowAndItems/plant.svg";

function SvgGroup() {
    return (
        <div className="svgGroup" draggable="false">
            <img draggable="false" id="part1" src={windowAndItems} alt="windowAndItems"/>
            <img draggable="false" id="part2" src={sittingMan} alt="sittingMan"/>
            <img draggable="false" id="part3" src={curvedLines} alt="curvedLines"/>
            <img draggable="false" id="part4" src={paperPlane} alt="paperPlane"/>
            <img draggable="false" id="part5" src={mail} alt="mail"/>
            <img draggable="false" id="part6" src={planeTrail} alt="planeTrail"/>
            <img draggable="false" id="part7" src={calendar} alt="calendar"/>
            <img draggable="false" id="part8" src={paper} alt="paper"/>
            <img draggable="false" id="part9" src={tablet} alt="tablet"/>
            <img draggable="false" id="part10" src={books} alt="books"/>
            <img draggable="false" id="part11" src={plant} alt="plant"/>
        </div>
    );
}

export default SvgGroup;