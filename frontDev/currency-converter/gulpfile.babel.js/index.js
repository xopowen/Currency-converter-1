const gulp  = require('gulp')
const{ watch,series,parallel} = gulp

let __dir = '.';
const PATH = {
    // заглавные - конечный путь.
    // малые - словарь
    dir:__dir,
    build:{
        HTML:__dir+'/build' + '/',
        CSS:__dir+"/build"+"/static/css",
        JS:__dir+"/build"+"/static/js",
        IMG:__dir+'/build'+'/static/img/',
        ICONS:__dir+'/build'+'/static/img/icons/',
        FONTS:__dir+"/build/static/fonts"
    },
    src:{
        HTML:__dir+'/src'+'/**/*.html',
        TWIG:__dir+'/src'+'/**/*.twig',
        FONTS:__dir+'/src/fonts/*.{oet,ttf,otf,ttc,woff,woff2,svg}',
        twig:{
            PAGE:__dir+'/src'+'/twig/pages/*.twig',
        },
        CSS:__dir+'/src'+'/css/',
        PAGES:__dir+'/src'+'/html/pages/*.html',
        css:{
            STYLE:__dir+"/src"+'/css/style.css',
            COMPONENT:__dir+"/src"+'/css/components/*.css'
        },
        SCSS:__dir+'/src'+'/scss/',
        scss:{
            MAIN:__dir+"/src"+'/scss/main.{scss,sass}',
            COMPONENT:__dir+"/src"+'/scss/components/*.{scss,sass}'
        },

        JS:__dir+'/src'+'/js/**/*.js',
        js:{
            MAIN:__dir+"/src"+'/js/main.js',
            COMPONENT:__dir+"/src"+'/js/components/*.js'
        },
        IMG:__dir+'/src'+'/img/*.{png,svg,gif,jpg,jpeg}',
        ICONS:__dir+'/src'+'/img/icons/*.{png,svg,gif,jpg,jpeg}'

    },

    get SRC(){
        return  __dirname+'/src'
    },
    get BUILD (){
        return __dirname+'/build'
    }
}

const browser = require('browser-sync').create()


const clean =()=> require("./tasks/clean.js")(PATH.BUILD+'/')
const html =()=> require("./tasks/html.js")(PATH.src.PAGES,PATH.build.HTML)
const css = ()=> require('./tasks/css')(PATH.src.css.STYLE,PATH.build.CSS)
const scss = ()=>require('./tasks/scss')(PATH.src.scss.MAIN,PATH.build.CSS)
const js = ()=>require("./tasks/js")(PATH.src.JS,PATH.build.JS)
const imgModel = require("./tasks/img.js")
const twig = ()=>require("./tasks/twig")(PATH.src.twig.PAGE,PATH.build.HTML)
const img = ()=>imgModel(PATH.src.IMG,PATH.build.IMG)
const icon =()=>imgModel(PATH.src.ICONS,PATH.build.ICONS)
const greateFontFile = async ()=>{
    await require("./tasks/clean.js")(PATH.src.SCSS+'fonts.css')
    require('./tasks/greateFontFile')(PATH.build.FONTS+'/*.{oet,ttf,otf,ttc,woff,woff2,svg}',
                                            PATH.src.SCSS)

}
const fonts =async ()=>{
    await require('./tasks/fonts')(PATH.src.FONTS,PATH.build.FONTS)
    await greateFontFile()
}
const options = require('./optionsPlagins')
//watcher
const watchFun = ()=>{
      // watch(PATH.src.TWIG,twig).on('all',browser.reload)
        watch(PATH.src.FONTS ,fonts).on('all',browser.reload)
      watch(PATH.src.SCSS,scss).on('all',browser.reload)
      watch(PATH.src.HTML,html).on('all',browser.reload)
      watch(PATH.src.JS,js).on('all',browser.reload)
      watch(PATH.src.IMG,img).on('all',browser.reload)
      watch(PATH.src.ICONS,icon).on('all',browser.reload)


}

const watchBrowser = ()=>{
    browser.init({
        browser: ["firefox"],
        server:{
            baseDir:PATH.build.HTML,
        }
    })
}

const build = series(
        clean,fonts,
        parallel(scss,html,icon,img,js ))   // twig,

                         
const dev =  series(
        build,
        parallel(watchFun,watchBrowser))
 

exports.watcher = watchFun;
exports.clean = clean;
exports.css = css;
exports.scss = scss;
exports.js = js;
exports.twig = twig;
exports.html = html;
exports.img = series(parallel(icon,img));
exports.fonts= fonts;
exports.greateFontFile= greateFontFile;
//development
exports.dev = dev;
//build
exports.build = build

exports.default = options.build?
    build:
    dev