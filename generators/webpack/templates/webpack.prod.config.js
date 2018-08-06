const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.base.config.js');

module.exports = function () {
	return webpackMerge(commonConfig(), {	
		devtool: 'source-map',
		devServer: {
			contentBase: path.resolve(__dirname, './'),
			compress: true
		},
		plugins: [			
            new webpack.LoaderOptionsPlugin({
            	minimize: true,
            	debug: false
            }),
            new webpack.DefinePlugin({
            	'process.env': {
            		'NODE_ENV': JSON.stringify('production')
            	}
            })
		]
	});
};