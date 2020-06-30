import React from 'react';

import './RegisterDog.css';

import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { faCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Register = () => {
return(
    <div className="registerDog">
        <div className="dogIcon2">
          <div className="pawIcon">
            <FontAwesomeIcon icon={faPaw} />
          </div>

        </div>
        <div className="pointer">
            <div className="selectedCircle">
                <div className="circle">
                    <FontAwesomeIcon icon={faCircle} />
                </div> 
            </div>
            
            <strong>Cadastro Pet</strong>

        </div>
    </div>  
    )   
}

export default Register