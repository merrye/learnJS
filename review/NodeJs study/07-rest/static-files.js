const fs = require('mz/fs'),
    path = require('path'),
    mime = require('mime');

function staticFiles(url , dir){
    return async(ctx , next) => {
        const rpath = ctx.request.path;
        if(rpath.startsWith(url)){
            const fp = path.join(dir , rpath.substring(url.length));
            if(await fs.exists(fp)){
                ctx.response.type = mime.lookup(rpath);
                ctx.response.body = await fs.readFile(fp);
            }else{
                ctx.response.status = 404;
            };
        }else{
            await next();
        };
    };
};

module.exports = staticFiles;