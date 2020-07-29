const {series} = require('gulp');
const gulp = require('gulp');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
// const clean = require('gulp-clean');
const pipeline = require('readable-stream').pipeline;

const concatFileName = 'dsynr';
const rootPath = 'src/';
const jsPath = rootPath + 'js/';
const tsPath = rootPath + 'ts/';
const sassPath = rootPath + 'sass/';
const releasePath = 'build/';

function getScript(fileName, fType = 'ts') {

    return (fType == 'js' ? jsPath : tsPath) + fileName + '.' + fType;
}

function getCls(fileName) {

    return jsPath + 'classes/' + fileName + '.js';
}

function getInt(fileName) {

    return jsPath + 'interfaces/' + fileName + '.js';
}

function getComp(fileName) {

    return jsPath + 'components/' + fileName + '.js';
}

function concatJS() {
    return pipeline(
        gulp.src([
            getInt('*'),
            getCls('*'),
            getComp('*'),
            getScript('Dsynr', 'js'),
            getScript('DsynrWp', 'js'),
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

function concatWPJS() {
    return pipeline(
        gulp.src([
            getScript('DsynrWp', 'js')
        ]),
        (concat('dsynr.wp.js')),
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

exports.default = series(concatJS);
// exports.default = series(concatJS, concatWPJS, compileCSS);