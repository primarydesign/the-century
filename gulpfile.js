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
});

//initialize development server
//use --open to open browser
gulp.task('browse', function(){
	browserSync.init({
		server: build,
		open: (o ? 'external' : false),
		notify: false
	});
});

//process stylesheets
gulp.task('style', ['compass'], function(){
	return gulp.src('./assets/css/**/*.{css,scss}')
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

//watch and livereload changes
gulp.task('develop', ['browse', 'watch']);

//watch HTML/CSS/SCSS/JS files for changes
gulp.task('watch', function(){
	gulp.watch('./assets/css/**/*.css', ['style']);
	gulp.watch('./assets/sass/**/*.scss', ['style']);
	gulp.watch('./assets/js/**/*.js', ['script']);
	gulp.watch('./**/*.html', ['html']);
});

//minify HTML
gulp.task('html', function(){
	return gulp.src('./*.html')
		.pipe($.htmlmin())
		.pipe(gulp.dest(build))
		.pipe(browserSync.stream());
});

//compress JPG/PNG/GIF/SVG images
gulp.task('image', function(){
	return gulp.src('./assets/img/**/*.{jpg,jpeg,png,gif,svg}')
		.pipe($.imagemin({
			progressive: true}))
		.pipe(gulp.dest(build + 'assets/img'))
		.pipe(browserSync.stream());
})

//reconstruct build environment
gulp.task('build', ['style','script','html','image']);
