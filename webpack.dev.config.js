var path = require('path');
const { root } = require('./scripts/frontend/config');

module.exports = () => ({
    mode: process.env.NODE_ENV,
    entry: {
        server: './packages/frontend/app/dev-server.ts',
    },
    output: {
        filename: `[name].js`,
        chunkFilename: `[name].js`,
        libraryTarget: 'commonjs2',
        pathinfo: true,
    },
    target: 'node',
    optimization: {
        minimize: false,
        namedModules: true,
        runtimeChunk: false,
    },

    resolve: {
        alias: {
            '@root': path.resolve(__dirname, '.'),
            '@frontend': path.resolve(__dirname, 'packages', 'frontend'),
        },
        extensions: ['.js', '.ts', '.tsx', '.jsx'],
    },

    module: {
        rules: [
            {
                test: /(\.tsx)|(\.js)|(\.ts)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-typescript',
                                '@babel/preset-react',
                                [
                                    '@babel/preset-env',
                                    {
                                        targets: {
                                            node: 'current',
                                        },
                                    },
                                ],
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: ['to-string-loader', 'css-loader'],
            },
            {
                test: /\.svg$/,
                use: ['desvg-loader/react', 'svg-loader'],
            },
            {
                // make sure webpack tree-shakes this stuff
                // https://webpack.js.org/guides/tree-shaking/#mark-the-file-as-side-effect-free
                include: [
                    path.resolve(root, 'packages', 'guui'),
                    path.resolve(root, 'packages', 'pasteup'),
                ],
                sideEffects: false,
            },
        ],
    },

    externals: [
        require('webpack-node-externals')({
            whitelist: [/^@guardian/],
        }),
        (_, request, callback) =>
            /manifest\.json$/.test(request)
                ? callback(null, `commonjs ${request}`)
                : callback(),
    ],
});
