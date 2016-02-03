var gulp = require('gulp');
var autopre = require('gulp-autoprefixer');

gulp.task('autopre', function() {
    return gulp.src(['css/*.css', '!css/normalize.css'])
        .pipe(autopre({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', function() {
    gulp.watch('css/*.css', ['autopre']);
});
