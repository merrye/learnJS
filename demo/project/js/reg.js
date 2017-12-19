const oName = document.getElementsByClassName("username")[0].getElementsByTagName("input")[0],
    oPassword = document.getElementsByClassName("userpassword")[0].getElementsByTagName("input")[0],
    oSubmit = document.getElementsByClassName("submit")[0].getElementsByTagName("span")[0];

oSubmit.addEventListener("click", reg, false);

function reg() {
    $.ajax({
        type: "post",
        url: "http://10.30.90.13:8080/regist",
        data: {
            username: oName.value,
            passwd: oPassword.value 
        },
        success(data) {
            window.location.href = window.location.href.split("pages")[0] + "index.html";
            window.localStorage.setItem("userid", data.userid);
            window.localStorage.setItem("username", data.username);
        }
    });
};