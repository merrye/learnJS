const multer = require("multer"),
    path = require("path");

let storage = multer.diskStorage({
        destination: path.join(process.cwd(), "static/images/upload/articlesImage"),
        filename: (req, file, cb) => {
            let filename = (file.originalname).split("."),
                name = filename[filename.length - 1];
            cb(null, `${Date.now()}.${name}`);
        }
    }),
    upload = multer({storage});

module.exports = upload;