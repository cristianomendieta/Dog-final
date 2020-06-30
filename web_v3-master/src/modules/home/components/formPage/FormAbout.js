import React, { useState } from 'react';
import { useMutation, useQuery } from "react-apollo";
import gql from "graphql-tag";

import './FormAbout.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

const About = ({
    dog = {
        name: '',
        image: '',
        breed: '',
        birthday: '',
        gender: 0,
        castrated: 0,
        weight: 0
    }
}) => {


    const [newDog] = useMutation(gql`
        mutation newDog($name: String!, $birthday: String!, $weight: Int!, $breed: String!, $gender: Int!, $castrated: Int!, $photo: Upload!){
          newDog(name: $name, birthday: $birthday, weight: $weight, breed: $breed, gender: $gender, castrated: $castrated, photo: $photo) {
            _id
            name
            birthday
            weight
            breed
            gender
            castrated
            photo
          }
        }  
  `);

  const { data, loading } = useQuery(gql`
    query dog{
        dog {
          _id
          name
          birthday
          weight
          breed
          gender
          castrated
        }
      }
  `);

  console.log(data);

    const [initialValues, setInitialValue] = useState(dog)

    const [values, setValues] = useState(initialValues)

    const [getGender, setGender] = useState([
        {id: 0, name: 'Feminino'},
        {id: 1, name: 'Masculino'}
    ])

    const [getCastrated, setCastrated] = useState([
        {id: 0, name: 'Sim'},
        {id: 1, name: 'Não'}
    ])


    const [getWeight, setWeight] = useState([
        {id: 0, name: '0-10'},
        {id: 1, name: '10-20'},
        {id: 2, name: '20-50'},
        {id: 3, name: '50+'},
    ])

    const handleChange  = (event) =>{
        event.preventDefault()
        setValues({
            ...values,
            [event.target.name] : event.target.value
        })
    }


    const handleSave = () =>{
        console.log(values);
        newDog({
            variables: {
                ...values,
              name: values.name,
              breed: values.breed,
              birthday: values.birthday,
              gender: parseInt(values.gender),
              castrated: parseInt(values.castrated),
              weight: parseInt(values.weight),
              photo: values.photo
            },
            refetchQueries: ['dog']
          })
        console.log(`VALUES ${JSON.stringify(values)}`)
    }

return(

    <div className="formAbout">
        <div className="title">
            <h1>Nos conte um pouco mais sobre seu pet.</h1>
        </div>

        <form method="POST">
            <fieldset>
                <div class="field-group">
                    <div class="field">
                        <label for="name">Nome</label>
                        <div classname="nameInput">
                            <input type="text" name="name" required="required" placeholder="Nome do pet" value={values.name} onChange={handleChange}/>
                        </div>
                    </div>

                    <div class="photo">
                            
                        <label for="photoIcon">
                            <FontAwesomeIcon className="icon" icon={faCamera} />
                        </label>
                    
                    
                    <div className="file-upload">
                    <input  type="file" onChange={(e) => {
                                let file = e.target.files[0];
                                setValues({
                                    ...values,
                                    photo : file
                                })
                            }} />

                    </div>
                    </div>
                </div>

                <div class="field-group">
                    <div class="field">
                        <label for="breed">Raça</label>
                        <input type="text" name="breed" required="required" placeholder="Raça do pet" value={values.breed} onChange={handleChange}/>
                    </div>
                    <div class="field">
                        <label for="birthday">Aniversário</label>
                        <input type="text" name="birthday" required="required" placeholder="DD/MM/AAAA" value={values.birthday} onChange={handleChange}/>
                    </div>
                </div>

                <div class="field-group">
                    <div class="field">
                        <label for="genre">Gênero</label>
                        <div className="genreOptions">
                            {
                                getGender.map(option => (
                                    <button classname="genre" value={option.id} name='gender' onClick={handleChange}>{option.name}</button>
                                ))
                            }
                            
                        </div>
                    </div>
                    <div class="field">
                        <label for="castrated">Castrado</label>
                        <div className="castratedOptions">
                            {
                                getCastrated.map(option => (
                                    <button className="castrated" value={option.id} name='castrated' onClick={handleChange}>{option.name}</button>
                                ))
                        
                            }
                        </div>

                    </div>
                </div>

                
                <div class="field-group">
                <div class="field">
                    <label for="weight">Peso</label>
                    <div className="weightOptions">
                            {
                                getWeight.map(option => (
                                    <button className="weight" value={option.id} name='weight' onClick={handleChange}>{option.name}</button>
                                ))
                            }
                    </div>
                
                </div>
                </div>


            </fieldset>

        

        
        </form>

        <div className="aboutButton">
           <div className="cancelButton" >
            <a href="/home">
                <strong>Cancelar</strong>
            </a>
           </div>
           <div className="saveButton">
            <a href="/home">
                <strong onClick={handleSave}>Salvar</strong>
            </a>
           </div> 
        </div>

        
       
    </div>
    )   
}

export default About