const { resolve } = require('path');

module.exports = () => ({
    entry: {
        server: './packages/slots/server.ts',
    },
    output: {
        filename: `server.js`,
        libraryTarget: 'commonjs2',
        pathinfo: true,
        path: resolve(__dirname, `./dist/`),
    },
    target: 'node',
    externals: [
        require('webpack-node-externals')({
            whitelist: [/^@guardian/],
        }),
        (context, request, callback) =>
            /manifest\.json$/.test(request)
                ? callback(null, `commonjs ${request}`)
                : callback(),
    ],
});
