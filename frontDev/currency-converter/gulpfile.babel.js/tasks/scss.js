const gulp  = require('gulp')
const{src,dest } = gulp
const size = require('gulp-size')
const plumber = require('gulp-plumber')
const options = require('../optionsPlagins')

const autoprefixer =require('gulp-autoprefixer')
const cssOptimisation = require('gulp-csso')
const rename = require('gulp-rename')
const shorthand  = require('gulp-shorthand')
const groupMediaQueries = require('gulp-group-css-media-queries')
const sass = require('gulp-sass')(require('sass'));
const webpCss = require('gulp-webp-css')
const gulpIF = require("gulp-if")
const scss = (assets,build)=>{
    return src(assets,{sourcemaps:options.dev})//sourcemaps:true - не рабоатет
        .pipe(plumber(options.plumberSCSS))
        .pipe(size({title:'before minimalist scss.'}))
        // .pipe(require('gulp-sass-import-once')())
        .pipe(sass())
        .pipe(webpCss())
        .pipe(autoprefixer())
        .pipe(shorthand())
        .pipe(groupMediaQueries())
        .pipe(require('gulp-clean-css')({
            format: {
                breaks: {
                    afterAtRule: 2,
                    afterBlockBegins: 1, // 1 is synonymous with `true`
                    afterBlockEnds: 2,
                    afterComment: 1,
                    afterProperty: 1,
                    afterRuleBegins: 1,
                    afterRuleEnds: 1,
                    beforeBlockEnds: 1,
                    betweenSelectors: 1 // 0 is synonymous with `false`
                },
                indentWith: 'tab',
                indentBy:1,
            }
        }))
        .pipe(dest(build,{sourcemaps:options.dev}))
        .pipe(rename(options.renameCss))
        .pipe(cssOptimisation())
        .pipe(size({title:'after minimalist scss.'}))
        .pipe(dest(build,{sourcemaps:options.dev}))
}
module.exports = scss;