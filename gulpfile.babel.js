// modules
import assemble from 'fabricator-assemble';
import autoprefixer from 'gulp-autoprefixer';
import browserSync from 'browser-sync';
import csso from 'gulp-csso';
import data from './tasks/data';
import del from 'del';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import gutil from 'gulp-util';
import imagemin from 'gulp-imagemin';
import jshint from 'gulp-jshint';
import path from 'path';
import prerender from './tasks/prerender';
import runSequence from 'run-sequence';
import sass from 'gulp-sass';
import stylish from 'jshint-stylish';
import webpack from 'webpack';


// configuration
const config = {
	data: {
		articles: 'src/data/article/*.md',
		dest: 'dist/data'
	},
	prerender: {
		src: './src/app/util/prerender.js',
		dest: 'dist',
		watch: 'src/app/**/*'
	},
	scripts: {
		src: './src/app/index.js',
		dest: 'dist/assets/scripts',
		watch: 'src/app/**/*'
	},
	styles: {
		src: 'src/assets/styles/main.scss',
		dest: 'dist/assets/styles',
		watch: 'src/assets/styles/**/*',
		browsers: ['last 1 version']
	},
	images: {
		src: 'src/assets/images/**/*',
		dest: 'dist/assets/images',
		watch: 'src/assets/images/**/*'
	},
	dev: gutil.env.dev
};


// clean
gulp.task('clean', (done) => {
	del(['dist'], done);
});


// static page generation
gulp.task('prerender', (done) => {
	/**
	 * Pre-render views
	 * Accepts an object as option hash.
	 */
	prerender({
		/**
		 * Top-level data for pre-rendering.
		 * @type {Object}
		 */
		data: {
			/**
			 * Article meta data.
			 * Writes .json to disk; returns meta object.
			 * Used to interpolate routes.
			 * @type {Object}
			 */
			article: data(config.data.articles, config.data.dest + '/article', config.data.dest)
		}
	});
	done();
});


// scripts
// webpack setup
const webpackConfig = require('./webpack.config')(config);
const webpackCompiler = webpack(webpackConfig);

gulp.task('scripts', (done) => {
	webpackCompiler.run(function (error, result) {
		if (error) {
			gutil.log(gutil.colors.red(error));
		}
		result = result.toJson();
		if (result.errors.length) {
			result.errors.forEach(function (error) {
				gutil.log(gutil.colors.red(error));
			});
		}
		done();
	});
});


// styles
gulp.task('styles', () => {
	return gulp.src(config.styles.src)
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: config.styles.browsers
		}))
		.pipe(gulpif(!config.dev, csso()))
		.pipe(gulp.dest(config.styles.dest))
		.pipe(gulpif(config.dev, browserSync.reload({ stream: true })));
});


// images
gulp.task('images', () => {
	return gulp.src(config.images.src)
		.pipe(imagemin({
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest(config.images.dest));
});


// server
gulp.task('serve', () => {

	let reload = browserSync.reload;

	browserSync({
		server: {
			baseDir: config.prerender.dest
		},
		notify: false,
		logPrefix: 'BrowserSync'
	});


	/**
	 * Because webpackCompiler.watch() isn't being used
	 * manually remove the changed file path from the cache
	 */
	function webpackCache (e) {
		let keys = Object.keys(webpackConfig.cache);
		let key, matchedKey;
		for (let i = 0; i < keys.length; i++) {
			key = keys[i];
			if (key.indexOf(e.path) !== -1) {
				matchedKey = key;
				break;
			}
		}
		if (matchedKey) {
			delete webpackConfig.cache[matchedKey];
		}
	}

	gulp.task('prerender:watch', ['prerender'], reload);
	gulp.watch(config.prerender.watch, ['prerender:watch']);

	gulp.task('styles:watch', ['styles']);
	gulp.watch(config.styles.watch, ['styles:watch']);

	gulp.task('scripts:watch', ['scripts'], reload);
	gulp.watch(config.scripts.watch, ['scripts:watch']).on('change', webpackCache);

	gulp.task('images:watch', ['images'], reload);
	gulp.watch(config.images.watch, ['images:watch']);

});


// default build task
gulp.task('default', ['clean'], () => {

	// define build tasks
	let tasks = [
		'prerender',
		'scripts',
		'styles',
		// 'images'
	];

	// run build
	runSequence(tasks, () => {
		if (config.dev) {
			gulp.start('serve');
		}
	});

});
