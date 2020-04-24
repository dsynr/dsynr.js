const {series} = require('gulp');
const gulp = require('gulp');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
// const clean = require('gulp-clean');
const pipeline = require('readable-stream').pipeline;

const concatFileName = 'dsynr.util';
const rootPath = 'src/';
const jsPath = rootPath + 'js/';
const tsPath = rootPath + 'ts/';
const sassPath = rootPath + 'sass/';
const releasePath = 'release/';

function getScript(fileName, fType = 'ts') {

    return (fType == 'js' ? jsPath : tsPath) + fileName + '.' + fType;
}

function concatTS() {
    return pipeline(
        gulp.src([
            getScript('analytics'),
            getScript('other'),
            getScript('math'),
            getScript('obj'),
            getScript('graphics'),
            getScript('css'),
            getScript('dom'),
            getScript('animation'),
            getScript('events'),
            getScript('viewport'),
            getScript('modal'),
            getScript('main'),
        ]),
        (concat(concatFileName + '.ts')),
        (gulp.dest(releasePath))
    );
}

function concatJS() {
    return pipeline(
        gulp.src([
            getScript('DsynrUIIElement', 'js'),
            getScript('analytics', 'js'),
            getScript('other', 'js'),
            getScript('string', 'js'),
            getScript('math', 'js'),
            getScript('obj', 'js'),
            getScript('graphics', 'js'),
            getScript('css', 'js'),
            getScript('dom', 'js'),
            getScript('animation', 'js'),
            getScript('events', 'js'),
            getScript('viewport', 'js'),
            getScript('modal', 'js'),
            getScript('modal2', 'js'),
            getScript('main', 'js'),
        ]),
        (concat(concatFileName + '.js')),
        minify({
            ext: {
                min: '.min.js'
            }
        }),
        (gulp.dest(releasePath))
    );
}

function compileDebugFile() {
    return pipeline(
        gulp.src([
            getScript('debug', 'js'),
        ]),
        (concat('dsynr.debug.js')),
        minify({
            ext: {
                min: '.min.js'
            }
        }),
        (gulp.dest(releasePath))
    );
}

function compileCSS() {
    return gulp.src([sassPath + '*.css'])
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(releasePath));

}

/**
 * @todo
 */
function pushToLive() {

}

// exports.default = series(concatJS, compileDebugFile, compileCSS);
exports.default = series(concatJS);
