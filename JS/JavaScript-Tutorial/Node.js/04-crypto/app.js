// MD5 / SHA1
const crypto = require('crypto'),
    hash = crypto.createHash('md5');
// MD5
hash.update('Hello, world!');
// console.log(hash.digest('hex'));

// Hmac
const hmac = crypto.createHmac('sha256','secret-key');
hmac.update('Hello, world!');
// console.log(hmac.digest('hex'));

// AES
function aesEncrypt(data,key){
    const cipher = crypto.createCipher('aes192',key);
    let crypted = cipher.update(data,'utf-8','hex');
    crypted += cipher.final('hex');
    return crypted;
};

function aesDecrypt(encrypted,key){
    const decipher = crypto.createDecipher('aes192',key);
    let decrypted = decipher.update(encrypted,'hex','utf-8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

let data = 'Hello, world!!'
let key = "Password!";
let encrypted = aesEncrypt(data,key);
let decrypted = aesDecrypt(encrypted,key);

// console.log(`Plain text: ${data}`);
// console.log(`Encrypted text: ${encrypted}`);
// console.log(`Decrypted text: ${decrypted}`);

// Diffie-Hellman
let ming = crypto.createDiffieHellman(512),
    ming_keys = ming.generateKeys(),
    prime = ming.getPrime(),
    generator = ming.getGenerator();
console.log(`Prime: ${prime.toString('hex')}`);
console.log(`Generator: ${generator.toString('hex')}`);

let hong = crypto.createDiffieHellman(prime,generator),
    hong_keys = hong.generateKeys(),
    ming_secret = ming.computeSecret(hong_keys),
    hong_secret = hong.computeSecret(ming_keys);

console.log(`Secret of Xiao Ming: ${ming_secret.toString('hex')}`);
console.log(`Secret of Xiao Hong: ${hong_secret.toString('hex')}`);