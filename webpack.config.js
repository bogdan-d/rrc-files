const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const isDirectory = source => fs.lstatSync(source).isDirectory()
const getDirectories = source =>
	fs.readdirSync(source).map(name => path.join(source, name)).filter(isDirectory)
const webpackEntries = {};
const webpackPlugins = [];
const paths = {
	DIST: path.resolve(__dirname, 'dist'),
	SRC: path.resolve(__dirname, 'src'),
	JS: path.resolve(__dirname, 'src/js'),
};

// Read configuration files from all example directories
getDirectories('./src').forEach(v => {
	const folder = path.basename(v);
	if (/^c\d/.test(folder)) {
		const [ n, c_no, c_ls ] = folder.match(/c(\d)_(\d+)/);
		const conf = require(`./${v}/config.js`);
		webpackEntries[folder] = path.join(paths.SRC, `${folder}/app/js/app.js`);
		webpackPlugins.push(
			new HtmlWebpackPlugin({
				hash: true,
				title: `Course ${c_no} - Lesson ${c_ls}${conf.title ? ` (${conf.title})` : ''}`,
				template: path.join(paths.SRC, `${folder}/index.html`),
				filename: path.join(paths.DIST, `${folder}/index.html`),
				chunks: [ folder ],
				css: [ 'app.css' ],
			})
		);
	}
});

module.exports = {
	target: 'web',
	entry: {
		main: path.join(paths.JS, 'app.js'),
		...webpackEntries
	},
	output: {
		path: paths.DIST,
		filename: '[name]/app/js/app.js'
	},
	devServer: {
		hot: true,
		open: true,
	},
	plugins: [
		new CleanWebpackPlugin(paths.DIST),
		new ExtractTextPlugin('style.bundle.css'),
		new HtmlWebpackPlugin({
			hash: true,
			template: path.join(paths.SRC, 'index.html'),
			filename: path.join(paths.DIST, 'index.html'),
			chunks: [ 'main' ],
		}),
		...webpackPlugins
	],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'env',
							'react',
						],
						plugins: [
							'syntax-class-properties',
              'syntax-decorators',
              'syntax-object-rest-spread',
              'transform-class-properties',
              'transform-object-rest-spread'
						]
					}
				}
			},
			{
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          use: 'css-loader',
        }),
			},
			{
        test: /\.(png|jpg|gif)$/,
        use: [
          'file-loader',
        ],
			},
			{
				test: /\.html/,
				use: 'underscore-template-loader'
			},
		]
	},
	resolve: {
    extensions: ['.js', '.jsx'],
  },
};