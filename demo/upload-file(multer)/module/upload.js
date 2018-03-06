const path = require("path"),
    multer = require("multer"),
    storage = multer.diskStorage({
        destination: path.join(process.cwd(), "static/upload"),
        filename (req, file, callback) {
            console.log(file);
        }
    });

module.exports = multer({storage});