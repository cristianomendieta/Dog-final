import RegisterSpace from '../src/modules/home/components/RegisterSpace';
import BasicInfo from '../src/modules/home/components/BasicInfo';
import MainPage from '../src/modules/home/components/dogPage/MainPage';
import React, {useState} from 'react'
import { useMutation, useQuery } from "react-apollo";
import gql from "graphql-tag";
import './home.css';



function Home() {

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
          photo
        }
      }
      `);




  const [open, setOpen] = useState(false)
  const [dog, setDog] = useState()

  const handleClick = (dog) =>{
    setDog(dog);
    setOpen(true)
  }


  const renderMainPage = (dog) => {    
    return(
      <MainPage _id={dog._id} />
    )
  }
 

  return(
    <>
      <div className="App">
      
     
        <RegisterSpace />
      
      <div className="basic">
        <BasicInfo data={data} loading={loading} function={handleClick}/>
      </div>
      <div className="main">
      { open ? 
            renderMainPage(dog) : null
      }
      </div>
     

      </div>   
    </>
  )
}

export default Home