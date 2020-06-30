import React from 'react';

import RegisterDog from '../../src/modules/home/components/formPage/RegisterDog';
import FormAbout from '../../src/modules/home/components/formPage/FormAbout';
import { useRouter } from "next/router";
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';



function Form() {
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
            _id: router.query._id
        }
    });
    if(loading || !data) return <div>carregando...</div>; 
    return(
      <>
        <div className="App">
          
            <RegisterDog />
            <FormAbout dog={data.dog_id} />
            
  
        </div>   
      </>
    )
  }
  
  export default Form
  