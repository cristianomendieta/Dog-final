import React from 'react'
import ExtraInfo from './ExtraInfo'
import Icon from './Icon'
import Number from './Number'
import { faMapMarkerAlt, faCommentDots, faPen, faVenus, faCheckCircle, faVenusMars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './MainPage.css'
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import { useRouter } from "next/router";

const MainPage = ({
    _id
}) => {
    const router = useRouter();
    const {data, loading} = useQuery(gql`
    query dog_id($_id: String){
      dog_id(_id: $_id) {
        _id
        name
        id
        birthday
        weight
        breed
        gender
        castrated
        photo
      }
    }
    `,{
        variables: {
            _id: _id
        }
    });
    if(loading || !data) return <div>carregando...</div>; 

   const trataDados = ()=> {
    
let dog = data.dog_id;
    let weight;

    
    if(dog.weight === 0){
      weight = '0 - 10'
    }else if(dog.weight === 1){
      weight = '10 - 20'
    }else if(dog.weight === 2){
      weight = '20 - 50'
    }else{
      weight = '50+'
    }

    let age = dog.birthday
    let calc = age.slice(6, 10)
    let year = 2020 - parseInt(calc)

    let gender;
    if(dog.gender === 0){
      gender = 'Feminino'
    }else{
      gender = 'Masculino'
    }

    let castrated;
    if(dog.castrated === 0){
      castrated = 'Castrado'
    }else{
      castrated = 'Não castrado'
    }

    return {
        ...dog,
        gender,
        weight,
        year,
        castrated,
        src: dog.photo,
        title: dog.name
    }
   }
let props = trataDados();

console.log(props);

    return(
        
        <div className="allInfo">
        <div className="title">
            <h1>{props.title}</h1>
        </div>
        <div className="edit">
            <div className="image">
                <img src={props.src} alt={props.title} />
            </div>
            <div className="editButton">
                <button onClick={() => {
router.push('/dogForm/'+_id);
                }}><span><FontAwesomeIcon icon={faPen} /></span>Edit</button>
            </div>
            
        </div>
        <div className="table">
            <Icon icon={faVenusMars} description={props.gender} />
            <Number title={props.year} description={'anos'} />
            <Icon icon={faCheckCircle} description={props.castrated} />
            <Number title={props.weight} description={'KG'} />
        </div>
        
        <div className="extraInfoDiv">
            <div className="roundedIcon">
                <span><FontAwesomeIcon icon={faMapMarkerAlt} /></span>
            </div>
            <div className="textSpan">
                <span className="infoSpan">Rua Emiliano Perneta, Centro</span><br/>
                <span className="infoSpan">Curitiba, FL 32789</span><br/>
                <span className="infoSpan">(41) 98877-1233</span><br/>
            </div>
        </div>
        <div className="extraInfoDiv">
            <div className="roundedIcon">
                <span><FontAwesomeIcon icon={faCommentDots} /></span>
            </div>
            <div className="textSpan">
                <span className="infoSpan">Certifique-se de dar a ela o </span><br/>
                <span className="infoSpan">antibióticos, eles estão na cozinha</span><br/>
                <span className="infoSpan"> counter … Leia mais</span>
            </div>
        </div>
        <div className="extraInfoDiv">
                <div className="takeCare">
                    <span><img alt='Cuidador'  src='https://public-v2links.adobecc.com/228a81d2-4ba8-4811-5ec1-fe074f5f8143/component?params=component_id%3Ac3296b0e-1bd3-4ae0-a6aa-bb5bf9daa841&params=version%3A0&token=1593560859_da39a3ee_59eeae1d3b42087604acc394c043c5e9d5ebc271&api_key=CometServer1' /></span>
                </div>
                
            <div className="textSpan">
                <span className="infoSpan">Cuidador</span><br/>
                <span className="infoSpan"><h3>Andrew Couldwell</h3></span>
            </div>
        </div>
        </div>
    )
    
}

export default MainPage