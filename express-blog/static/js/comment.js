window.onload = () => {
    const oMain = document.getElementById("main"),
        oQuote = document.getElementsByClassName("quote"),
        oComment = document.getElementsByClassName("comment"),
        oContent = document.getElementById("comment-content"),
        oSubmit = document.getElementsByClassName("submit")[0],
        oName = document.getElementsByClassName("comment-name")[0],
        oEmail = document.getElementsByClassName("comment-email")[0],        
        oPostComment = document.getElementsByClassName("postComment")[0],
        oWebsite = document.getElementsByClassName("comment-website")[0];

    oSubmit.addEventListener("click", postCommentHandler, false);

    [...oQuote].forEach((ele, index) => ele.addEventListener("click", quoteHandler(index), false));
let str = "";
    function quoteHandler(index) {
        return function () {
            const quoteCommnet = oComment[index],
                quoteName = quoteCommnet.children[0].children[0].innerHTML,
                quoteContent = quoteCommnet.children[1].innerHTML.replace(/<blockquote>.*<\/blockquote><br>/, "").replace(/<br.*>/, "\n"),
                quoteHtml = `<blockquote>\n<pre>引用${quoteName}的评论</pre>\n${quoteContent}\n</blockquote>\n`;
                const reg = /<blockquote>\.*<\/blockquote>/m;
                window.str = quoteContent;
                console.log(quoteContent)
                console.log(quoteContent.replace(reg, ""));
            oContent.value = quoteHtml;
            const pos = oContent.value.length;
            oContent.focus();
            oContent.setSelectionRange(pos, pos);
            oMain.scrollTop = getOffset(oPostComment).top;
        };
    };

    function postCommentHandler() {
        const id = this.dataset.id,
            name = oName.value,
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
        ajax({
            type: "post",
            url: `/article/${id}/comment`,
            data: {name, email, website, content},
            success(data) {
                data = JSON.parse(data);
                if(data.msg === "success") {
                    window.location.reload();
                }else if(data.msg === "fail") {
                    alert("评论失败。");
                };
            }
        });
    };
};