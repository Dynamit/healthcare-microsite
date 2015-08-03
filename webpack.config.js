import path from 'path';
import webpack from 'webpack';

export default function (config) {

	let plugins = [
		new webpack.DefinePlugin({
			'process.API_URL': '/api/'
		})
	];

	if (!config.dev) {
		plugins.push(
			new webpack.optimize.UglifyJsPlugin()
		);
	}

	return {
		entry: config.scripts.src,
		output: {
			path: path.resolve(__dirname, config.scripts.dest),
			filename: '[name].js'
		},
		module: {
			loaders: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loaders: ['babel-loader']
				}
			]
		},
		plugins: plugins,
		resolve: {
			extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
		},
		cache: {}
	};

};
