const oName = document.getElementById("name"),
    oPassword = document.getElementById("password"),
    oInput = document.getElementsByTagName("input"),
    oLabel = document.getElementsByTagName("label"),
    oSpan = document.getElementsByTagName("span"),
    oSpanWidth = 80;

[...oLabel].forEach((ele , index) => {
    ele.onclick = function(){
        const o = oInput[index],
            val = o.value,
            width = Number.parseInt(css(ele , "width"));
        if(!val){
            css(this , "width" , width === oSpanWidth ? "100%" : oSpanWidth);
            o.focus();
        }else{
            css(this , "width" , oSpanWidth);
        };
    };
});

[...oInput].forEach((ele , index) =>{
    ele.onfocus = function(){
        css(oLabel[index] ,"width" , oSpanWidth);
    };
    ele.onblur = function(){
        css(oLabel[index] ,"width" , this.value ? oSpanWidth : "100%");
    };
});