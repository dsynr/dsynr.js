const gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var pipeline = require('readable-stream').pipeline;

const jsPath = 'src/js/';

function getJS(fileName) {

    return jsPath + fileName + '.js';
}

function defaultTask() {
    return pipeline(
        gulp.src([
            getJS('analytics'),
            getJS('other'),
            getJS('math'),
            getJS('obj'),
            getJS('graphics'),
            getJS('css'),
            getJS('dom'),
            getJS('animation'),
            getJS('events'),
            getJS('viewport'),
            getJS('modal'),
            getJS('main'),
        ]),
        (concat('dsynr.util.js')),
        //https://www.npmjs.com/package/gulp-minify
        minify({
            ext: {
                src: '.js',
                min: '.min.js'
            }
        }),
        (gulp.dest('release/')));
}

exports.default = defaultTask