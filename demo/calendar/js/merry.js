/**
 * @author: Merry Ye
 * @version: 0.0.1
*/
const dataArr = ["opacity","font-weight", "perspective", "animation-iteration-count", "column-count"];
/**
 * @param {Element} obj  
 * @param {String | Map | Array} attr  
 * @param {String | Number | Function} value
 */
function css(obj , attr , value){
    obj = obj.length ? [...obj] : [obj];
    if(typeof attr === "string"){
        if(typeof value !== "undefined"){
            obj.forEach((ele , index) => css(ele , {[attr]: typeof value === "function" ? value(index , css(ele , attr)) : value}));
            return obj;
        }else{
            return obj[0].currentStyle ? obj[0].currentStyle[attr] : getComputedStyle(obj[0])[attr];
        };
    }else if(typeof attr === "object"){
        if(attr instanceof Array){
            const cssObject = {};
            attr.forEach((ele) => cssObject[ele] = css(obj , ele));
            return cssObject;
        }else{
            for(let [k,v] of Object.entries(attr)){ 
                obj.forEach((ele , index) => {
                    typeof v === "function"
                        ? css(ele , {[k] : v(index , css(ele , k))})
                        : ele.style[k] = typeof v === "number"
                            ?(dataArr.find(val => k === val) ? v : `${v}px`)
                            :( /^\d+$/.test(v) ? `${v}px` : v);
                });
            };
            return obj;
        };
    };
};
/**
 * @param {Element} obj  
 * @param {String} name  
 */
function addClassName(obj , name){
    (obj.length ? [...obj] : [obj]).forEach((val) => {
        let oName = val.className;
        new Set(name.split(" ")).forEach(ele => oName += oName.split(" ").find(val => val == ele) ? "" : ` ${ele}`);
        val.className = oName.trim();
    });
    return obj;
};
/**
* @param {Element} obj  
* @param {String} name  
*/
function removeClass(obj , name){
    (obj.length ? [...obj] : [obj]).forEach((val) => {
        val.className = val.className ? val.className.split(" ").filter(val => ![...new Set(name.split(" "))].find((ele) => ele === val)).join(" ") : "";
    });
    return obj;
};
/**
* @param {Element} obj  
* @param {String} name  
*/
function toggleClassName(obj , name){
    (obj.length ? [...obj] : [obj]).forEach((ele) => {
        const cName = ele.className;
        if(cName) {
            const cNameArr = cName.split(" ");
            cNameArr.find(val => val === name) ? removeClass(obj , name) : addClassName(obj , name);
        }else{
            addClassName(obj , name)
        };
            
    });
    return obj;
};
/**
* @param {Element} obj  
* @param {String} name  
*/
function hasClassName(obj , name){
    return obj.className.split(" ").find(ele => ele === name) ? true : false;
};
/**
* @param {Element} obj
*/
function silblings(obj){
    return [...obj.parentNode.children].filter(ele => ele != obj);
};
/**
* @param {Element} obj
*/
function next(obj){
    return obj.nextElementSibling;
}
/**
* @param {Element} obj
*/
function prev(obj){
    return obj.previousElementSibling;
};
function getOffset(obj) {
    let top = obj.offsetTop,
        left = obj.offsetLeft,
        offsetParent = obj.offsetParent;
    while(offsetParent !== document.body){
        top += offsetParent.offsetTop;
        left += offsetParent.offsetLeft;
        offsetParent = offsetParent.offsetParent;
    };
    return {
        top,
        left
    };
};
function ajax({
    url,
    type = "GET",
    isAsync = true,
    data,
    success,
    error
}) {
    const xhr = new XMLHttpRequest();
    
    xhr.addEventListener("load" , transferCompleted);
    xhr.addEventListener("progress" , updateProgress);
    xhr.addEventListener("error" , transferFailed);
    xhr.addEventListener("abort" , transferCanceled);
    xhr.addEventListener("readystatechange" , handleStateChange);

    if(data) {
        let arr = [];
        for(let key in data) {
            arr.push(`${key}=${data[key]}`);
        };
        data = arr.join("&");
        if(type.toLocaleLowerCase === "get") {
            url += '?' + data
        };
    };

    xhr.open(type , url , isAsync);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send(data);

    function transferCompleted(ev) {

    };

    function updateProgress(ev) {
        // if(ev.lengthComputable) {
            // ev.loaded 已经下载大小
            // ev.total  全部大小
        // };
    };

    function transferFailed() {
        error ? error(xhr.statusText) : console.log(xhr.statusText);
    };

    function transferCanceled() {
        error ? error(xhr.statusText) : console.log(xhr.statusText);
    };

    function handleStateChange() {
        const {readyState , status , responseText , statusText} = xhr;
        if(readyState === XMLHttpRequest.DONE) {
            (status >= 200 && status < 300) || status === 300
                ? success(responseText)
                : (error ? error(statusText) : console.log(statusText));
        };
    };
};
const dom = new Proxy({} , {
    get(target , property) {
        return function(attrs = {}, ...children) {
            const el = document.createElement(property);
            for (let prop of Object.keys(attrs)) {
                el.setAttribute(prop , attrs[prop]);
            };
            for (let child of children) {
                if (typeof child === "string" ) {
                    child = document.createTextNode(child);
                };
                el.appendChild(child);
            };
            return el;
        };
    }
});

window.requestAnimationFrame = (() => {
    return window.requestAnimationFrame ||
        window.oRequstAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function(callback){
            window.setTimeout(callback , 1000 / 60);
        };
})();