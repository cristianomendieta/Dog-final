import { ReusableProvider } from "reusable";
import App from 'next/app';
import React from 'react';
import { ApolloProvider, useQuery } from 'react-apollo';
import moment from 'moment';
import 'moment/locale/pt-br';
import { ConfigProvider } from 'antd';
import pt_br from 'antd/lib/locale-provider/pt_BR';
import { AnimatePresence } from 'framer-motion';

// import '../src/commons/style/ant.less';
// import '../src/commons/style/hub.less';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { sessionValidate } from '../src/commons/util';
import nookies from 'nookies';
import gql from 'graphql-tag';
import jwt from 'jsonwebtoken';
import Apollo from "../src/config/apollo";

moment.locale('pt-br');

class Index extends App {

    static async getInitialProps({ Component, ctx, router }) {
        const auth = (authorization) => new Promise((resolve, reject) => {
            jwt.verify(authorization, 'gandfoda', function (err, decoded) {
                if (err) return resolve(false);
                return resolve(true);
            });
        });

        const cookies = nookies.get(ctx);
        if (cookies.authorization && !await auth(cookies.authorization)) {
            nookies.destroy(ctx, 'authorization');
            nookies.destroy(ctx, 'temporaryPassword');
            ctx.res.writeHead(302, {
                Location: '/login'
            })
            ctx.res.end()
        }

        sessionValidate({
            ctx,
            externPaths: ['/'],
            homePath: '/todo',
            initialPath: '/'
        }); 

        const pageProps =
            (Component.getInitialProps &&
                (await Component.getInitialProps({ ...ctx }))) ||
            {}

        return { pageProps }
    } 


    render() {
        const { Component, pageProps, ...rest } = this.props
        return (
            <ApolloProvider client={Apollo()}>
                <ReusableProvider>
                    <style global jsx>{`
                    `}</style>
                    <ConfigProvider locale={pt_br}>
                        <AnimatePresence exitBeforeEnter>
                            <Component {...pageProps} {...rest} />
                        </AnimatePresence>
                    </ConfigProvider>
                </ReusableProvider>
            </ApolloProvider>
        )
    }
}
export default Index;