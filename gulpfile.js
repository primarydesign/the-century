var gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),
	browserSync = require('browser-sync').create(),
	argv = require('yargs').argv;

var p = !!(argv.production), o = !!(argv.open),
	build = './builds/' + (p ? 'production/' : 'development/');

//compile SASS with Compass
gulp.task('compass', function(){
	return gulp.src('./assets/sass/**/*.scss')
		.pipe($.compass({
			css: './assets/css',
			sass: './assets/sass',
			style: (p ? 'compressed' : 'expanded')}))
		.on('error', function(error){
			console.log(error);})
		.pipe(gulp.dest('./assets/css'))
		.pipe(browserSync.stream());
});

//initialize development server
//use --open to open browser
gulp.task('browse', function(){
	browserSync.init({
		server: build,
		open: (o ? 'external' : false)
	});
});

//process stylesheets
gulp.task('style', ['compass'], function(){
	return gulp.src('./assets/css/**/*.css')
		.pipe($.autoprefixer({
			browsers: ['last 5 versions']}))
		.pipe($.minifyCss())
		.pipe(gulp.dest(build + 'assets/css'))
		.pipe(browserSync.stream());
})

//process Javascript files
gulp.task('script', function(){
	return gulp.src('./assets/js/**/*.js')
		.pipe($.uglify())
		.pipe(gulp.dest(build + 'assets/js'))
		.pipe(browserSync.stream());
});

//watch and livereload file changes
gulp.task('watch', function(){
	gulp.watch('./assets/**/*.{scss,css}', ['style']);
	gulp.watch('./assets/**/*.js', ['script']);
	gulp.watch('./**/*.html').on('change', browserSync.reload);
});

//minify HTML 
gulp.task('html', function(){
	return gulp.src('./*.html')
		.pipe($.htmlmin())
		.pipe(gulp.dest(build));
	return gulp.src('./pages')
		.pipe($.htmlmin())
		.pipe(gulp.dest(build + 'pages'));
});
