var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var webpackConfig = {
    watch: true,
    module: {
        loaders: [
          { test: /\.js(x?)$/, loader: 'babel-loader', exclude: /node_modules/ },
          {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
          },
        ]
    },
    context: __dirname + "/src",
    entry: './index.jsx',
    output: {
        path: 'dist/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('shared.js'),
        new HtmlWebpackPlugin({
            title: 'React Flexible Columns',
            filename: 'index.html',
            css: [ 'main.css' ],
            inject: 'body',
            template: __dirname + '/src/index.html'
        }),
        new ExtractTextPlugin("[name].css"),
    ]
};

module.exports = webpackConfig;
