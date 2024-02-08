const { src } = require('gulp');
const fontFacegen = require('../changeModels/fontfacegen');
const greateFontFile = (assets,build)=>{
    console.log('work with greateFontFile'+`:${assets}->${build}`)
    return src(assets)
        .pipe(fontFacegen({filepath: build, filename: "fonts.css",}))
    }

module.exports = greateFontFile;