// modules
import assemble from 'fabricator-assemble';
import autoprefixer from 'gulp-autoprefixer';
import browserSync from 'browser-sync';
import csso from 'gulp-csso';
import del from 'del';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import gutil from 'gulp-util';
import imagemin from 'gulp-imagemin';
import jshint from 'gulp-jshint';
import path from 'path';
import runSequence from 'run-sequence';
import sass from 'gulp-sass';
import stylish from 'jshint-stylish';
import webpack from 'webpack';


// configuration
const config = {
	templates: {
		src: ['src/templates/**/*', '!src/templates/+(layouts|components)/**'],
		dest: 'dist',
		watch: ['src/templates/**/*', 'src/data/**/*.json'],
		layouts: 'src/templates/layouts/*',
		partials: ['src/templates/components/**/*'],
		data: 'src/data/**/*.{json,yml}'
	},
	scripts: {
		src: './src/assets/scripts/main.js',
		dest: 'dist/assets/scripts',
		watch: 'src/assets/scripts/**/*'
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
gulp.task('clean', (cb) => {
	del(['dist'], cb);
});


// templates
gulp.task('templates', (done) => {
	assemble({
		layouts: config.templates.layouts,
		views: config.templates.src,
		materials: config.templates.partials,
		data: config.templates.data,
		keys: {
			views: 'templates',
			materials: 'components'
		},
		dest: config.templates.dest,
		logErrors: config.dev,
		helpers: {}
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

gulp.task('jshint', (done) => {
	return gulp.src(config.scripts.watch)
		.pipe(jshint())
		.pipe(jshint.reporter(stylish))
		.pipe(jshint.reporter('fail'))
		.on('error', done);
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
			baseDir: config.templates.dest
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
	
	gulp.task('assemble:watch', ['assemble'], reload);
	gulp.watch(config.templates.watch, ['assemble:watch']);

	gulp.task('styles:watch', ['styles']);
	gulp.watch(config.styles.watch, ['styles:watch']);

	gulp.task('scripts:watch', ['scripts'], reload);
	gulp.watch(config.scripts.watch, ['scripts:watch']).on('change', webpackCache);

	gulp.task('images:watch', ['images'], reload);
	gulp.watch(config.images.watch, ['images:watch']);

});



// default build task
gulp.task('default', ['clean', 'jshint'], () => {

	// define build tasks
	let tasks = [
		'templates',
		'scripts',
		'styles',
		'images'
	];

	// run build
	runSequence(tasks, () => {
		if (config.dev) {
			gulp.start('serve');
		}
	});

});
