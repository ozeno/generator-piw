const path = require('path');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.base.config.js');

module.exports = function () {
	return webpackMerge(commonConfig(), {		
		watch: true,
		watchOptions: {
			poll: 1000,
			ignored: /node_modules/
		},
		devtool: 'source-map',
		devServer: {
			contentBase: path.resolve(__dirname, '..'),
			compress: true,
			watchContentBase: true,
			watchOptions: {
				poll: true
			}
		},
	});
};