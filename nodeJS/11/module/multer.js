const multer = require('multer'),
    path = require('path');
// 上传路径处理   上传之后重命名
let storage = multer.diskStorage({
    // 上传文件路径处理
    destination: path.join(process.cwd(),'public/uploadImage'),
    // 上传之后重命名
    filename: function(req,file,callback){
        // console.log(file);
        let filename = file.originalname.split('.');
        callback(null,`${Date.now()}.${filename[filename.length-1]}`);
    }
});
let fileFilter = function(req,file,callback){
    if(file.mimeType === 'image/gif'){
        callback(null,true);   // true  允许上传
    }else{
        callback(null,false); 
    };
};
let upload = multer({
    storage: storage,
    // 限制上传文件类型
    fileFilter: fileFilter,
    limits: {
        // 限制上传文件的大小
        
    }
});

module.exports = upload;