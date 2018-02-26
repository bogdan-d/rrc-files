const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const paths = {
	DIST: path.resolve(__dirname, 'dist'),
	SRC: path.resolve(__dirname, 'src'),
	JS: path.resolve(__dirname, 'src/js'),
};

module.exports = {
	target: 'web',
	entry: {
		javascript: path.join(paths.JS, 'app.js'),
		// html: './src/index.html'
	},
	output: {
		path: paths.DIST,
		filename: '[name].js'
	},
	devServer: {
		hot: true,
		open: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
      template: path.join(paths.SRC, 'index.html'),
    }),
	],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: [
          'babel-loader',
        ]
			}
		]
	}
};