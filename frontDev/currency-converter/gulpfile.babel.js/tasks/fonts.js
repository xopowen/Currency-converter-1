const gulp  = require('gulp')
const{src,dest } = gulp
const size = require('gulp-size')
const plumber = require('gulp-plumber')

const options = require('../optionsPlagins')
const newer = require('gulp-newer')//предотвращает лишнее сжатие
const fonter = require('gulp-fonter')
const tt2woff2 = require('gulp-ttf2woff2')

const fonts = (assets, build)=>{
    console.log('work with font'+`:${assets}->${build}`)
    return src(assets)
        .pipe(plumber(options.plumberFONT))
        .pipe(newer(build))
        .pipe(fonter(options.fonter))
        .pipe(dest(build))
        .pipe(tt2woff2())
        .pipe(dest(build))
}
module.exports = fonts;