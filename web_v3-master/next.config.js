const withCSS = require('@zeit/next-css')
const withLess = require('@zeit/next-less')
const withFonts = require('next-fonts');

module.exports = withFonts(withLess(withCSS({
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
    lessLoaderOptions: {
        javascriptEnabled: true
    },
    devIndicators: {
        autoPrerender: false,
    },
    env: {
        HOST_API: 'http://localhost/graphql',
        HOST_SUB: 'ws://localhost/graphql',
        HOST: 'http://localhost'
    },
})));