import { createStore } from "reusable";
import { useEffect, useState } from "react";
import { set, update, omit, mapValues, keyBy, omitBy, take } from 'lodash/fp';
import { useApolloClient, useSubscription } from "react-apollo";
import gql from "graphql-tag";
import { setCookie, destroyCookie } from "nookies";
import { useRouter } from "next/router";

export const useLogin = createStore(() => {
    const client = useApolloClient();
    const router = useRouter();

    return {
        login: ({
            password,
            login
        }) => {
            return new Promise((resolve, reject) => {
                client.mutate({
                    mutation: gql`
                        mutation login($login: String, $password: String){
                            login(login: $login, password: $password){
                                temporaryPassword
                                token
                                u
                                me {
                                    _id
                                    name
                                    login
                                    email
                                    password
                                }
                            }
                        }
                    `,
                    variables: {
                        password,
                        login
                    }
                }).then((r) => {
                    setCookie({}, 'authorization', r.data.login.token, {});
                    if (r.data.login.temporaryPassword) {
                        setCookie({}, 'temporaryPassword', r.data.login.temporaryPassword, {})
                        router.push('/resetPassword');
                    } else {
                        router.push('/todo');
                    }
                    resolve(r.data.login);
                }).catch((e) => {
                    reject(e);
                });
            });
        }
    };
});
