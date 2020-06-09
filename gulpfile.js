const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const clean = require('gulp-clean');
const minifyjs = require('gulp-js-minify');
const rename = require('gulp-rename');
const pug = require('gulp-pug');
const autoprefixer = require('gulp-autoprefixer');
const minifycss = require('gulp-minify-css');
const copy = require('gulp-copy');

gulp.task('copy', function() {
	return gulp.src('./src/images/*')
		.pipe(gulp.dest('./dist/images'));
});

gulp.task('minify-js', function(){
  gulp.src('./src/js/main.js')
    .pipe(minifyjs())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('clean', function () {
	return gulp.src('dist', {read: false})
		.pipe(clean());
});

gulp.task('browser-sync', function() {
	browserSync({
		server: "./dist",
		notify: false
	});
});

gulp.task('sass', function() {
  return gulp.src('./src/scss/*.scss')
    .pipe(sass())
    .pipe(autoprefixer("last 3 version", "safari 5", "ie 8", "ie 9"))
    .pipe(minifycss())
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('pug', function(){
  return gulp.src('src/views/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('watch', function() {
	gulp.watch('src/views/*.pug', gulp.series('pug'));
	gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
	gulp.watch('src/js/*.js', gulp.series('minify-js'));
});

gulp.task('default', gulp.parallel('watch', 'browser-sync'));

gulp.task('build', gulp.series('copy', 'pug', 'sass', 'minify-js'));


