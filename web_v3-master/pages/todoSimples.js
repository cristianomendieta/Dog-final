import { useState } from "react"
import { useMutation, useQuery } from "react-apollo";
import gql from "graphql-tag";


export default () => {
  // mutation // post -> criar algo, mandar algo para api
  // query  // get -> trazer algo da api
  // subscription  // sub -> real time, web socket
  //hook // tudo que tem USE na frente é um hook
  const [value, setValue] = useState('batatinha doce');
  const [newLista] = useMutation(gql`
        mutation newLista($title: String!){
          newLista(title: $title) {
            _id
            title
          }
        }  
  `);

  const { data, loading } = useQuery(gql`
    query lista{
        lista {
          _id
          title
        }
      }
  `);

  console.log(data);

  return (
    <div>
      <input
        value={value}
        onChange={(e) => {
          let valorDigitado = e.nativeEvent.target.value;
          setValue(valorDigitado);
        }}
        onKeyPress={(e) => {
          if (e.key == 'Enter') {
            newLista({
              variables: {
                title: value
              },
              refetchQueries: ['lista']
            })
          }
        }}
      />
      <ul>
        {!loading ? data.lista.map((todo, index) => {
          return (
            <li>{todo.title}</li>
          )
        }) : null}
      </ul>
    </div>
  )
}