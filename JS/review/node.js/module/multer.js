const multer = require('multer'),
    path = require('path');

let storage = multer.diskStorage({  // 上传路径处理   重命名处理
        // 上传路径设置
        destination: path.join(process.cwd() , 'public/upload'),
        filename: (req , file , callback) => {
            let filename = (file.originalname).split("."),
            name = filename[filename.length - 1];
            // 重命名
            callback(null , `${Date.now()}.${name}`);
        }
    }),
    fileFilter = (req , file , callback) => {
        // 文件上传限制
        // 设置判断后， 没允许 / 设置的会被拒绝
        if(file.mimetype === "image/jpeg"){
            callback(null , true);  // true / false 是否允许上传
        };
    },
    upload = multer({
        storage,
        // fileFilter,
        // limits   文件大小
    });

module.exports = upload;