var path				= require('path')

module.exports = function() {
	return {
		context: path.resolve(__dirname, 'src'),
		entry: { app: 'appldr' },
		resolve: {
			extensions: ['.ts', '.js', '.json', '.jsx', '.scss', '.css'],
			modules: [path.join(__dirname, 'src'), 'node_modules']
		},
		module: {
			rules: [
				{
					test: /\.css$/,
					use: [ 'style-loader', 'css-loader' ]
				}, {
					test: /\.scss$/,
					use: [ 'style-loader', 'css-loader', 'sass-loader' ]
				}
			]
		}
	}
}
