const oTip = document.getElementsByClassName("tip")[0],
    oMain = document.getElementsByClassName("main")[0],
    oPreview = document.getElementsByClassName("win")[0],
    oImageCanvas = document.createElement("canvas"),
    oImageCtx = oImageCanvas.getContext("2d"),
    oMainCtx = oMain.getContext("2d"),
    oPreviewCtx = oPreview.getContext("2d"),
    PW = 180,
    DRAGSIZE = 7,
    MASKALPHA = .4,
    cW = oMain.width,
    cH = oMain.height,
    MASKCOLOR = "#FFF",
    DRAGCOLOR = "#000";
    console.log();

let inCropper = false, inDragger = false, isMoving = false, isDrag = false,
    cropLeft = 0, cropTop = 0, dragLeft = 0, dragTop = 0, iW = 0, iH = 0, translate_left = 0, translate_top = 0, scale = 0, startX = 0, startY = 0;

oImageCanvas.width = cW;
oImageCanvas.height = cH;

oMain.addEventListener("dragenter", dragEnterHandler, false);

oMain.addEventListener("dragover", dragOverHandler, false);

oMain.addEventListener("drop", dropHandler, false);
/*
    let startX = 0, startY = 0;
    oMain.addEventListener("mousemove", function(ev) {
        const rect = this.getClientRects()[0],
            moveX = ev.pageX - rect.left - 8,
            moveY = ev.pageY - rect.top - 8;

        inCropper = moveX > cropLeft && moveX < dragLeft && moveY < dragTop && moveY > cropTop;
        this.style.cursor = inCropper ? "move" : "";
        isDrag && move(moveX - startX , moveY - startY);
    }, false);

    oMain.addEventListener("mousedown", function(ev) {
        const rect = this.getClientRects()[0];
        startX = ev.pageX - rect.left - 8,
        startY = ev.pageY - rect.top - 8;
        isDrag = inCropper ? true : false;
    }, false);

    oMain.addEventListener("mousemove", moveHandler, false);

    oMain.addEventListener("mousedown", downHandler, false);

    oMain.addEventListener("mouseup", upHandler, false);
*/
oMain.onmousemove = function(ev) {
    const _this = this,
        rect = _this.getClientRects()[0],
        x = ev.pageX - rect.left - 8,
        y = ev.pageY - rect.top - 8;
    inCropper = x > cropLeft && x < dragLeft && y < dragTop && y > cropTop;
    this.style.cursor = inCropper ? "move" : "";
    if(isDrag) {
        move(x - startX, y - startY);
        startX = x;
        startY = y;
    };
    _this.onmousedown = function(ev) {
        startX = ev.pageX - rect.left - 8,
        startY = ev.pageY - rect.top - 8;
        isDrag = inCropper ? true : false;
    };
    _this.onmouseup = function() {
        isDrag = false;
        _this.onmouseup = null;
        _this.onmousedown = null;
    };
};

function dragEnterHandler(ev) {
    ev.preventDefault();
};

function dragOverHandler(ev) {
    ev.preventDefault();
};
// dropHandler();
function dropHandler(ev) {
    ev.preventDefault();
    const file = ev.dataTransfer.files[0],
        fileReader = new FileReader();
    
    fileReader.addEventListener("load", function() {
        oTip.style.zIndex = -1;
        const oImg = new Image();
        oImg.src = this.result;
        oImg.addEventListener("load", function() {
            iW = this.width;
            iH = this.height;
            scale = Math.min(cW / iW , cH / iH);
            if(scale > 1) scale = Math.min(PW / iW, PW / iH);
            if(iW * scale <  PW) scale = Math.min(scale, PW / iW);
            if(iH * scale <  PW) scale = Math.min(scale, PW / iH);
            translate_top = (cH - iH * scale) / 2;
            translate_left = (cW - iW * scale) / 2;
            cropTop = (cH - PW) / 2;
            cropLeft = (cW - PW) / 2;
            dragTop = cropTop + PW;
            dragLeft = cropLeft + PW;
                
            oMainCtx.clearRect(0, 0, cW, cH);
            oImageCtx.clearRect(0, 0, cW, cH);
            oImageCtx.save();
            oImageCtx.translate(translate_left, translate_top);
            oImageCtx.scale(scale, scale);
            oImageCtx.drawImage(this, 0, 0);
            oImageCtx.restore();
            oMainCtx.drawImage(oImageCanvas, 0, 0);

            update();
        }, false);
    }, false);
    fileReader.readAsDataURL(file);
};

function moveHandler(ev) {
    const rect = this.getClientRects()[0],
    moveX = ev.pageX - rect.left - 8,
    moveY = ev.pageY - rect.top - 8;

    inCropper = moveX > cropLeft && moveX < dragLeft && moveY < dragTop && moveY > cropTop;
    this.style.cursor = inCropper ? "move" : "";
    isDrag && move(moveX - startX , moveY - startY);
};

function move(x, y) {
    cropTop += y;
    cropLeft += x;
    cropTop = Math.max(translate_top, cropTop);
    cropTop = Math.min(cropTop, scale * iH - PW + translate_top);
    cropTop = Number.isInteger(cropTop) ? cropTop : Math.ceil(cropTop);
    cropLeft = Math.max(translate_left, cropLeft);
    cropLeft = Math.min(cropLeft, scale * iW - PW + translate_left);
    cropLeft = Number.isInteger(cropLeft) ? cropLeft : Math.ceil(cropLeft);
    dragTop = cropTop + PW;
    dragLeft = cropLeft + PW;
    update();
};

function downHandler(ev) {
    const rect = this.getClientRects()[0];
    startX = ev.pageX - rect.left - 8;
    startY = ev.pageY - rect.top - 8;
    isDrag = inCropper ? true : false;
    isDrag && oMain.addEventListener("mouseup", upHandler, false);
};

function upHandler() {
    isDrag = false;
    this.removeEventListener("mouseup", upHandler, false);
    this.removeEventListener("mousedown", downHandler, false);
};

function update() {
    oMainCtx.clearRect(0, 0, cW, cH);
    oMainCtx.drawImage(oImageCanvas, 0, 0);
    drawMask();
    drawDrag();
    drawPreview();
};
// draw mask
function drawMask() {
    drawRect(0, 0, cW, cropTop, MASKCOLOR, null, MASKALPHA);
    drawRect(0, cropTop, cropLeft, PW, MASKCOLOR, null, MASKALPHA);
    drawRect(dragLeft, cropTop, cW - dragLeft, PW, MASKCOLOR, null, MASKALPHA);
    drawRect(0, dragTop, cW, cH - dragTop, MASKCOLOR, null, MASKALPHA);
};
// draw drag rect
function drawDrag() {
    drawRect(dragLeft, dragTop, DRAGSIZE, DRAGSIZE, null, DRAGCOLOR, null);
};
// draw preview canvas
function drawPreview() {
    oPreviewCtx.clearRect(0, 0, PW, PW);
    oPreviewCtx.save();
    oPreviewCtx.drawImage(oImageCanvas, cropLeft, cropTop, PW, PW, 0, 0, PW, PW);
    oPreviewCtx.restore();
};
// draw mask rect
function drawRect(x, y, w, h, f, s, g) {
    oMainCtx.save();
    if(f !== null) {oMainCtx.fillStyle = f;};
    if(s !== null) {oMainCtx.strokeStyle = f;};
    if(g !== null) {oMainCtx.globalAlpha = g;};
    oMainCtx.beginPath();
    oMainCtx.rect(x, y, w, h);
    oMainCtx.closePath();
    f !== null && oMainCtx.fill();
    s !== null && oMainCtx.stroke();
    oMainCtx.restore();
};