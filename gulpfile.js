var babel = require('gulp-babel');
var ghPages = require('gulp-gh-pages');
var gulp = require('gulp');
var gutil = require('gulp-util');
var inject = require('gulp-inject-string');
var nodemon = require('gulp-nodemon');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var rimraf = require('rimraf');
var replace = require('gulp-replace');
var rollup = require('rollup');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');

var production = process.env.NODE_ENV == 'production';

gulp.task('js:lib', function(done) {
	gulp.src('./index.js')
		.pipe(plumber({
			errorHandler: function(err) {
				gutil.log(gutil.colors.red('ERROR DURING JS BUILD'));
				process.stdout.write(err.stack);
				this.emit('end');
			},
		}))
		.pipe(rename('polyglot.js'))
		.pipe(babel({
			presets: ['@babel/env'],
		}))
		.pipe(gulp.dest('./dist'))
		// .pipe(uglify())
		.pipe(rename('polyglot.min.js'))
		.pipe(gulp.dest('./dist'))
		done();
});

gulp.task('js:demo', gulp.series('js:lib', (done) =>
	rollup.rollup({
		input: './demo/app.js',
		experimentalCodeSplitting: false,
		plugins: [
			require('rollup-plugin-replace')({
				'process.env.NODE_ENV': production ? '"production"' : '"dev"',
				// Monkey patch to replace Ace's weird package loader with the standard one
				'var brace = window.ace.acequire("ace/ace")': 'var brace\n;$(()=> brace = window.ace.require("ace/ace"));',
			}),
			require('rollup-plugin-alias')({
				vue: 'node_modules/vue/dist/vue.esm.js',
			}),
			require('rollup-plugin-commonjs')({ // Allow reading CommonJS formatted files (this has to exist high in the load order)
				include: ['node_modules/**/*', 'demo/**/*', 'dist/**/*'],
				namedExports: {
					'dist/polyglot.js': ['polyglot'],
				},
			}),
			require('rollup-plugin-vue')(),
			require('rollup-plugin-includepaths')({
				paths: ['dist', 'demo'],
			}),
			require('rollup-plugin-node-resolve')({ // Allow Node style module resolution
				jsnext: true,
				browser: true, // Use the `browser` path in package.json when possible
			}),
			require('rollup-plugin-node-globals')({ // Inject global Node module shivs
				baseDir: false,
				buffer: false,
				dirname: false,
				filename: false,
				global: false,
				process: true,
			}),
			require('rollup-plugin-inject')({
				include: '**/*.js',
				exclude: 'node_modules/**',
				jQuery: 'jquery',
				$: 'jquery',
			}),
			require('rollup-plugin-babel')({
				presets: ['@babel/env'],
				plugins: ['@babel/plugin-syntax-dynamic-import'],
				exclude: 'node_modules/**',
			}),
			production && require('rollup-plugin-uglify').uglify(),
			require('rollup-plugin-sizes')(),
			/*require('/home/mc/Papers/Projects/Node/rollup-plugin-fdnotify')({
				baseDir: __dirname,
			}),*/
		],
	})
	.then(bundle => bundle.write({
		format: 'cjs',
		file: './dist/demoApp.js',
		name: 'demoApp',
		sourcemap: true,
	}),
	done()
	)
));

gulp.task('css:demo', ()=>
	gulp.src('./demo/app.css')
		.pipe(rename('demoApp.css'))
		.pipe(gulp.dest('./dist'))
)

gulp.task('build', gulp.parallel('css:demo', 'js:demo'));

gulp.task('serve', gulp.series('build', function(done) {
	var monitor = nodemon({
		script: './demo/server.js',
		ext: 'js css',
		ignore: ['**/.css', '**/*.js', '**/*.vue'],
	})
		.on('start', function() {
			console.log('Server started');
		})
		.on('restart', function() {
			console.log('Server restarted');
		});

	watch(['./index.js', 'demo/**/*.js', 'demo/**/*.vue', 'src/**/*.js', 'src/**/*.vue'], function() {
		console.log('Rebuild client-side JS files...');
		gulp.start('js:demo');
	});
	done()
}));

gulp.task('default', gulp.series('serve'));

gulp.task('gh-pages', gulp.series('build', function() {
	rimraf.sync('./gh-pages');

	return gulp.src([
		'./LICENSE',
		'./demo/_config.yml',
		'./demo/app.css',
		'./demo/app.js',
		'./demo/index.html',
		'./dist/**/*',
		'./syntax/ace/mode-polyglot.js',
		'./node_modules/vue/dist/vue.js',
		'./node_modules/bootstrap/dist/css/bootstrap.css',
		'./node_modules/bootstrap/dist/js/bootstrap.js',
		'./node_modules/lodash/lodash.js',
		'./node_modules/jquery/dist/jquery.js',
		'./node_modules/font-awesome/**/*',
		'./node_modules/popper.js/dist/umd/popper.js',
	], {base: __dirname})
		.pipe(rename(function(path) {
			if (path.dirname == 'demo') { // Move all demo files into root
				path.dirname = '.';
			}
			return path;
		}))
		.pipe(ghPages({
			cacheDir: 'gh-pages',
			push: true, // Change to false for dryrun (files dumped to cacheDir)
		}))
}));
