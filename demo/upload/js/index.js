const oMain = document.getElementsByClassName("main")[0],
    oTip = document.getElementsByClassName("tip")[0],
    oPreview = document.getElementsByClassName("window")[0],
    oImageCanvas = document.createElement("canvas"),
    oImageCtx = oImageCanvas.getContext("2d"),
    oMainCtx = oMain.getContext("2d"),
    oPreviewCtx = oPreview.getContext("2d"),
    cW = oMain.width,
    cH = oMain.height;

const PW = 180,
    MASKALPHA = .4,
    MASKCOLOR = "#FFF",
    DRAGSIZE = 7,
    DRAGCOLOR = "#000";

let cropLeft = 0,
    cropTop = 0,
    dragLeft = 0,
    dragTop = 0,
    inCropper = false,
    inDragger = false,
    isMoving = false;

oImageCanvas.width = cW;
oImageCanvas.height = cH;

oMain.addEventListener("dragenter", dragEnterHandler, false);

oMain.addEventListener("dragover", dragOverHandler, false);

oMain.addEventListener("drop", dropHandler, false);


function dragEnterHandler(ev) {
    ev.preventDefault();
};

function dragOverHandler(ev) {
    ev.preventDefault();
};

function dropHandler(ev) {
    ev.preventDefault();
    const file = ev.dataTransfer.files[0],
        fileReader = new FileReader();
    
    fileReader.addEventListener("load", function() {
        oTip.style.zIndex = -1;
        const oImg = new Image();
        oImg.src = this.result;
        oImg.addEventListener("load", function() {
            const iW = this.width,
                iH = this.height,
                DIFFW = (cW - PW) / 2;

            let scale = Math.min(cW / iW , cH / iH);

            if(scale > 1) scale = Math.min(PW / iW, PW / iH);
            if(iW * scale <  PW) scale = Math.min(scale, PW / iW);
            if(iH * scale <  PW) scale = Math.min(scale, PW / iH);

            let l = (cW - iW * scale) / 2,
                t = (cH - iH * scale) / 2;

            cropLeft = DIFFW;
            cropTop = DIFFW;
            dragLeft = cropLeft + PW;
            dragTop = cropTop + PW;;
                
            oMainCtx.clearRect(0, 0, cW, cH);
            oImageCtx.clearRect(0, 0, cW, cH);
            oImageCtx.save();
            oImageCtx.translate(l, t);
            oImageCtx.scale(scale, scale);
            oImageCtx.drawImage(this, 0, 0);
            oImageCtx.restore();
            oMainCtx.drawImage(oImageCanvas, 0, 0);
            oPreviewCtx.drawImage(oImageCanvas, DIFFW, DIFFW, PW, PW, 0, 0, PW, PW);

            update();
        }, false);
    }, false);

    fileReader.readAsDataURL(file);
};

oMain.addEventListener("mousemove", function(ev) {
    const rect = this.getClientRects()[0],
        x = ev.pageX - rect.left,
        y = ev.pageY - rect.top;
    // console.log(x,y);
    inCropper = x > cropLeft && x < dragLeft && y < dragTop && y > cropTop;
    this.style.cursor = inCropper ? "move" : "";

    oMain.addEventListener("mousedown", function(ev) {
        const x = ev.pageX,
            y = ev.pageY;
    
        console.log(x,y);
    }, false);
}, false);

// oMain.addEventListener("mouseup");

function update() {
    // draw mask
    drawRect(oMainCtx, 0, 0, cW, DIFFW, MASKCOLOR, null, MASKALPHA);
    drawRect(oMainCtx, 0, DIFFW, DIFFW, PW, MASKCOLOR, null, MASKALPHA);
    drawRect(oMainCtx, DIFFW + PW, DIFFW, DIFFW, PW, MASKCOLOR, null, MASKALPHA);
    drawRect(oMainCtx, 0, cH - DIFFW, cW, DIFFW, MASKCOLOR, null, MASKALPHA);
    // draw drag rect
    drawRect(oMainCtx, DIFFW + PW, DIFFW + PW, DRAGSIZE, DRAGSIZE, null, DRAGCOLOR, null);
    // draw preview canvas
    drawPreview(DIFFW, DIFFW);
};

function drawRect(c, x, y, w, h, f, s, g) {
    c.save();
    if(f !== null) {c.fillStyle = f;};
    if(s !== null) {c.strokeStyle = f;};
    if(g !== null) {c.globalAlpha = g;};
    c.beginPath();
    c.rect(x, y, w, h);
    c.closePath();
    f !== null && c.fill();
    s !== null && c.stroke();
    c.restore();
};

function drawPreview(x, y) {
    oPreviewCtx.clearRect(0, 0, PW, PW);
    oPreviewCtx.save();
    oPreviewCtx.drawImage(oImageCanvas, x, y, PW, PW, 0, 0, PW, PW);
    oPreviewCtx.restore();
};