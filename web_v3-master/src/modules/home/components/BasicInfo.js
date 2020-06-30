import React, { useState} from "react"
import MainPage from './dogPage/MainPage';

import DogInfo from './DogInfo.js';
import SearchBar from './SearchBar.js';

import './BasicInfo.css';



const BasicInfo = (props) => {


const data = props.data
const loading = props.loading

const [open, setOpen] =useState(false)

    
    return(
      <div className='dogInfo'>
      <SearchBar />
      <div className="allDogs">
      {!loading ? data.dog.map((dog, index) => {
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

        return(
          <div onClick={() => {
            props.function(dog);
          }}>
          <DogInfo 
          src={dog.photo}
          name={dog.name}
          years={year + ' anos'}
          weight={weight}
          id={dog.id}
          />
          </div>
        )
        }) : null
      }
      </div>

            
      </div>
        
    )

        }
export default BasicInfo
