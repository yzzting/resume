var gulp = require('gulp');
var jade = require('gulp-jade');
var less = require('gulp-less');
var cssmin = require('gulp-minify-css');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var gls = require('gulp-live-server');
var ghPages = require('gulp-gh-pages');
gulp.task('jade', function() {
    return gulp.src('templates/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('dist'));
})

gulp.task('less', function() {
    gulp.src(['templates/src/index.less'])
        .pipe(less())
        .pipe(cssmin())
        .pipe(postcss([autoprefixer({
            browsers: ['last 2 versions']
        })]))
        .pipe(gulp.dest('dist/css'));
})

gulp.task('watch', ['jade', 'less'], function() {
    gulp.watch([
        'templates/*.jade'
    ], ['jade']);
    gulp.watch([
        'templates/src/style/*.less',
        'templates/src/style/aside/*.less',
        'templates/src/style/main/*.less',
        'templates/src/index.less'
    ], ['less']);
})

gulp.task('build', ['jade', 'less']);

gulp.task('deploy', ['build'], function() {
    return gulp.src('./dist/**/*')
        .pipe(ghPages());
});

gulp.task('d', ['deploy']);

var server = gls.static('dist', 8888);
server.start();
