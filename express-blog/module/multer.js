const multer = require("multer"),
    path = require("path");

let storage = multer.diskStorage({
    destination: patj.join(`${process.cwd()}static/upload/articlesImage`)
});