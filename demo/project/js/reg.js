const oName = document.getElementsByClassName("username")[0].getElementsByTagName("text")[0],
    oPassword = document.getElementsByClassName("userpassword")[0].getElementsByTagName("text")[0],
    oSubmit = document.getElementsByClassName("submit")[0].getElementsByTagName("span")[0];

init();
function init() {
    $.ajax({
        type: "post",
        url: "/api/user",
        data: {
            name: oName.value,
            password: oPassword.value 
        },
        success(data) {

        }
    });
};