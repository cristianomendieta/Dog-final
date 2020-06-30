import { createStore } from "reusable";
import { useEffect, useState } from "react";
import { set, update, omit, mapValues, keyBy, omitBy, take } from 'lodash/fp';
import { useApolloClient, useSubscription } from "react-apollo";
import gql from "graphql-tag";

export const useTodos = createStore(() => {
  const [todos, setTodos] = useState({});
  const client = useApolloClient();

  useEffect(() => {
    client.subscribe({
      query: gql`
        subscription subTodo{
          subTodo{
            type
            todo {
              _id
              title
              completed
              user {
                name
              }
            }
          }
        }
        `
    }).subscribe({
      next(result) {
        switch (result.data.subTodo.type) {
          case 'newTodo':
            setTodos(set(result.data.subTodo.todo._id, result.data.subTodo.todo));
            break;
          case 'removeTodo':
            setTodos(omit(result.data.subTodo.todo._id));
            break;
          case 'toggleTodo':
            setTodos(update([result.data.subTodo.todo._id, 'completed'], prev => !prev));
            break;
          case 'completeAll':
            setTodos(mapValues(set('completed', true)));
            break;
          case 'setAllIncomplete':
            setTodos(mapValues(set('completed', false)));
            break;
          case 'clearCompleted':
            setTodos(omitBy(todo => todo.completed));
            break;
        }
      },
      error(err) { console.error('err', err); },
    });

    client.query({
      query: gql`
      query todos{
        todos {
          _id
          title
          completed
          user {
            name
          }
        }
      }
      
      `
    }).then((r) => {
      setTodos(keyBy(
        '_id',
        r.data.todos
      ))
    });
  }, []);

  return {
    todos,
    addTodo: async (title) => {
      let result = await client.mutate({
        mutation: gql`
        mutation newTodo($title: String!){
          newTodo(title: $title) {
            _id
            title
            completed
            user {
              name
            }
          }
        }
        `,
        variables: {
          title
        }
      });
    },
    removeTodo: async (_id) => {
      let result = await client.mutate({
        mutation: gql`
        mutation removeTodo($_id: String!){
          removeTodo(_id: $_id) {
            _id
            title
            completed
            user {
              name
            }
          }
        }
        `,
        variables: {
          _id
        }
      });
    },
    toggleTodo: async (_id) => {
      let result = await client.mutate({
        mutation: gql`
        mutation toggleTodo($_id: String!){
          toggleTodo(_id: $_id) {
            _id
            title
            completed
            user {
              name
            }
          }
        }
        `,
        variables: {
          _id
        }
      });
    },
    completeAll: async () => {
      await client.mutate({
        mutation: gql`
        mutation completeAll{
          completeAll {
            _id
            title
            completed
            user {
              name
            }
          }
        }
        `
      });
    },
    setAllIncomplete: async () => {
      await client.mutate({
        mutation: gql`
        mutation setAllIncomplete{
          setAllIncomplete {
            _id
            title
            completed
            user {
              name
            }
          }
        }
        `
      });
    },
    clearCompleted: async () => {
      await client.mutate({
        mutation: gql`
        mutation clearCompleted{
          clearCompleted {
            _id
            title
            completed
            user {
              name
            }
          }
        }
        `
      });
    },
  };
});
