const { resolve } = require('path');

module.exports = () => ({
    entry: {
        server: './packages/slots/server.tsx',
    },
    output: {
        filename: `[name].js`,
        libraryTarget: 'commonjs2',
        pathinfo: true,
        path: resolve(__dirname, `./dist/`),
    },
    target: 'node',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.svg$/,
                use: ['desvg-loader/react', 'svg-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.jsx'],
    },
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
