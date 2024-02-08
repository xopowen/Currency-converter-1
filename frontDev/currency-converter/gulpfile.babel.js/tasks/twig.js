const gulp  = require('gulp')
const{src,dest } = gulp
const htmlMin = require('gulp-htmlmin')
const size = require('gulp-size')
const plumber = require('gulp-plumber')
const options = require('../optionsPlagins')
const twigPl = require('gulp-twig')
const webpHtml = require("gulp-webp-html");

const twig = (assets,build)=>{
    console.log('work with twig'+`:${assets}->${build}`)
    return src(assets)
        .pipe(plumber(options.plumberTWIG))
        .pipe(twigPl())
        // .pipe(webpHtml())//для вставки конструкции picture вместо img
        .pipe(size({title:'before minimalist.'}))
        .pipe(htmlMin(options.htmlMin))
        .pipe(size({title:'after minimalist.'}))
        .pipe(dest(build))
}
module.exports = twig;