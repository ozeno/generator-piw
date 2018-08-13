const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const extractCSS = new MiniCssExtractPlugin({
	filename: '[name].css'
});
const extractLESS = new MiniCssExtractPlugin({
	filename: '[name].bundle-less.css'
});
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
			"app": ['./src/app/app.module.<%= ext %>']
		},
		output: {
			path: path.resolve(__dirname, '../dist'),
			filename: '[name].js'
		},
		resolve: {
			alias: {
				jquery: "jquery/src/jquery"
			},
			extensions: ['.ts', '.tsx', '.js', '.css', '.less', '.html']
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
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../'
						}
					},
					"css-loader"
				]
			},
			{
				test: /\.less$/i,
				exclude: '/node_modules/',
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../'
						}
					},
					"css-loader",
					"less-loader"
				]
			},
			{
				test: /\.js$/,
				exclude: [
					/node_modules/
				],
				use: [{
					loader: 'babel-loader?cacheDirectory'
				}]
			},
			<%if (ext === 'ts') { %>
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'ng-annotate-loader',
						options: {
							ngAnnotate: 'ng-annotate-patched'
						},
					},
					'ts-loader'
				]
			}
			<% } %>
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
