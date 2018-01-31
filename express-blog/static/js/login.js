const oSpanWidth = 80,
    oInput = document.getElementsByTagName("input"),
    oLabel = document.getElementsByTagName("label"),
    oLogin = document.getElementsByClassName("login")[0];

[...oLabel].forEach((ele, index) => {
    ele.onclick = function() {
        const o = oInput[index],
            val = o.value,
            width = Number.parseInt(css(ele , "width"));
        if(!val) {
            css(this, "width", width === oSpanWidth ? "100%" : oSpanWidth);
            o.focus();
        }else{
            css(this, "width", oSpanWidth);
        };
    };
});

[...oInput].forEach((ele, index) => {
    ele.onfocus = () => css(oLabel[index], "width", oSpanWidth);
    ele.onblur = () => css(oLabel[index], "width", this.value ? oSpanWidth : "100%");
});

oLogin.addEventListener("click"0, () => {
    const name = oInput[0].value,
        password = oInput[1].value;
    if(name === "") {
        alert("用户名不能为空！");
        return;
    } else if(password === "") {
        alert("密码为空！");
        return;
    };
    $.ajax({
        url: "/login",
        type: "post",
        data: {name, password},
        success(data) {
            if(data.msg === "ok") {
                const {origin} = window.location;
                window.location.href = `${origin}/admin`;
            }else {
                [...oInput].forEach(ele => ele.value = "");
                alert(data.msg);
            };
        },
        error(error) {
            console.log(error);
        }
    });
}, false);