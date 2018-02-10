window.onload = () => {
    const oContent = document.getElementById("comment-content"),
        oSubmit = document.getElementsByClassName("submit")[0],
        oName = document.getElementsByClassName("comment-name")[0],
        oEmail = document.getElementsByClassName("comment-email")[0],
        oWebsite = document.getElementsByClassName("comment-website")[0];

    oSubmit.addEventListener("click", postCommentHandler, false);

    function postCommentHandler() {
        const name = oName.value,
            email = oEmail.value,
            website = oWebsite.value,
            content = oContent.value,
            reg = /^[\w\.]+@[0-9a-zA-Z]{2,}(\.[a-zA-Z]{2,}){1,2}$/;

        if(name === "") {
            alert("姓名为必填项。");
            return;
        }else if(email === "") {
            alert("邮箱为必填项。");
            return;
        }else if(!reg.test(email)) {
            alert("邮箱格式不正确。");
            return;
        }else if(content === "") {
            alert("评论内容不能为空。");
            return;
        };
        ajax();
    };
};