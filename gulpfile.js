var gulp = require('gulp');
var jade = require('gulp-jade');
var less = require('gulp-less');
var mincss = require('gulp-clean-css');
var prefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');
var ghPages = require('gulp-gh-pages');

gulp.task('jade', function() {
    return gulp.src('templates/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('dist'));
})

gulp.task('less', function() {
    gulp.src(['templates/src/index.less'])
        .pipe(less())
        .pipe(mincss())
        .pipe(prefixer('last 3 versions'))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(connect.reload())
})

gulp.task('watch', function() {
    gulp.watch('./templates/src/index.less',['less'])
    gulp.watch('./templates/index.jade',['jade'])
    gulp.watch('./templates/resumeEN.jade',['jade'])
})

gulp.task('server',function(){
  connect.server({
    name:'resume',
    root:'./dist',
    livereload:'8080'
  })
})

gulp.task('build', ['less', 'jade']);

gulp.task('default', ['watch', 'build','server']);
