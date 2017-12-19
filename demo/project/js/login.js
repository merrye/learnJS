const oName = document.getElementsByClassName("username")[0].getElementsByTagName("input")[0],
    oPassword = document.getElementsByClassName("userpassword")[0].getElementsByTagName("input")[0],
    oSubmit = document.getElementsByClassName("submit")[0].getElementsByTagName("span")[0];

oSubmit.addEventListener("click", function() {
    console.log(oName.value, oPassword.value);
    $.ajax({
        type: "post",
        url: "http://10.30.90.13:8080/login",
        data: {
            username: oName.value,
            passwd: oPassword.value 
        },
        success(data) {
            if(data === "success") {
                alert("登录成功");
                setTimeout(function() {
                    window.localStorage.setItem("userid", oPassword.value);
                    window.localStorage.setItem("username", oName.value);
                    window.location.href = window.location.href.split("pages")[0] + "index.html";
                }, 1000);
            };
        }
    });
}, false);