const a = {
	foo: 'bar'
}

const b = { ...a, foo: 'boo' };

console.log(b);

const { lstatSync, readdirSync } = require('fs')
const { join, basename } = require('path')

const isDirectory = source => lstatSync(source).isDirectory()
const getDirectories = source =>
	readdirSync(source).map(name => join(source, name)).filter(isDirectory)

console.log('folders', getDirectories('./src').map(v => basename(v)));

module.exports = {
	entry: {
		name: 'c1_1'
	}
}