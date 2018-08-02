const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/app/app.module.js',
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: path.join(__dirname, "node_modules"),
                loader: 'babel-loader',
            },
            { test: /\.html$/, loader: "html-loader" },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            {
                test: /\.less$/,
                loader: [
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader',
            }
        ]
    },
    devtool: "source-map",
    plugins: [
        new webpack.optimize.UglifyJsPlugin({ minimize: true, sourceMap: true })
    ]
}