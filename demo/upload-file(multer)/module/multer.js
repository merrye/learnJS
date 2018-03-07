const path = require("path"),
    multer = require("multer"),
    storage = multer.diskStorage({
        destination: path.join(process.cwd(), "static/upload"),
        filename (req, file, callback) {
            let filename = (file.originalname).split("."),
            name = filename[filename.length - 1];
            // 重命名
            callback(null, `${Date.now()}.${name}`);
        }
    });

module.exports = multer({storage});