var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concatCss = require('gulp-concat-css');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('sass', function () {
    gulp.src('./app/scss/main.scss')
        .pipe(autoprefixer()) // автопрефикс
        .pipe(sass(
            {
                // includePaths: require('node-normalize-scss').with('other/path', 'another/path')
                // - or -
                includePaths: require('node-normalize-scss').includePaths,
                outputStyle: 'compressed' // тип выхода
        }))
        .pipe(gulp.dest('./dist/css/'));
});
gulp.task('libs', function() {
    return gulp.src([
        'app/js/jquery.min.js',
        'app/js/libs/*.js',
        'app/js/common.js'
    ])
        .pipe(concat('scripts.min.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('dist/js')); // Выгружаем в папку app/js
});