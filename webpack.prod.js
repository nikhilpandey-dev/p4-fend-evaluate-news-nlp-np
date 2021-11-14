const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: {
        main: './src/client/index.js'
    },
    output: {
        library: "Client",
        libraryTarget: "var",
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        clean: true

    },
    stats: 'normal',
    module: {
        rules: [
            {
                test: /\.(svg|ico|png|webp|jpg|gif|jpeg)$/i,
                type: "asset/resource"

            },

            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },

            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            }
        ]
    },

    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: './index.html'
        })
    ]

}