(() => {
    //textCanvas
    (() => {
        const oContent = document.getElementById('content'), 
            oHome = document.getElementsByClassName('home')[0],
            oCanvas = document.getElementById("text"),
            ctx = oCanvas.getContext('2d'),
            w = oContent.clientWidth - Number.parseInt(css(oContent , 'paddingTop')) - Number.parseInt(css(oContent , 'paddingBottom')),
            h = oContent.clientHeight - Number.parseInt(css(oContent , 'paddingLeft')) - Number.parseInt(css(oContent , 'paddingRight'));
        oCanvas.width = w;
        oCanvas.height = h;
        oHome.style.width = `${w}px`;

        (function drawFont() {
            ctx.save();
            const color = ctx.createLinearGradient(0, 0, 0, oCanvas.height);
            color.addColorStop(0, "rgba(150, 150, 150, .5)");
            color.addColorStop(1, "rgba(150, 150, 150, 1)");
            ctx.fillStyle = color;
            ctx.font = "bold 40px 华文行楷";
            ctx.fillText(`叶培昌的博客`, 60, 55);
            ctx.restore();
        })();
    })();
    // content
    (() => {
        const oContent = document.getElementById("content");

        /*
            x:     y:       res
            15deg   15deg   right-top
            15deg   -15deg  left-top
            -15deg  15deg   right-bottom
            -15deg  -15deg  left-bottom
        */

        oContent.onmouseenter = function() {
            let t = parseInt(css(oContent, "top")),
                l = parseInt(css(oContent, "left")),
                w = parseInt(css(oContent, "width")),
                h = parseInt(css(oContent, "height"));

            this.style.boxShadow = "rgba(0, 0, 0, .5) 0px 0px 100px";
            document.onmousemove = e => {
                e = e || widnow.event;
                let x = e.clientX - l + w / 2,
                    y = e.clientY - t,
                    X = x - w / 2,
                    Y = h / 2 - y;
                
                this.style.transform = `rotateX(${Y / 20}deg) rotateY(${X / 20}deg)`;
            };
            this.onmouseleave = function() {
                document.onmousemove = null;
                this.style.boxShadow = "rgba(0, 0, 0, .5) 0px 0px 0px";
                this.style.transform = "rotateX(0deg) rotateY(0deg)";
            };
        };
    })();
})();