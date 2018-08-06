const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const extractCSS = new ExtractTextPlugin({
	filename: '[name].css'
});
const extractLESS = new ExtractTextPlugin({
	filename: '[name].bundle-less.css'
});
const babelOptions = {
	presets: ['es2015'],
	plugins: ["angularjs-annotate", "transform-remove-strict-mode"]
};

module.exports = function (env) {
	console.log('env: ', env);
	return {
		context: path.resolve(__dirname, ".."),
		stats: {
			cached: true,
			warnings: false,
			timings: true,
			performance: true,
			maxModules: 55,
		},
		entry: {
			"app": ['./src/app/app.module.js']
		},
		output: {
			path: path.resolve(__dirname, '../dist'),
			filename: '[name].js'
		},
		resolve: {
			alias: {
				jquery: "jquery/src/jquery"
			},
			extensions: ['.js', '.css', '.less', '.html'],
		},
		module: {
			rules: [{
				enforce: 'pre',
				test: /\.js$/,
				exclude: '/node_modules/',
				loader: "source-map-loader"
			},
			{
				test: /\.html$/,
				use: [{
					loader: 'raw-loader'
				}],
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				loaders: [
					'file-loader?hash=sha512&digest=hex&name=[hash].[ext]'
				]
			},
			{
				test: /\.(eot|woff|woff2|ttf)$/,
				loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
			},
			{
				test: /\.css$/i,
				exclude: '/node_modules/',
				loader: extractCSS.extract({
					fallback: [{
						loader: 'style-loader',
					}],
					use: [{
						loader: "css-loader"
					}]
				})
			},
			{
				test: /\.less$/i,
				exclude: '/node_modules/',
				loader: extractLESS.extract({
					fallback: [{
						loader: 'style-loader',
					}],
					use: [{
						loader: "css-loader"
					},
					{
						loader: "less-loader"
					}
					]
				})
			},
			{
				test: /\.js$/,
				exclude: [
					/node_modules/
				],
				use: [{
					loader: 'babel-loader?cacheDirectory',
					options: babelOptions
				}]
			}
			]
		},
		plugins: [
			new CleanWebpackPlugin(['dist', 'build'], {
				root: path.resolve(__dirname, '..'),
				verbose: true,
				dry: false
			}),
			new HtmlWebpackPlugin({
				hash: false,
				inject: false,
				filename: 'index.html',
				template: './src/bundle.template.ejs'
			}),
			extractCSS,
			extractLESS
		]
	};
};
