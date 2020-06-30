import React from 'react';

import './RegisterSpace.css';

import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RegisterSpace = () => {
return(
    <div className="registerSpace">
        <div className="dogIcon">
          <div className="pawIcon">
            <FontAwesomeIcon icon={faPaw} />
          </div>

        </div>
        <div className="registerButton">
          <a href="/dogForm">
            <strong>Cadastrar</strong>
          </a>
        </div>
    </div>  
    )   
}

export default RegisterSpace