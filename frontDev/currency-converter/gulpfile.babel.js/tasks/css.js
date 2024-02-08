const gulp  = require('gulp')
const{src,dest } = gulp
const size = require('gulp-size')
const plumber = require('gulp-plumber')
const options = require('../optionsPlagins')
const concatCss = require("gulp-concat-css")
const autoprefixer =require('gulp-autoprefixer')
const cssOptimisation = require('gulp-csso')
const rename = require('gulp-rename')
const shorthand  = require('gulp-shorthand')
const groupMediaQueries = require('gulp-group-css-media-queries')
const webpCss = require('gulp-webp-css')

const css = (assets,build)=>{
    console.log(options.dev,options.build)
    console.log('work with css'+`:${assets}->${build}`)
    return src(assets,{sourcemaps:options.dev})//sourcemaps:true - не рабоатет
        .pipe(plumber(options.plumberCSS))
        .pipe(size({title:'before minimalist css.'}))
        .pipe(concatCss( 'style.css'))
        .pipe(webpCss())
        .pipe(autoprefixer())
        .pipe(shorthand())
        .pipe(groupMediaQueries())
        .pipe(dest(build,{sourcemaps:options.dev}))
        .pipe(rename(options.renameCss))
        .pipe(cssOptimisation())
        .pipe(size({title:'after minimalist css.'}))
        .pipe(dest(build,{sourcemaps:options.dev}))
}
module.exports = css;