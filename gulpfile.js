var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concatCss = require('gulp-concat-css');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();

gulp.task('sass', function () {
    gulp.src('./app/scss/main.scss')
        .pipe(autoprefixer()) // автопрефикс
        .pipe(sass(
            {
                includePaths: require('node-normalize-scss').includePaths,
                outputStyle: 'compressed' // тип выхода
        }))
        .pipe(gulp.dest('./dist/css/'))
});
gulp.task('html', function () {
    gulp.src('./app/*.html').pipe(gulp.dest('./dist/'));
});
gulp.task('libs', function() {
    return gulp.src([
        'app/js/jquery.min.js',
        'app/js/libs/*.js',
        'app/js/common.js'
    ])
        .pipe(concat('scripts.min.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('./dist/js')) // Выгружаем в папку app/js
});
gulp.task('compress', function() {
    gulp.src('./app/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img/'))
});
gulp.task('watcher', function() {
    gulp.watch("./app/scss/*.scss", ['sass']);
    gulp.watch("./app/js/*.js", ['libs']);
    gulp.watch("./app/img/*", ['compress']);
    gulp.watch("./app/*.html", ['html']);
});
gulp.task('browser', function () {
    var files = [
        './**/*'
    ];
    browserSync.init( files,
        {
            injectChanges: true,
            server: "./dist",
            open: false,
            notify: false,
            port: 8080,
            watchOptions : {
                ignored : 'node_modules/*',
                ignoreInitial : true
            }
    });
})
gulp.task('server', ['browser','watcher'])