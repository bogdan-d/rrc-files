const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const isDirectory = source => fs.lstatSync(source).isDirectory()
const getDirectories = source =>
	fs.readdirSync(source).map(name => path.join(source, name)).filter(isDirectory)
const exampleConfigs;

// Read configuration files from all example directories
getDirectories('./src').forEach(v => {
	const folder = path.basename(v);
	if (/^c\d/.test(folder)) {
		const conf = require(path.join(v, 'config.js'));
		exampleConfigs[folder] = conf;
	}
});

const paths = {
	DIST: path.resolve(__dirname, 'dist'),
	SRC: path.resolve(__dirname, 'src'),
	JS: path.resolve(__dirname, 'src/js'),
};

module.exports = {
	target: 'web',
	entry: {
		main: path.join(paths.JS, 'app.js'),
		c1_1: path.join(paths.SRC, 'c1_1/app/js/app.js'),
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
		new HtmlWebpackPlugin({
			hash: true,
			template: path.join(paths.SRC, 'c1_1/index.html'),
			filename: path.join(paths.DIST, 'c1_1/index.html'),
			chunks: [ 'c1_1' ],
		}),
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
							// 'stage-0',
						],
						plugins: [
							"syntax-class-properties",
              "syntax-decorators",
              "syntax-object-rest-spread",
              "transform-class-properties",
              "transform-object-rest-spread"
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
				use: 'html-loader'
			},
		]
	},
	resolve: {
    extensions: ['.js', '.jsx', '.html'],
  },
};