const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');


var supported = [
    'last 2 versions',
    'safari >= 8',
    'ie >= 10',
    'ff >= 20',
    'ios 6',
    'android 4'
];
gulp.task('sass', function () {
    return gulp.src('assets/css/scss/*.scss')
        .pipe(sass({
            // outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({browsers: supported, add: true}))
        .pipe(gulp.dest('assets/css'));
});

gulp.task('watch', function () {
    gulp.watch('assets/css/scss/*.scss', ['sass']);
});
