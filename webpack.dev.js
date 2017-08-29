const path				= require('path')
const webpack			= require('webpack')
const webpackMerge		= require('webpack-merge')
const commonConfig		= require('./webpack.base.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const HOST = 'localhost'
const PORT = '8081'

const GLOBALS = {
	'process.env': {
		'NODE_ENV': JSON.stringify('development')
	},
	__DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'true'))
}

module.exports = function(env) {
	return webpackMerge(commonConfig(), {
		entry: {
			app: [ 'react-hot-loader/patch', './appldr' ],
		},
		output: {
			path: path.join(__dirname, 'release'),
			filename: '[name].js',
			sourceMapFilename: '[name].map'
		},
		module: {
			rules: [
				{
					test: /\.jsx$/,
					exclude: /(node_modules|bower_components)/,
					loader: 'babel-loader',
					query: {
						cacheDirectory: true
					}
				}
			]
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NamedModulesPlugin(),
			new webpack.DefinePlugin(GLOBALS),
			new HtmlWebpackPlugin({
				template: 'template.html',
				inject: false,
				chunksSortMode: 'dependency'
			})
		],
		cache: true,
		devtool: 'cheap-module-eval-source-map',
		devServer: {
			hot: true,
			inline: true,
			historyApiFallback: true,
			port: PORT,
			host: HOST,
			headers: {
				'Access-Control-Allow-Origin': '*'
			}
		}
	})
}
