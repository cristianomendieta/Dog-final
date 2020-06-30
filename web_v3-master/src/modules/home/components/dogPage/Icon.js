import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Icon.css'

const Icon = props =>{
    return(
        <div className="mainDiv">
            <div className="iconDiv">
                <span><FontAwesomeIcon icon={props.icon}/></span>
            </div>
            <div className="descript">
                <p>{props.description}</p>
            </div>
        </div>
    )
}

export default Icon