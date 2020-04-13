const {series} = require('gulp');
const gulp = require('gulp');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
// const clean = require('gulp-clean');
const pipeline = require('readable-stream').pipeline;

const concatFileName = 'dsynr.util';
const rootPath = 'src/';
const jsPath = rootPath + 'js/';
const tsPath = rootPath + 'ts/';
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
            getScript('analytics', 'js'),
            getScript('other', 'js'),
            getScript('math', 'js'),
            getScript('obj', 'js'),
            getScript('graphics', 'js'),
            getScript('css', 'js'),
            getScript('dom', 'js'),
            getScript('animation', 'js'),
            getScript('events', 'js'),
            getScript('viewport', 'js'),
            getScript('modal', 'js'),
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

exports.default = series(concatJS);