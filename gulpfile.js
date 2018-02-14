var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concatCss = require('gulp-concat-css');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');


gulp.task('sass', function () {
    gulp.src('./app/scss/main.scss')
        .pipe(sourcemaps.init()) // подключены сорсмеп
        .pipe(autoprefixer()) // автопрефикс
        .pipe(sass(
            {
                // includePaths: require('node-normalize-scss').with('other/path', 'another/path')
                // - or -
                includePaths: require('node-normalize-scss').includePaths,
                outputStyle: 'expanded' // тип выхода
        }))
        .pipe(sourcemaps.write('./')) //подключены сорсмеп
        .pipe(gulp.dest('./app/css/'));
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
gulp.task('libs', function() {
    return gulp.src([
        'app/js/jquery.min.js',
        'app/js/libs/*.js',
        'app/js/common.js'
    ])
        .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
});