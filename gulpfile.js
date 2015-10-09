var gulp = require('gulp');
var karma = require('karma').server;
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var path = require('path');
var plumber = require('gulp-plumber');
var runSequence = require('run-sequence');
var jshint = require('gulp-jshint');

/**
 * File patterns
 **/

// Root directory
var rootDirectory = path.resolve('./');

// Source directory for build process
var sourceDirectory = path.join(rootDirectory, './src');

var sourceFiles = [
    'vgSrc.ie.js',
    'vgSrc.js',
    'vgSrc.config.js',
    'vgSrc.directive.js'
];

var lintFiles = [
    'gulpfile.js',
    // Karma configuration
    'karma-*.conf.js'
].concat(sourceFiles);

gulp.task('build', function() {
    var srcFiles = ['_start.js'].concat(sourceFiles);
    srcFiles.push('_end.js');

    for (var i = 0; i < srcFiles.length; i++) {
        srcFiles[i] = path.join(sourceDirectory, srcFiles[i]);
    }
    gulp.src(srcFiles)
        .pipe(plumber())
        .pipe(concat('vg-src.js'))
        .pipe(gulp.dest('./dist/'))
        .pipe(uglify())
        .pipe(rename('vg-src.min.js'))
        .pipe(gulp.dest('./dist'));
});

/**
 * Process
 */
gulp.task('process-all', function(done) {
    runSequence('jshint', 'test-src', 'build', done);
});

/**
 * Watch task
 */
gulp.task('watch', function() {

    // Watch JavaScript files
    gulp.watch(sourceFiles, ['process-all']);
});

/**
 * Validate source JavaScript
 */
gulp.task('jshint', function() {
    return gulp.src(lintFiles)
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

/**
 * Run test once and exit
 */
gulp.task('test-src', function(done) {
    karma.start({
        configFile: __dirname + '/karma-src.conf.js',
        singleRun: true
    }, done);
});

/**
 * Run test once and exit
 */
gulp.task('test-dist-concatenated', function(done) {
    karma.start({
        configFile: __dirname + '/karma-dist-concatenated.conf.js',
        singleRun: true
    }, done);
});

/**
 * Run test once and exit
 */
gulp.task('test-dist-minified', function(done) {
    karma.start({
        configFile: __dirname + '/karma-dist-minified.conf.js',
        singleRun: true
    }, done);
});

gulp.task('default', function() {
    runSequence('process-all', 'watch');
});
