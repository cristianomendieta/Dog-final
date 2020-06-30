import { createStore } from "reusable";
import { useEffect, useState, useMemo } from "react";
import { set, update, omit, mapValues, keyBy, omitBy, take, values } from 'lodash/fp';
import { useApolloClient, useSubscription } from "react-apollo";
import gql from "graphql-tag";
import { setCookie, destroyCookie } from "nookies";
import { useRouter } from "next/router";

export const useUserStore = createStore(() => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const client = useApolloClient();

    useEffect(() => {
        client.query({
            query: gql`
            query simpleSearchUser($name: String){
                simpleSearchUser(name: $name){
                  _id
                  login
                  name
                }
              }
          `,
            variables: {
                name: ''
            }
        }).then((r) => {
            setUsers(keyBy(
                '_id',
                r.data.simpleSearchUser
            ));
        });
    }, []);

    return {
        users,
        user,
        edit: (_id) => {
            client.query({
                query: gql`
                query user($_id: String){
                    user(_id: $_id) {
                      _id
                      login
                      name
                      email
                      password
                      status
                    }
                  }
              `,
                variables: {
                    _id
                }
            }).then((r) => {
                setUser(r.data.user);
            });
        },
        search: (name) => {
            client.query({
                query: gql`
                query simpleSearchUser($name: String){
                    simpleSearchUser(name: $name){
                      _id
                      login
                      name
                    }
                  }
              `,
                variables: {
                    name
                }
            }).then((r) => {
                setUsers(r.data.simpleSearchUser);
            });
        },
        remove: async (_id) => {
            let result = await client.mutate({
                mutation: gql`
                mutation removeUser($_id: String!){
                    removeUser(_id: $_id) {
                    _id
                    login
                    name
                }
              }
              `,
                variables: {
                    _id
                }
            });
            setUsers(omit(_id));
        },
        save: (values) => {
            return new Promise(async (resolve, reject) => {
                let result = await client.mutate({
                    mutation: gql`
                    mutation saveUser($input: JSON){
                        saveUser(input: $input) {
                        _id
                        login
                        name
                    }
                  }
                  `,
                    variables: {
                        input: values
                    }
                }).catch((e) => {
                    reject(e);
                });
                setUsers(set(result.data.saveUser._id, result.data.saveUser));
                resolve(result.data.saveUser);
            })
        },
    };
});


export const useUsersArray = createStore(() => {
    const { users } = useUserStore();

    return useMemo(() => values(users), [users]);
});