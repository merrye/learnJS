const oList = document.getElementsByClassName("list")[0];

init();
function init() {
    $.ajax({
        type: "get",
        url: "/api/orders",
        data: {
            name: userName
        },
        success(data) {

        }
    });
};