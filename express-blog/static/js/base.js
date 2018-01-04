// draw avator function 
const oImg = new Image(),
    oIntroAvatorCanvas = document.getElementById("intro-avator-canvas"),
    oCanvasWidth = Number.parseInt(css(oIntroAvatorCanvas , 'width')),
    oCanvasHeight = Number.parseInt(css(oIntroAvatorCanvas , 'height')),
    ctx = oIntroAvatorCanvas.getContext("2d");

oImg.src = "/images/home/avator.png";
oImg.width = 93;
oImg.height = 118;
oImg.onload = function() {
    const w = this.width / 2,
        h = this.height / 2;
    ctx.drawImage(this, oCanvasWidth / 2 - w, oCanvasHeight / 2 - h, w * 2, h * 2);
};

(() => {
    const cX = oCanvasWidth / 2,
        cY = oCanvasHeight / 2,
        pX = cY / 2,
        a = cX + Math.sqrt(3) * pX,
        b = cX - Math.sqrt(3) * pX,
        c = cY + pX,
        d = cY - pX;
    ctx.save();
    ctx.fillStyle = "rgb(30 ,30 ,30)";
    ctx.beginPath();
    ctx.moveTo(cX , 0);
    ctx.lineTo(a , d);
    ctx.lineTo(a , c);
    ctx.lineTo(cX , oCanvasHeight);
    ctx.lineTo(b , c);
    ctx.lineTo(b , d);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
})();

// home page nav list
const oNavList = document.getElementsByClassName("nav-list")[0],
    oNavListLi = oNavList.getElementsByTagName("li"),
    oNavClickedLine = document.getElementsByClassName("nav-clicked-line")[0];
let lastLeft = -Number.parseInt(css(oNavListLi , "width")),
    initNavLiIndex = getIndex(),
    initObj = oNavListLi[initNavLiIndex],
    initLeft = initObj.offsetLeft;

addClassName(initObj , "clicked");
css(oNavClickedLine , {
    left: initLeft,
    display: "block",
    width: css(initObj , "width")
});
[...oNavListLi].forEach((ele , index) => {
    ele.addEventListener("click" , clickedFoo(index) , false);
    ele.addEventListener("mouseenter" , moveFoo , false);
    ele.addEventListener("mouseleave" , function(){
        const width = Number.parseInt(css(oNavListLi , "width"));
        $(oNavClickedLine).stop().animate({
            width,
            left: oNavListLi[initNavLiIndex].offsetLeft
        });
    } , false);
});
// ele click callback function
function clickedFoo(index){
    return function(){
        Foo(this , oNavClickedLine , true);
        removeClass(silblings(addClassName(this , "clicked")) , "clicked");
    };
};
// ele mouseenter callback function
function moveFoo(){
    Foo(this , oNavClickedLine , false)
};
function Foo(_this ,target , isLastEle){
    const width = Number.parseInt(css(_this , "width")),
        left = Number.parseInt(_this.offsetLeft);
    isLastEle && (lastLeft = left);
    $(target).show().stop().animate({
        width: width + 10,
        left: left
    } , function(){
        $(this).stop().animate({
            width,
        } , 200);
    });
};

function getIndex() {
    let index = 0;
    switch (window.location.pathname){
        case "/home":
            index = 0;
            break;
        case "/archives":
            index = 1;
            break;
        case "/tag":
            index = 2;
            break;
        case "/classification":
            index = 3;
            break;
        case "/about":
            index = 4;
            break;
    };
    return index;
};