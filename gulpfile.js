var gulp = require('gulp'),
	 concat = require('gulp-concat'),
	 uglify = require('gulp-uglify'),
	 minify = require('gulp-minify-css'),
	 autoprefixer = require('gulp-autoprefixer'),
	 sass = require('gulp-ruby-sass'),
	 rename = require('gulp-rename'),
	 browserSync = require('browser-sync');

gulp.task('default',['style','script','browse'], function(){
	gulp.watch('./assets/**/*.scss', ['style'])
	gulp.watch('./assets/**/*.js', ['script'])
	gulp.watch('./**/*.html')
		.on('change', browserSync.reload);
});

//compile and optimize
gulp.task('style', ['sass'], function(){
	return gulp.src('./assets/css/*.css')
		.pipe(autoprefixer({
			browsers: ['last 5 versions'],
			cascade: false
		}))
		.pipe(minify())
		.pipe(rename('index.min.css'))
		.pipe(gulp.dest('./assets/css'))
		.pipe(browserSync.stream());
});

//compile and optimize Javascript
gulp.task('script', function(){
	return gulp.src('./assets/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('./assets/js/'))
		.pipe(browserSync.stream());
});

/********** SUBSIDIARY TASKS **********/

//compile SASS to CSS
gulp.task('sass', function() {
	return sass('./assets/sass/')
		.on('error', function(err){
			console.log('Error!', err.message);
		})
		.pipe(gulp.dest('./assets/css/'))
		.pipe(browserSync.stream());
});
//initialize local server
gulp.task('browse', function () {
	browserSync.init({
		server: { baseDir: "./"},
		browser: 'Google Chrome'
	});
});
