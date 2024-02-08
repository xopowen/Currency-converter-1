const gulp  = require('gulp')
const{src,dest } = gulp
const size = require('gulp-size')
const plumber = require('gulp-plumber')
const imagemin = require('gulp-imagemin')
const options = require('../optionsPlagins')
const newer = require('gulp-newer')//предотвращает лишнее сжатие
const webp = require('gulp-webp')
const gulpIF = require("gulp-if")

const img = (assets,build)=>{
    console.log('work with img'+`:${assets}->${build}`)
    return src(assets)
        .pipe(plumber(options.plumberIMG))
        .pipe(newer(build))
        .pipe(webp())
        .pipe(dest(build))
        .pipe(src(assets))
        .pipe(newer(build))
        .pipe(gulpIF(options.build,imagemin(options.imageMin)))
        .pipe(size({title:'after minimalist img.'}))
        .pipe(dest(build))
}
module.exports = img;