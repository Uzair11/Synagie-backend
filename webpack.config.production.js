/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const nodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin');
const CopyPlugin = require('copy-webpack-plugin');


const NODE_ENV = 'production';

const BUILD_DIR = 'build';

module.exports = {
    entry: './index.ts',
    mode: NODE_ENV,
    target: 'node',
    output: {
        path: path.resolve(__dirname, BUILD_DIR),
        filename: 'index.js'
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    'ts-loader',
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
        ]
    },
    externals: [nodeExternals()],
    plugins: [
        // new WebpackShellPlugin({
        //     onBuildEnd: ['npm run dev']
        // }),
        new CopyPlugin([
            { from: 'config/production.json', to: 'config/' },
        ]),
    ],
};
