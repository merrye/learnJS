const fs = require("fs"),
    path = require("path"),
    multer = require("multer"),
    storage = multer.diskStorage({
        destination (req, file, callback) {
            const {originalname} = file,
                type = originalname.slice(originalname.lastIndexOf(".") + 1),
                dest = path.join(process.cwd(), "upload", type);
            if (!fs.existsSync(dest)) {
                fs.mkdirSync(dest);
            };
            callback(null, dest);
        },
        filename (req, file, callback) {
            const {originalname} = file,
                type = originalname.slice(originalname.lastIndexOf(".") + 1);
            callback(null, `${Date.now()}.${type}`);
        }
    }),
    upload = multer({storage});

module.exports = upload;