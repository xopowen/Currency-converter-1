

const del = require("del");
const clean = (pathForDel)=>{
    return del([pathForDel])
}

module.exports = clean;