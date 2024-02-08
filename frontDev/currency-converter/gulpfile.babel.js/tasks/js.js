const gulp  = require('gulp')
const{src,dest } = gulp
const size = require('gulp-size')
const plumber = require('gulp-plumber')
const options = require('../optionsPlagins')
const bable = require('gulp-babel')//works with the js
const webpackStream = require('webpack-stream')



const js = (assets,build)=>{
    console.log('work with js'+`:${assets}->${build} /n | webpackStream ${options.webpackStream.mode}`)
    return src(assets,{sourcemaps:options.dev})
        .pipe(plumber(options.plumberJS))
        .pipe(bable())
        .pipe(size({title:'before minimalist js.'}))
        .pipe(webpackStream(options.webpackStream))
        .pipe(size({title:'after minimalist js.'}))
        .pipe(dest(build,{sourcemaps:options.dev}))
}
module.exports = js;