import { createStore } from "reusable";
import { useEffect, useState } from "react";
import { set, update, omit, mapValues, keyBy, omitBy, take } from 'lodash/fp';
import { useApolloClient, useSubscription, useQuery } from "react-apollo";
import gql from "graphql-tag";
import { setCookie, destroyCookie } from "nookies";
import { useRouter } from "next/router";

export const useMe = createStore(() => {
    const router = useRouter();
    const [me, setMe] = useState({});
    const client = useApolloClient();

    useEffect(() => {
        client.query({
            query: gql`
            query me{
                me {
                  _id
                  login
                  name
                  email
                  password
                }
              }
          `
        }).then((r) => {
            setMe(r.data.me);
        });
    }, [client.cache]);

    return {
        me,
        firstName: () => me.name ? me.name.split(' ')[0] : '',
        lastName: () => me.name ? me.name.split(' ')[me.name.split(' ').length] : '',
        logout: async () => {
            await client.resetStore();
            destroyCookie({}, 'authorization');
            router.replace('/');
            return;
        },
    };
});
