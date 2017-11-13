const crypto = require("crypto"),
    key = "MerryYe";

function aseEncrypt(data){
    const cipher = crypto.createCipher("aes192" , key);
    let crypted = cipher.update(data , "utf-8" , "hex");
    crypted += cipher.final("hex");
    return crypted;
};

function aesDecrypt(encrypted){
    const decipher = crypto.createDecipher("aes192" , key);
    let decrypted = decipher.update(encrypted , "hex" , "utf-8");
    decrypted += decipher.final("utf-8");
    return decrypted;
};

module.exports = {
    aseEncrypt, 
    aesDecrypt
};