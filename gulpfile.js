var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var plumber = require('gulp-plumber');
var autoPrefixer = require('gulp-autoprefixer');
//if node version is lower than v.0.1.2
require('es6-promise').polyfill();
var cssComb = require('gulp-csscomb');
var cmq = require('gulp-merge-media-queries');
var imageMin = require('gulp-imagemin');
var cache = require('gulp-cache');
gulp.task('css',function(){
    gulp.src(['css/src/**/*.css', '!css/src/**/normalize.css'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(autoPrefixer())
        .pipe(cssComb())
        .pipe(cmq({log:true}))
        .pipe(gulp.dest('css/dist'))
        .pipe(reload())
});
gulp.task('js',function(){
    gulp.src(['js/src/**/*.js'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(reload())
});
gulp.task('html',function(){
    gulp.src(['html/**/*.html'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(gulp.dest('./html'))
        .pipe(reload())
});
gulp.task('image',function(){
    gulp.src(['img/src/**/*'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(imageMin())
        .pipe(gulp.dest('img/dist'))
        .pipe(reload())
});
gulp.task('default',function(){
    browserSync.init({
        server: "./"
    });
    gulp.watch('js/src/**/*.js',['js']);
    gulp.watch('css/src/**/*.css',['css']);
    gulp.watch('html/**/*.html',['html']);
    gulp.watch('img/src/**/*',['image']);
});
