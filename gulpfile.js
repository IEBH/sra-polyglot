var annotate = require('gulp-ng-annotate');
var babel = require('gulp-babel');
var gulp = require('gulp');
var inject = require('gulp-inject-string');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var uglify = require('gulp-uglify');

gulp.task('default', ['build']);
gulp.task('build', ['js']);

gulp.task('js', function() {
	gulp.src('./index.js')
		.pipe(rename('ngPolyglot.js'))
		.pipe(inject.wrap('angular.module(\'ngPolyglot\', []).service(\'Polyglot\', function() {\n', '});'))
		.pipe(replace(/^.*require\(.*\);\s+$/gm, ''))
		.pipe(replace(/^var polyglot = .+$/m, 'var polyglot;\nreturn polyglot = {'))
		.pipe(babel({presets: ['es2015']}))
		.pipe(annotate())
		.pipe(gulp.dest('./dist'))
		.pipe(uglify())
		.pipe(rename('ngPolyglot.min.js'))
		.pipe(gulp.dest('./dist'))
});
