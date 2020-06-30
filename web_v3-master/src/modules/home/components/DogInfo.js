import React from 'react'
import { faDog, faPaw } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './DogInfo.css';

 const DogInfo = props =>{
    return(
        <div className="dogInfoDiv">
            <div className="flex">
                <img src={props.src} alt={props.name} className="dogPic"/>
            </div>
        <div className="flex">
            <div className="dogName">
                <h2 className="dogName">{props.name}</h2>
            </div>
            <div className="dogSpan">
                <span><FontAwesomeIcon icon={faDog} /></span>
                <span className="infoSpan">{props.years}</span>
            </div>
            <div className="dogSpan">
            <span><FontAwesomeIcon icon={faPaw} /></span>
                <span className="infoSpan">{props.weight} Kg</span>
            </div>
         </div>
        </div>
    )
    
}

export default DogInfo