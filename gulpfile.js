var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concatCss = require('gulp-concat-css');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () { // sass компилятор
    return gulp.src('./app/scss/*.scss')
        .pipe(sourcemaps.init()) // подключены сорсмеп
        .pipe(autoprefixer()) // автопрефикс
        .pipe(sass(
            autoprefixer(),
            {
            outputStyle: 'expanded' // тип выхода
        }).on('error', sass.logError))
        .pipe(sourcemaps.write('./')) //подключены сорсмеп
        .pipe(gulp.dest('./app/css/all'))
});
gulp.task('ReCSS', function () {
    return gulp.src('./app/css/all/*.css') // бандлим css
        .pipe(concatCss('style.css'))
        .pipe(gulp.dest('./app/css/'));
});
gulp.task('ReMAP', function () {
    gulp.src('./app/css/all/*.map') // Перемещаем .map
        .pipe(gulp.dest('./app/css'))
});
gulp.task('watch', function () {
    gulp.watch('./app/scss/*.scss', ['sass', 'ReCSS']);
})