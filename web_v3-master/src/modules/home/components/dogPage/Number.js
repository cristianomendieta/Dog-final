import React from 'react'
import './Number.css'

const Number = props =>{
    return(
        <div className="mainDiv">
            <div>
                <span className="p"><h3>{props.title}</h3></span>
            </div>
            <div className="desc">
                <p>{props.description}</p>
            </div>
        </div>
    )
}

export default Number