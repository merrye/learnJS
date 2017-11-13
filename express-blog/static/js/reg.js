const oSpan = document.getElementsByTagName("span"),
    oInput = document.getElementsByTagName("input"),
    oLabel = document.getElementsByTagName("label"),
    oReg = document.getElementsByClassName("reg")[0],
    oSpanWidth = 120;

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

oReg.addEventListener("click" , function(){
    const name = oInput[0].value,
        password = oInput[1].value,
        confirmPassword = oInput[2].value;
    if(name === ""){
        alert("用户名不能为空！");
        return;
    };
    if(password === "" || confirmPassword === ""){
        alert("密码不能为空！");
        return;
    };
    if(password !== confirmPassword){
        alert("两次密码输入不一致！");
        return;
    };
    $.ajax({
        url: "/reg",
        type: "post",
        dataType: "json",
        data: {
            name,
            password
        },
        success(data){
            if(data.msg === "ok"){
                const href = window.location.href;
                window.location.href = `${href.substr(0 , href.length - 3)}admin`;
            }else{
                [...oInput].forEach(ele => ele.value = "");
                alert(data.msg);
            };
        },
        error(err){
            console.log(err);
        }
    });
} , false);