/* jshint node: true */
module.exports = function(config) {
	'use strict';

	var babelOptions = require(__dirname + '/babel-options.js');

	config.set({
		browsers: ['PhantomJS'],
		frameworks: ['jasmine'],
		files: [
			'es5-shim.js',
			'vendor/es6-collections/es6-collections.js',
			'vendor/gisele/dist/gisele.js',
			'src/*.js',
			'test/*.js'
		],
		preprocessors: {
			'src/*.js': ['babel'],
			'test/*.js': ['babel']
		},
		babelPreprocessor: {
			options: babelOptions
		}
	});
};
