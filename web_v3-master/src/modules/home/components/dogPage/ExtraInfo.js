import React from 'react'
import './ExtraInfo.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


 const ExtraInfo = props =>{
    
    return(
        <div className="extraInfoDiv">
            <div className="roundedIcon">
                <span><FontAwesomeIcon icon={props.src} /></span>
            </div>
            <div className="textSpan">
                <span className="infoSpan">{props.text}</span>
            </div>
        </div>
)
}

export default ExtraInfo