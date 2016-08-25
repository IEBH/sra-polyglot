var babel = require('gulp-babel');
var gulp = require('gulp');
var inject = require('gulp-inject-string');
var rename = require('gulp-rename');
var replace = require('gulp-replace');

gulp.task('default', ['build']);

gulp.task('build', function () {
	gulp.src('./index.js')
		.pipe(rename('ngPolyglot.js'))
		.pipe(inject.wrap('angular.module(\'ngPolyglot\', []).service(\'Polyglot\', function() {\n', '});'))
		.pipe(replace(/^.*require\(.*\);\s+$/gm, ''))
		.pipe(replace(/^var polyglot = .+$/m, 'var polyglot;\nreturn polyglot = {'))
		.pipe(babel({presets: ['es2015']}))
		.pipe(gulp.dest('./dist'));
});
