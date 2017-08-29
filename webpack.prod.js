const path				= require('path')
const webpack			 = require('webpack')
const webpackMerge		= require('webpack-merge')
const commonConfig		= require('./webpack.base.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const GLOBALS = {
	'process.env': {
		'NODE_ENV': JSON.stringify('production')
	},
	__DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'true'))
}

module.exports = function(env) {
	return webpackMerge(commonConfig(), {
		entry: {
			app: [ './appldr' ],
		},
		output: {
			path: path.join(__dirname, 'release'),
			filename: '[name].js'
		},
		module: {
			rules: [
				{
					test: /\.jsx?$/,
					exclude: /(node_modules|bower_components)/,
					loader: 'babel-loader',
					query: {
						cacheDirectory: true
					}
				}
			]
		},
		cache: true,
		plugins: [
			new webpack.DefinePlugin(GLOBALS),
			new HtmlWebpackPlugin({
				template: 'template.html',
				inject: false,
				chunksSortMode: 'dependency'
			}),
			new webpack.NoEmitOnErrorsPlugin(),
			new webpack.LoaderOptionsPlugin({
				minimize: true,
				debug: false
			}),
			new webpack.optimize.UglifyJsPlugin({
				beautify: false,
				mangle: {
					screw_ie8: true,
					keep_fnames: true
				},
				compress: {
					screw_ie8: true
				},
				comments: false
			})
		]
	})
}
