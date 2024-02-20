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

function SvgGroup({displayValue = "block"}) {
    return (
        <div style={{display: displayValue}} className="svgGroup" draggable="false">
            <img draggable="false" id="windowAndItems" src={windowAndItems} alt="windowAndItems"/>
            <img draggable="false" id="sittingMan" src={sittingMan} alt="sittingMan"/>
            <img draggable="false" id="curvedLines" src={curvedLines} alt="curvedLines"/>
            <img draggable="false" id="paperPlane" src={paperPlane} alt="paperPlane"/>
            <img draggable="false" id="mail" src={mail} alt="mail"/>
            <img draggable="false" id="planeTrail" src={planeTrail} alt="planeTrail"/>
            <img draggable="false" id="calendar" src={calendar} alt="calendar"/>
            <img draggable="false" id="paper" src={paper} alt="paper"/>
            <img draggable="false" id="tablet" src={tablet} alt="tablet"/>
            <img draggable="false" id="books" src={books} alt="books"/>
            <img draggable="false" id="plant" src={plant} alt="plant"/>
        </div>
    );
}

export default SvgGroup;