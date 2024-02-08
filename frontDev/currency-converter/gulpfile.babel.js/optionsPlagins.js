const notify = require("gulp-notify");

const _build = process.argv.includes("-b")
const _dev = !process.argv.includes("-b")
const _min = process.argv.includes("-min")
module.exports = {
    build:_build,
    dev:_dev,
    min:_min,
    plumberHTML:{
        errorHandler:notify.onError((error)=>({
            title:"HTML",
            message:error.message
        }))},
    plumberCSS:{
        errorHandler:notify.onError((error)=>({
            title:"CSS",
            message:error.message
        }))},
    plumberSCSS:{
        errorHandler:notify.onError((error)=>({
            title:"SCSS",
            message:error.message
        }))},
    plumberJS:{
        errorHandler:notify.onError((error)=>({
            title:"JavaScript",
            message:error.message
        }))},
    plumberIMG:{
        errorHandler:notify.onError((error)=>({
            title:"IMG",
            message:error.message
        }))},
    plumberTWIG:{
        errorHandler:notify.onError((error)=>({
            title:"Twig",
            message:error.message
        }))},
    plumberFONT:{
        errorHandler:notify.onError((error)=>({
            title:"FONT",
            message:error.message
        }))},
    renameCss:{suffix:'.min'},
    htmlMin:{
        collapseWhitespace:_build||false
    },
    webpackStream:{
        optimization: {
            minimize: _min||false,
        },
        mode: _build ?'production':'development'//[development,production],
    },
    imageMin:{verbose:_build||false},
    fonter:{
        formats:['ttf','woff','eot','svg']
    },
    imgRetinizeOption:{
        filter:false,
        flags:{1: '', 2: '@2x', 4: '@4x'},
        flagsOut:{1: '', 2: '@2x', 4: '@4x'}
    }
};

