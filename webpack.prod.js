const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPugin = require('css-minimizer-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        main: './src/client/index.js'
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({}), new CssMinimizerPugin({})],
    },
    output: {
        library: "Client",
        libraryTarget: "var",
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
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
                use: [MiniCSSExtractPlugin.loader, 'css-loader', 'sass-loader'],
            }
        ]
    },

    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: './index.html'
        }),
        new MiniCSSExtractPlugin({
            filename: "[name].css"
        })
    ]

}