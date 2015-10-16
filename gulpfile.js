'use strict';

var path         = require('path');
var gulp         = require('gulp');
var gutil        = require('gulp-util');
var runSequence  = require('run-sequence');
var gulpif       = require('gulp-if');
var rename       = require('gulp-rename');
var del          = require('del');
var eslint       = require('gulp-eslint');
var browserify   = require('browserify');
var babelify     = require('babelify');
var uglify       = require('gulp-uglify');
var sourcemaps   = require('gulp-sourcemaps');
var source       = require('vinyl-source-stream');
var imagemin     = require('gulp-imagemin');
var cache        = require('gulp-cache');
var buffer       = require('vinyl-buffer');
var sass         = require('gulp-sass');
var minify       = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var htmlreplace  = require('gulp-html-replace');
var browserSync  = require('browser-sync');
var env          = process.env.NODE_ENV || 'development';

var filePaths = {
    src: {
        scripts: {
            entry: './src/js/bootstrap.js',
            all: ['./src/js/**/*.js', './src/js/**/*.jsx'],
            bundled: env === 'development' ? 'app.js' : 'app.min.js'
        },
        styles: {
            entry: 'app.sass',
            all: './src/scss/**/*.scss',
            bundled: env === 'development' ? 'app.css' : 'app.min.css'
        },
        templates: {
            entry: 'index.html'
        },
        images: {
            all: './src/media/**'
        }
    },
    dest: './dist'
};

gulp.task('build:images', function(){
  gulp.src(filePaths.src.scripts.all)
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/media/'));
});

gulp.task('lint:scripts', function() {
    return gulp.src(filePaths.src.scripts.all)
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('build:scripts', function() {
    return browserify(filePaths.src.scripts.entry, {
            paths: ['./node_modules', './src'],
            debug: env === 'development'
        })
        .transform(babelify)
        .bundle()
        .on('error', function(err) {
            gutil.log(gutil.colors.red(err));
            this.emit('end');
        })
        .pipe(source(filePaths.src.scripts.bundled))
        .pipe(buffer())
        .pipe(gulpif(env === 'development', sourcemaps.init({
            loadMaps: true
        })))
        .pipe(gulpif(env === 'production', uglify({
            mangle: false
        })))
        .pipe(gulpif(env === 'development', sourcemaps.write('./')))
        .pipe(gulp.dest(filePaths.dest));
});

gulp.task('reload:scripts', ['build:scripts'], function() {
    browserSync.reload();
});

gulp.task('build:styles', function() {
    return gulp.src(filePaths.src.styles.all)
        .pipe(sass({
            paths: [path.join(__dirname, 'sass', 'includes')]
        }).on('error', function(err) {
            gutil.log(gutil.colors.red(err));
            this.emit('end');
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulpif(env === 'production', minify()))
        .pipe(rename(filePaths.src.styles.bundled))
        .pipe(gulp.dest(filePaths.dest));
});

gulp.task('reload:styles', ['build:styles'], function() {
    browserSync.reload();
});

gulp.task('build:templates', function() {
    return gulp.src(filePaths.src.templates.entry)
        .pipe(htmlreplace({
            css: filePaths.src.styles.bundled,
            js: filePaths.src.scripts.bundled
        }))
        .pipe(gulp.dest(filePaths.dest));
});

gulp.task('reload:templates', ['build:templates'], function() {
    browserSync.reload();
});

gulp.task('clean', function(callback) {
    del(filePaths.dest, null, callback);
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: filePaths.dest
        },
        port: process.env.PORT || 8080
    });
});

gulp.task('watch', function() {
    var callback = function() {
        gulp.watch(filePaths.src.scripts.all, ['reload:scripts']);
        gulp.watch(filePaths.src.styles.all, ['reload:styles']);
        gulp.watch(filePaths.src.templates.entry, ['reload:templates']);

        gutil.log(gutil.colors.green('Watching for changes...'));
    };

    runSequence(
        'clean',
        'lint:scripts',
        ['build:scripts', 'build:styles', 'build:templates', 'build:images'],
        'browser-sync',
        callback
    );
});

gulp.task('build', function() {
    var callback = function() {
        gutil.log(gutil.colors.green('Build complete.'));
    };

    runSequence(
        'clean',
        'lint:scripts',
        ['build:scripts', 'build:styles', 'build:templates', 'build:images'],
        callback
    );
});

gulp.task('default', ['build']);
