import fetch from 'node-fetch';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { parseCookies } from 'nookies';
const { createUploadLink } = require('apollo-upload-client')

const authLink = setContext((_, { headers }) => {
    const definition = getMainDefinition(_.query);
    return {
        headers: {
            ...headers,
            authorization: parseCookies().authorization,
        }
    }
});

const subscriptionMiddleware = {
    applyMiddleware: function (options, next) {
        options.authorization = parseCookies().authorization;
        next()
    },
};

function getLink() {
    if (process.browser) {
        let wsLink = new WebSocketLink({
            uri: process.env.HOST_SUB,
            options: {
                reconnect: true,
                connectionParams: () => ({ authorization: parseCookies().authorization }),
                connectionCallback: (a) => {
                    console.log('ws connected!!!');
                },
            },
        });
        wsLink.subscriptionClient.use([subscriptionMiddleware]);
        return split(
            // split based on operation type
            ({ query }) => {
                const definition = getMainDefinition(query);
                return (
                    definition.kind === 'OperationDefinition' &&
                    definition.operation === 'subscription'
                );
            },
            wsLink,
            new createUploadLink({
                uri: process.env.HOST_API,
                fetch,
                headers: {
                }
            }),
        );
    } else {
        return new createUploadLink({
            uri: process.env.HOST_API,
            fetch,
            headers: {
            }
        });

    }
}

const Apollo = () => {
    return new ApolloClient({
        link: authLink.concat(getLink()),
        cache: new InMemoryCache(),
    });
}

export default Apollo;