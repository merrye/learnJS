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
        const cName = ele.className,
            cNameArr = cName.split(" ");
        cNameArr.find(val => val === name) ? removeClass(obj , name) : addClassName(obj , name);
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
function ajax({config = {type: get}}){

};
window.requestAnimationFrame = (() => {
    return window.requestAnimationFrame ||
        window.oRequstAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function(callback){
            window.setTimeout(callback , 1000 / 60);
        };
})();